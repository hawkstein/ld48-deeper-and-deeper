const BAZZA_WAX = {
  name: "Bazza Wax",
  quote: "Better red than dead mate!",
  faction: "Red",
  suspicion: 70,
  roundsLeft: 6,
  attacks: [
    {
      label: "Accusation!",
      strength: 3,
    },
    {
      label: "Betrayer!",
      strength: 5,
    },
    {
      label: "Common suspicion",
      strength: 2,
    },
  ],
};

const JEFF_SMITH = {
  name: "Jeff Smith",
  quote: "You working for the reds, I'll kill ya meself!",
  faction: "Blue",
  suspicion: 70,
  roundsLeft: 5,
  attacks: [
    {
      label: "Accusation!",
      strength: 3,
    },
    {
      label: "Betrayer!",
      strength: 5,
    },
    {
      label: "Common suspicion",
      strength: 2,
    },
  ],
};

const SALLY_SMILER = {
  name: "Sally Smile",
  faction: "Red",
  quote: "Disloyal scum!",
  suspicion: 65,
  roundsLeft: 5,
  attacks: [
    {
      label: "Accusation!",
      strength: 3,
    },
    {
      label: "Damning Evidence!",
      strength: 7,
    },
    {
      label: "Lies & falsehoods!",
      strength: 4,
    },
  ],
};

const BASIL_BARKER = {
  name: "Basil Barker",
  quote: "Better dead than red mate!",
  faction: "Blue",
  suspicion: 55,
  roundsLeft: 5,
  attacks: [
    {
      label: "Accusation!",
      strength: 3,
    },
    {
      label: "Betrayer!",
      strength: 6,
    },
    {
      label: "Damning Evidence!",
      strength: 7,
    },
    {
      label: "Lies & falsehoods!",
      strength: 4,
    },
  ],
};

const ABI_ANARCHY = {
  name: "Abi Anarchy",
  faction: "Red",
  quote: "Disloyal scum!",
  suspicion: 20,
  roundsLeft: 5,
  attacks: [
    {
      label: "Accusation!",
      strength: 3,
    },
    {
      label: "Betrayer!",
      strength: 6,
    },
    {
      label: "Damning Evidence!",
      strength: 10,
    },
    {
      label: "Lies & falsehoods!",
      strength: 8,
    },
    {
      label: "Common suspicion",
      strength: 4,
    },
  ],
};

const EDDIE_T = {
  name: "Eddie T",
  quote: "Better dead than red mate!",
  faction: "Blue",
  suspicion: 35,
  roundsLeft: 5,
  attacks: [
    {
      label: "Accusation!",
      strength: 6,
    },
    {
      label: "Betrayer!",
      strength: 6,
    },
    {
      label: "Concrete Alibi!",
      strength: 14,
    },
    {
      label: "Lies & falsehoods!",
      strength: 7,
    },
    {
      label: "Common suspicion",
      strength: 4,
    },
  ],
};

const CRIMSON_KATH = {
  name: "Crimson Kath",
  faction: "Red",
  quote: "Disloyal scum!",
  suspicion: 10,
  roundsLeft: 5,
  attacks: [
    {
      label: "Accusation!",
      strength: 8,
    },
    {
      label: "Damning Evidence!",
      strength: 14,
    },
    {
      label: "Personnal Vendetta",
      strength: 12,
    },
    {
      label: "Lies & falsehoods!",
      strength: 7,
    },
  ],
};

const LORD_SOMETHING = {
  name: "Lord Something",
  quote: "Better dead than red mate!",
  faction: "Blue",
  suspicion: 0,
  roundsLeft: 5,
  attacks: [
    {
      label: "Concrete Alibi!",
      strength: 14,
    },
    {
      label: "Accusation!",
      strength: 5,
    },
    {
      label: "Damning Evidence!",
      strength: 17,
    },
    {
      label: "Personnal Vendetta",
      strength: 8,
    },
    {
      label: "Lies & falsehoods!",
      strength: 10,
    },
  ],
};

function generateEnemies() {
  const enemies = {
    redHandlerOne: { ...BAZZA_WAX },
    redHandlerTwo: { ...SALLY_SMILER },
    redHandlerThree: { ...ABI_ANARCHY },
    redHandlerFour: { ...CRIMSON_KATH },
    blueHandlerOne: { ...JEFF_SMITH },
    blueHandlerTwo: { ...BASIL_BARKER },
    blueHandlerThree: { ...EDDIE_T },
    blueHandlerFour: { ...LORD_SOMETHING },
  };

  return enemies;
}

export { generateEnemies };
