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
      strength: 6,
    },
    {
      label: "Common suspicion",
      strength: 3,
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
      strength: 5,
    },
    {
      label: "Betrayer!",
      strength: 6,
    },
    {
      label: "Common suspicion",
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
      strength: 5,
    },
    {
      label: "Betrayer!",
      strength: 6,
    },
    {
      label: "Common suspicion",
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
      strength: 7,
    },
    {
      label: "Betrayer!",
      strength: 7,
    },
    {
      label: "Common suspicion",
      strength: 5,
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
      strength: 10,
    },
    {
      label: "Betrayer!",
      strength: 12,
    },
    {
      label: "Common suspicion",
      strength: 9,
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
      strength: 9,
    },
    {
      label: "Betrayer!",
      strength: 14,
    },
    {
      label: "Common suspicion",
      strength: 9,
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
      label: "Accusation!",
      strength: 10,
    },
    {
      label: "Betrayer!",
      strength: 15,
    },
    {
      label: "Common suspicion",
      strength: 12,
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
