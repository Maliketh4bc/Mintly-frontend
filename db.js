const { fakerES: faker } = require('@faker-js/faker');

faker.seed(2026);

const HOUR = 60 * 60 * 1000;
const now = Date.now();

// cards: cartas reales de TCGdex con precio de mercado simulado
const baseCards = [
  { externalId: 'swsh3-20', name: 'Charizard VMAX', number: '20', rarity: 'Holo Rare VMAX' },
  { externalId: 'swsh3-19', name: 'Charizard V', number: '19', rarity: 'Holo Rare V' },
  { externalId: 'swsh3-117', name: 'Eternatus VMAX', number: '117', rarity: 'Holo Rare VMAX' },
  { externalId: 'swsh3-116', name: 'Eternatus V', number: '116', rarity: 'Holo Rare V' },
  { externalId: 'swsh3-115', name: 'Grimmsnarl VMAX', number: '115', rarity: 'Holo Rare VMAX' },
  { externalId: 'swsh3-136', name: 'Furret', number: '136', rarity: 'Uncommon' },
];

const cards = Array.from(baseCards, (card, i) => ({
  id: i + 1,
  externalId: card.externalId,
  name: card.name,
  setName: 'Darkness Ablaze',
  number: card.number,
  rarity: card.rarity,
  imageUrl: `https://assets.tcgdex.net/en/swsh/swsh3/${card.number}/high.png`,
  marketPrice: faker.number.float({ min: 0.5, max: 120, fractionDigits: 2 }),
  priceUpdatedAt: faker.date.recent({ days: 3 }).toISOString(),
}));

// shops
const shops = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `${faker.company.name()} TCG`,
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
  city: 'Málaga',
  openingHours: faker.helpers.arrayElement(['L-S 10:00-14:00 y 17:00-21:00', 'L-V 17:00-21:30 · S 10:00-14:00', 'L-S 11:00-21:00']),
}));

// offers: las 6 primeras son de la tienda 1, la del panel
const conditions = ['Mint', 'Near Mint', 'Excellent', 'Good', 'Light Played', 'Played', 'Poor'];

const offers = Array.from({ length: 20 }, (_, i) => {
  const card = faker.helpers.arrayElement(cards);
  return {
    id: i + 1,
    shopId: i < 6 ? 1 : faker.number.int({ min: 2, max: 5 }),
    cardId: card.id,
    price: Number((card.marketPrice * faker.number.float({ min: 0.9, max: 1.2 })).toFixed(2)),
    stock: faker.number.int({ min: 0, max: 5 }),
    condition: faker.helpers.arrayElement(conditions),
    createdAt: faker.date.recent({ days: 20 }).toISOString(),
  };
});

// reservations: de las ofertas de la tienda 1
const shopOffers = offers.filter(o => o.shopId === 1);

const reservations = Array.from({ length: 12 }, (_, i) => {
  const offer = faker.helpers.arrayElement(shopOffers);
  const card = cards.find(c => c.id === offer.cardId);
  const createdAt = faker.date.recent({ days: 6 });
  const expiresAt = new Date(createdAt.getTime() + 48 * HOUR);

  const roll = faker.number.int({ min: 1, max: 10 });
  let status;
  let pickedUpAt = null;
  if (roll <= 2) {
    status = 'cancelada';
  } else if (roll <= 5) {
    status = 'recogida';
    const maxPickup = Math.min(expiresAt.getTime(), now);
    pickedUpAt = new Date(faker.number.int({ min: createdAt.getTime(), max: maxPickup })).toISOString();
  } else {
    status = expiresAt.getTime() > now ? 'activa' : 'caducada';
  }

  return {
    id: i + 1,
    code: `MNT-${faker.string.alphanumeric({ length: 4, casing: 'upper' })}`,
    customerName: faker.person.fullName(),
    offerId: offer.id,
    cardName: card.name,
    cardImage: card.imageUrl,
    price: offer.price,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    status,
    pickedUpAt,
  };
});

// collection: cartas del usuario de demo, una fila por carta
const collectionConditions = ['MINT', 'NEAR_MINT', 'EXCELLENT', 'GOOD', 'PLAYED', 'POOR'];

const collection = Array.from(cards, (card, i) => ({
  id: i + 1,
  cardId: card.id,
  quantity: faker.number.int({ min: 1, max: 4 }),
  condition: faker.helpers.arrayElement(collectionConditions),
  addedAt: faker.date.recent({ days: 60 }).toISOString(),
}));
module.exports = () => ({ cards, shops, offers, reservations, collection });
