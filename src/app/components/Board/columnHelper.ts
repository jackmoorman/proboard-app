import { uuid } from 'uuidv4';

interface Card {
  id: string;
  value: string | undefined;
}

type NewColumn = {
  id: string;
  title: string | undefined;
  cards: Card[];
};

export function createColumn(title: string | undefined) {
  const newCol: NewColumn = {
    id: uuid(),
    title: title,
    cards: [],
  };

  return newCol;
}

export function createCard(value: string | undefined) {
  const newCard: Card = {
    id: uuid(),
    value: value,
  };
  return newCard;
}
