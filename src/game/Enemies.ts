const RED_HANDLER = {
  name: "Red Handler Lvl 1",
  faction: "Red",
  quote: "Disloyal scum!",
  suspicion: 50,
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

const RED_HANDLER_ONE = {
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

const BLUE_HANDLER = {
  name: "Blue Handler Lvl 1",
  quote: "Better dead than red mate!",
  faction: "Blue",
  suspicion: 50,
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

function generateEnemies() {
  const enemies = {
    redHandlerOne: { ...RED_HANDLER_ONE },
    redHandlerTwo: { ...RED_HANDLER },
    redHandlerThree: { ...RED_HANDLER },
    blueHandlerOne: { ...BLUE_HANDLER },
    blueHandlerTwo: { ...BLUE_HANDLER },
    blueHandlerThree: { ...BLUE_HANDLER },
  };

  return enemies;
}

export { generateEnemies };
