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
  effect: string;
  type: CardType;
  id?: string;
  action?: string;
  bonus?: number;
};

const tellATale: Card = {
  name: "Tell a tale",
  type: CardType.IDENTITY,
  description:
    "Improve this cover identity! Can you improve on Mr Person from Big Town? I don't know friend... I just don't know",
  effect: "Adds defence against opponents attack",
  bonus: 1,
};

const suspicion: Card = {
  name: "Under suspicion",
  type: CardType.FLAW,
  description:
    "Unbelievably, you are are once again the center of false allegations. Who starts these rumours?",
  effect: "+2 suspicion at turn end",
};

const sowDissent: Card = {
  name: "Sow dissent!",
  type: CardType.ACTION,
  description:
    "You're the one who's done all the work around here! You've got the video and unpaid witnesses to prove it!",
  effect: "Increase faction loyalty",
};

const ally: Card = {
  name: "Loyal friend",
  type: CardType.RESOURCE,
  description:
    "A loyal friend who helps you with your plans. Oh no, you'd never betray them! Of course not. No chance",
  effect: "Remove 'Under Suspicion'",
};

const accusation: Card = {
  name: "Counter accusation!",
  type: CardType.ATTACK,
  description:
    "Turn the tables and bring judgement on your accuser! Everyone's shady in this city",
  effect: "Increase opponent's suspicion",
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
