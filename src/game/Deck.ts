enum CardType {
  IDENTITY,
  FLAW,
  ACTION,
  RESOURCE,
  ATTACK,
}

type Card = {
  name: string;
  type: CardType;
};

const tellATale: Card = {
  name: "Tell a tale",
  type: CardType.IDENTITY,
};

const suspicion: Card = {
  name: "A little suspicious",
  type: CardType.FLAW,
};

const sowDissent: Card = {
  name: "Sow dissent!",
  type: CardType.ACTION,
};

const ally: Card = {
  name: "Loyal friend",
  type: CardType.RESOURCE,
};

const accusation: Card = {
  name: "Firm accusation",
  type: CardType.ATTACK,
};

function buildDeck() {
  const deck: Card[] = [
    { ...tellATale },
    { ...tellATale },
    { ...tellATale },
    { ...suspicion },
    { ...suspicion },
    { ...sowDissent },
    { ...sowDissent },
    { ...ally },
    { ...accusation },
    { ...accusation },
    { ...accusation },
    { ...accusation },
  ];
  return deck;
}

export { buildDeck };
