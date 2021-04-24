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

/**
 *       <div>
        <img
          alt="Brain Jar Title"
          aria-label="Brain Jar Game"
          src={title}
          style={{
            paddingTop: "40px",
            width: "min(100%, 600px)",
            margin: "0 auto",
            display: "block",
          }}
        />
      </div>
 */

function MenuScreen() {
  const [_, send] = React.useContext(AppContext);
  return (
    <motion.section
      key="menu-screen"
      className="Screen-container"
      variants={variants}
      initial="setup"
      animate="entrance"
      exit="exit"
    >
      <ul className="App-list">
        <li>
          <Button
            onClick={() => {
              send("PLAY");
            }}
          >
            Start Game
          </Button>
        </li>
        <li>
          <Button
            onClick={() => {
              send("OPTIONS");
            }}
          >
            Options
          </Button>
        </li>
      </ul>
    </motion.section>
  );
}

export default MenuScreen;
