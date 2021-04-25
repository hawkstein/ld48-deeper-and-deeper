import * as React from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import Game from "./game/Game";
import AppContext from "./AppContext";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import MenuScreen from "./screens/MenuScreen";
import OptionsScreen from "./screens/OptionsScreen";
import GameOverScreen from "./screens/GameOverScreen";

const appMachine = Machine({
  id: "app",
  initial: "menu",
  context: {
    options: {
      animation: true,
      sound: 1,
      difficulty: "standard",
    },
  },
  states: {
    menu: {
      on: { PLAY: "play", OPTIONS: "options" },
    },
    options: {
      on: { MENU: "menu" },
    },
    play: {
      on: { END: "gameOver", MENU: "menu" },
    },
    gameOver: {
      on: { MENU: "menu" },
    },
  },
});

function ScreenRouter() {
  const [state] = React.useContext(AppContext);
  const rootState = state.toStrings()[0];
  return (
    <AnimatePresence>
      {rootState === "menu" && <MenuScreen />}
      {rootState === "options" && <OptionsScreen />}
      {rootState === "play" && (
        <motion.section
          key="play-screen"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            padding: "20px",
            display: "flex",
          }}
        >
          <Game />
        </motion.section>
      )}
      {rootState === "gameOver" && <GameOverScreen />}
    </AnimatePresence>
  );
}

function App() {
  const machine = useMachine(appMachine);
  return (
    <AppContext.Provider value={machine}>
      <div className="App">
        <ScreenRouter />
      </div>
    </AppContext.Provider>
  );
}

export default App;
