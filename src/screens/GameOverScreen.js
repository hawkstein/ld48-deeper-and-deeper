/* eslint-disable no-unused-vars */
import * as React from "react";
import { motion } from "framer-motion";
import AppContext from "../AppContext";
import Button from "../Button";
import "./Screen.css";
import styles from "./GameOver.module.css";

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
      <div className={styles.message}>
        <h1>Game Over!</h1>
        <p>Sadly the finger of suspicion was firmly pointed at yourself</p>
        <p>
          Your cover was blown and you'll head no deeper into either network!
        </p>
        <p>Thanks for playing!</p>
        <p>
          (If you'd like to play again, please refresh as there is a bug with
          replays)
        </p>
        <Button
          onClick={() => {
            send("MENU");
          }}
        >
          Return to Main Menu
        </Button>
      </div>
    </motion.section>
  );
}

export default GameOverScreen;
