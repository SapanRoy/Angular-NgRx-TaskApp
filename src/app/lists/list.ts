import { Card } from './components/cards/card';

/* Defines the list */
export interface List {

    id: string;
    squenceNo: number;
    isEditMode: boolean;
    name: string;
    cards: Card[];
}