/* eslint-disable no-unused-vars */
import * as React from "react";
import { motion } from "framer-motion";
import AppContext from "../AppContext";
import Button from "../Button";
import "./Screen.css";
import title from "../images/Title.svg";

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
      <div>
        <img
          alt="Deep Cover Title"
          aria-label="Deep Cover Game"
          src={title}
          style={{
            paddingTop: "40px",
            width: "min(100%, 600px)",
            margin: "0 auto",
            display: "block",
          }}
        />
      </div>
      <p className="App-blurb">Perfect your lies to survive!</p>
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
      </ul>
    </motion.section>
  );
}

/**
 * <li>
          <Button
            onClick={() => {
              send("OPTIONS");
            }}
          >
            Options
          </Button>
        </li>
 */

export default MenuScreen;
