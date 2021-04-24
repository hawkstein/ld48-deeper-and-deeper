/* eslint-disable no-unused-vars */
import * as React from "react";
import { motion } from "framer-motion";
import AppContext from "../AppContext";
import Button from "../Button";
import "./Screen.css";

const variants = {
  setup: { x: 300, opacity: 0 },
  entrance: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
  exit: {
    x: -300,
    opacity: 0,
  },
};

function GameOverScreen() {
  const [_, send] = React.useContext(AppContext);
  return (
    <motion.section
      key="gameover-screen"
      className="Screen-container"
      variants={variants}
      initial="setup"
      animate="entrance"
      exit="exit"
    >
      <h1>Game Over!</h1>
      <Button
        onClick={() => {
          send("MENU");
        }}
      >
        Return to Main Menu
      </Button>
    </motion.section>
  );
}

export default GameOverScreen;
