/* eslint-disable no-unused-vars */
import "./Game.css";
import AppContext from "../AppContext";
import * as React from "react";
import { useMachine } from "@xstate/react";
import { Machine, assign } from "xstate";
import Dialogue from "./Dialogue";
import Welcome from "./dialogue/Welcome";
import BeatTheGame from "./dialogue/BeatTheGame";
import Map from "./Map";
import Encounter from "./Encounter";
import { buildDeck, shuffleDeck, CardType, isUnique, buildFlaw } from "./Deck";

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const RED_HANDLER = {
  name: "Red Handler Lvl 1",
  faction: "Red",
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

const BLUE_HANDLER = {
  name: "Blue Handler Lvl 1",
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

const enemies = {
  redHandlerOne: { ...RED_HANDLER },
  redHandlerTwo: { ...RED_HANDLER },
  redHandlerThree: { ...RED_HANDLER },
  blueHandlerOne: { ...BLUE_HANDLER },
  blueHandlerTwo: { ...BLUE_HANDLER },
  blueHandlerThree: { ...BLUE_HANDLER },
};

function buildMap() {
  const map = [
    {
      type: "dialogue",
      content: <Welcome />,
      visited: true,
    },
    {
      type: "map",
      visited: false,
    },
    {
      type: "encounter",
      label: "Handler One",
      enemies: "redHandlerOne",
      visited: false,
    },
    {
      type: "map",
      visited: false,
    },
    {
      type: "encounter",
      label: "Handler Two",
      enemies: "blueHandlerOne",
      visited: false,
    },
    {
      type: "map",
      visited: false,
    },
    {
      type: "encounter",
      label: "Handler Three",
      enemies: "redHandlerTwo",
      visited: false,
    },
    {
      type: "map",
      visited: false,
    },
    {
      type: "encounter",
      label: "Handler Four",
      enemies: "blueHandlerTwo",
      visited: false,
    },
    {
      type: "dialogue",
      content: <BeatTheGame />,
      visited: true,
    },
  ];
  return map;
}

const drawCards = ({ drawAmount, context }) => {
  const { deck, discard, hand } = context;
  let secondDraw = 0;
  if (deck.length < drawAmount) {
    secondDraw = drawAmount - deck.length;
  }
  let returnHand = deck.slice(0, drawAmount);
  let returnDeck = deck.slice(drawAmount);
  let returnDiscard = [...discard, ...hand];
  if (secondDraw > 0) {
    returnDeck = shuffleDeck(returnDiscard);
    returnDiscard = [];
    returnHand = [...returnHand, ...returnDeck.slice(0, secondDraw)];
    returnDeck = returnDeck.slice(secondDraw);
  }
  return {
    hand: returnHand,
    deck: returnDeck,
    discard: returnDiscard,
    handState: [],
  };
};

const drawCardToTable = ({ drawAmount, context }) => {
  const { deck, discard } = context;
  let secondDraw = 0;
  if (deck.length < drawAmount) {
    secondDraw = drawAmount - deck.length;
  }
  let theDraw = deck.slice(0, drawAmount);
  let returnDeck = deck.slice(drawAmount);
  let returnDiscard = [...discard];
  if (secondDraw > 0) {
    returnDeck = shuffleDeck(returnDiscard);
    returnDiscard = [];
    theDraw = [...theDraw, ...returnDeck.slice(0, secondDraw)];
    returnDeck = returnDeck.slice(secondDraw);
  }
  return {
    cards: theDraw,
    deck: returnDeck,
    discard: returnDiscard,
  };
};

const gameMachine = Machine(
  {
    id: "game",
    initial: "dialogue",
    context: {
      map: buildMap(),
      location: 0,
      deck: buildDeck(),
      discard: [],
      hand: [],
      handState: [],
      tableCards: [],
      focusId: null,
      suspicionRed: 50,
      suspicionBlue: 50,
      loyalty: 0.5,
      defenseBonus: 0,
      attackBonus: 0,
      currentAttack: null,
      enemies,
    },
    states: {
      dialogue: {
        id: "dialogue",
        on: {
          MAP: {
            target: "map",
            guard: "isMapNext",
            actions: ["moveLocation"],
          },
          ENCOUNTER: {
            target: "encounter",
            guard: "isEncounterNext",
            actions: ["moveLocation"],
          },
        },
      },
      map: {
        id: "map",
        on: {
          ENCOUNTER: {
            target: "encounter",
            guard: "isEncounterNext",
            actions: ["moveLocation"],
          },
          DIALOGUE: {
            target: "dialogue",
            guard: "isDialogueNext",
            actions: ["moveLocation"],
          },
        },
      },
      encounter: {
        id: "encounter",
        initial: "startTurn",
        exit: ["tidyUpEncounter"],
        states: {
          startTurn: {
            entry: ["drawHand", "pickAttack"],
            always: [
              { target: "playerSucceed", cond: "didPlayerSucceed" },
              { target: "playerFailure", cond: "didPlayerFail" },
              "playerDecision",
            ],
          },
          playerDecision: {
            on: {
              END_TURN: {
                target: "endTurn",
              },
              [CardType.ACTION]: {
                actions: ["useActionCard"],
              },
              [CardType.IDENTITY]: {
                target: ".pushYourLuck",
                actions: ["useIdentityCard"],
              },
              [CardType.RESOURCE]: {
                actions: ["useResourceCard"],
              },
              [CardType.ATTACK]: {
                actions: ["useAttackCard"],
              },
            },
            initial: "pickCards",
            states: {
              pickCards: {
                id: "pickCards",
              },
              pushYourLuck: {
                id: "pushYourLuck",
                entry: ["drawCardForIdentity"],
                exit: ["clearTableCards"],
                initial: "choose",
                states: {
                  choose: {
                    always: [{ target: "resolve", cond: "checkPushYourLuck" }],
                    on: {
                      NO_MORE: {
                        target: "resolve",
                      },
                      UNO_MAS: {
                        actions: ["drawCardForIdentity"],
                      },
                    },
                  },
                  resolve: {
                    entry: ["resolveIdentityCard"],
                    on: {
                      FINISHED: {
                        target: "#pickCards",
                      },
                    },
                  },
                },
              },
            },
          },
          endTurn: {
            entry: ["evaluateEndTurn"],
            always: [{ target: "startTurn" }],
          },
          playerSucceed: {
            type: "final",
            always: [
              {
                target: "#map",
                cond: "isMapNext",
                actions: ["moveLocation"],
              },
              {
                target: "#dialogue",
                cond: "isDialogueNext",
                actions: ["moveLocation"],
              },
            ],
          },
          playerFailure: { type: "final" },
        },
      },
    },
  },
  {
    guards: {
      isMapNext: (context) => {
        const { map, location } = context;
        const nextLocation = location + 1;
        return nextLocation < map.length && map[nextLocation].type === "map";
      },
      isEncounterNext: (context) => {
        const { map, location } = context;
        const nextLocation = location + 1;
        return (
          nextLocation < map.length && map[nextLocation].type === "encounter"
        );
      },
      isDialogueNext: (context) => {
        const { map, location } = context;
        const nextLocation = location + 1;
        return (
          nextLocation < map.length && map[nextLocation].type === "dialogue"
        );
      },
      didPlayerSucceed: (context) => {
        const { map, location } = context;
        const enemy = enemies[map[location].enemies];
        return enemy.suspicion >= 100 || enemy.roundsLeft <= 0;
      },
      didPlayerFail: (context) => {
        const { suspicionRed, suspicionBlue } = context;
        return suspicionRed >= 100 || suspicionBlue >= 100;
      },
      checkPushYourLuck: (context) => {
        const { tableCards } = context;
        return tableCards.length > 1 && !isUnique(tableCards);
      },
    },
    actions: {
      moveLocation: assign({
        location: (context) => context.location + 1,
        map: (context) => {
          const visitedMap = [...context.map];
          visitedMap[context.location + 1].visited = true;
          return visitedMap;
        },
      }),
      drawHand: assign((context) => {
        return drawCards({ drawAmount: 5, context });
      }),
      pickAttack: assign({
        currentAttack: (context) => {
          const { map, location } = context;
          const { attacks } = enemies[map[location].enemies];
          return sample(attacks);
        },
      }),
      evaluateEndTurn: assign((context) => {
        const {
          map,
          location,
          suspicionRed,
          suspicionBlue,
          currentAttack,
        } = context;
        const enemy = enemies[map[location].enemies];
        if (enemy) {
          enemy.roundsLeft = enemy.roundsLeft - 1;
        }
        console.log(enemy.faction === "Red" ? 1 : 0);
        return {
          suspicionRed:
            suspicionRed +
            currentAttack.strength * (enemy.faction === "Red" ? 1 : 0),
          suspicionBlue:
            suspicionBlue +
            currentAttack.strength * (enemy.faction === "Blue" ? 1 : 0),
          discard: [...context.discard, ...context.tableCards],
          tableCards: [],
        };
      }),
      useActionCard: assign((context, event) => {
        console.log(`Action! ${event.card.id}`);
        const { map, location, loyalty, handState } = context;
        const enemy = enemies[map[location].enemies];
        const adjust = enemy.faction === "Red" ? 0.1 : -0.1;
        return {
          loyalty: Math.max(Math.min(1, loyalty + adjust), 0),
          handState: [...handState, event.card.id],
        };
      }),
      useResourceCard: (context, event) => {
        console.log(`Resource! ${event.card.id}`);
      },
      useIdentityCard: assign((context, event) => {
        console.log(`Identity! ${event.card.id}`);
        const { handState } = context;
        return {
          handState: [...handState, event.card.id],
          discard: [...context.discard, ...context.tableCards],
          tableCards: [],
          focusId: event.card.id,
        };
      }),
      useAttackCard: assign((context, event) => {
        console.log(`Attack! ${event.card.id}`);
        const { map, location, handState } = context;
        const enemy = enemies[map[location].enemies];
        if (enemy) {
          enemy.suspicion += 3;
        }
        return {
          handState: [...handState, event.card.id],
        };
      }),
      drawCardForIdentity: assign((context) => {
        const { tableCards } = context;
        const { cards, deck, discard } = drawCardToTable({
          drawAmount: 1,
          context,
        });
        return {
          tableCards: [...tableCards, ...cards],
          deck,
          discard,
        };
      }),
      clearTableCards: assign({
        discard: (context) => [...context.tableCards, ...context.discard],
        tableCards: [],
        focusId: null,
      }),
      resolveIdentityCard: assign((context) => {
        const { tableCards, hand, deck, focusId } = context;
        if (tableCards.length > 1 && isUnique(tableCards)) {
          const card = hand.find((card) => card.id === focusId);
          card.bonus = Math.min(10, card.bonus + tableCards.length);
        } else if (!isUnique(tableCards)) {
          return {
            deck: [...deck, buildFlaw()],
          };
        }
        return {};
      }),
      tidyUpEncounter: assign({
        deck: (context) =>
          shuffleDeck([...context.deck, ...context.hand, ...context.discard]),
        hand: [],
        discard: [],
      }),
    },
  }
);

function GameRouter({ state, send }) {
  const { map, location } = state.context;
  function nextScreen() {
    const nextLocation = location + 1;
    if (nextLocation < map.length) {
      send(map[nextLocation].type.toUpperCase());
    }
  }
  switch (state.toStrings()[0]) {
    case "dialogue":
      return (
        <Dialogue okHandler={nextScreen}>
          {state.context.map[state.context.location].content}
        </Dialogue>
      );
    case "map":
      return (
        <Map
          map={state.context.map.filter((node) => node.type === "encounter")}
          okHandler={nextScreen}
          enemies={enemies}
        />
      );
    case "encounter":
      return <Encounter state={state} send={send} />;
    default:
      return null;
  }
}

function BrainJarGame() {
  const [_, sendToApp] = React.useContext(AppContext);
  const [gameState, send] = useMachine(
    gameMachine.withConfig({
      appSend: sendToApp,
    })
  );
  return (
    <div className="Game-container">
      <GameRouter state={gameState} send={send} />
    </div>
  );
}

export default BrainJarGame;
