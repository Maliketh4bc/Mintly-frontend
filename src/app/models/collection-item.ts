import { Card } from './card';

export type CollectionCondition = 'MINT' | 'NEAR_MINT' | 'EXCELLENT' | 'GOOD' | 'PLAYED' | 'POOR';

export interface CollectionItem {
    id: number;
    cardId: number;
    quantity: number;
    condition: CollectionCondition;
    addedAt: string;
    card?: Card;
}