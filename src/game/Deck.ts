import { uid } from "uid";

export enum CardType {
  IDENTITY = "IDENTITY",
  FLAW = "FLAW",
  ACTION = "ACTION",
  RESOURCE = "RESOURCE",
  ATTACK = "ATTACK",
}

export type Card = {
  name: string;
  description: string;
  type: CardType;
  id?: string;
  action?: string;
  bonus?: number;
};

const tellATale: Card = {
  name: "Tell a tale",
  type: CardType.IDENTITY,
  description: "See how well you can improve this cover identity!",
  bonus: 1,
};

const suspicion: Card = {
  name: "A little suspicious",
  type: CardType.FLAW,
  description:
    "Your opponent is a little suspicious of some rumours. Can't be played. +2 suspicion at end of turn.",
};

const sowDissent: Card = {
  name: "Sow dissent!",
  type: CardType.ACTION,
  description: "Show this handler that your actions have helped their faction!",
};

const ally: Card = {
  name: "Loyal friend",
  type: CardType.RESOURCE,
  description:
    "A loyal friend who helps you with your plans. Suspicion bonus to any attacks.",
};

const accusation: Card = {
  name: "Firm accusation",
  type: CardType.ATTACK,
  description: "Turn the tables and bring judgement on your accuser!",
};

function buildDeck() {
  const deck: Card[] = [
    { ...tellATale, id: uid() },
    { ...tellATale, id: uid() },
    { ...tellATale, id: uid() },
    { ...suspicion, id: uid() },
    { ...suspicion, id: uid() },
    { ...sowDissent, id: uid() },
    { ...sowDissent, id: uid() },
    { ...ally, id: uid() },
    { ...accusation, id: uid() },
    { ...accusation, id: uid() },
    { ...accusation, id: uid() },
    { ...accusation, id: uid() },
  ];
  return shuffleDeck(deck);
}

function buildFlaw() {
  return { ...suspicion, id: uid() };
}

const shuffleDeck = ([...deck]: Card[]) => {
  let m = deck.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [deck[m], deck[i]] = [deck[i], deck[m]];
  }
  return deck;
};

function isUnique(cards: Card[]) {
  const tmpArr = [];
  for (let obj in cards) {
    if (tmpArr.indexOf(cards[obj].type) < 0) {
      tmpArr.push(cards[obj].type);
    } else {
      return false;
    }
  }
  return true;
}

export { buildDeck, buildFlaw, shuffleDeck, isUnique };
