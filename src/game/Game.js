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
import { buildDeck, shuffleDeck } from "./Deck";

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const RED_HANDLER = {
  name: "Red Handler Lvl 1",
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
  redHandlerFour: { ...RED_HANDLER },
  redHandlerFive: { ...RED_HANDLER },
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
      enemies: "redHandlerTwo",
      visited: false,
    },
    {
      type: "map",
      visited: false,
    },
    {
      type: "encounter",
      label: "Handler Three",
      enemies: "redHandlerThree",
      visited: false,
    },
    {
      type: "map",
      visited: false,
    },
    {
      type: "encounter",
      label: "Handler Four",
      enemies: "redHandlerFour",
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
      suspicionRed: 0,
      suspicionBlue: 0,
      loyalty: 0.5,
      currentDefense: 0,
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
        return enemy.suspicion >= 100 || enemy.roundsLeft <= 1;
      },
      didPlayerFail: (context) => {
        const { suspicionRed, suspicionBlue } = context;
        return suspicionRed >= 100 || suspicionBlue >= 100;
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
        const drawAmount = 5;
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
        };
      }),
      pickAttack: assign({
        currentAttack: (context) => {
          const { map, location } = context;
          const { attacks } = enemies[map[location].enemies];
          return sample(attacks);
        },
      }),
      evaluateEndTurn: (context) => {
        const { map, location } = context;
        const enemy = enemies[map[location].enemies];
        if (enemy) {
          enemy.roundsLeft = enemy.roundsLeft - 1;
        }
      },
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
