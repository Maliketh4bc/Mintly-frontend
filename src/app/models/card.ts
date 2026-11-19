export interface Card {
  id: number;
  externalId: string;
  name: string;
  setName: string;
  number: string;
  rarity: string | null;
  imageUrl: string | null;
  marketPrice: number | null;
  priceUpdatedAt: string | null;
}
