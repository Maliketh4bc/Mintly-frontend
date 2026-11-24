export type CardCondition = 'Mint' | 'Near Mint' | 'Excellent' | 'Good' | 'Light Played' | 'Played' | 'Poor';

export interface Offer {
  id: number;
  shopId: number;
  cardId: number;
  price: number;
  stock: number;
  condition: CardCondition;
  createdAt: string;
}
