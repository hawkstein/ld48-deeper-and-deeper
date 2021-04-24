/* eslint-disable no-unused-vars */
import * as React from "react";
import { motion } from "framer-motion";
import AppContext from "../AppContext";
import Button from "../Button";
import "./Screen.css";
import "./OptionsScreen.css";
import ToggleButton from "../components/ToggleButton";
import CycleSelect from "../components/CycleSelect";

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

function OptionsScreen() {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    hidden: { opacity: 0 },
  };

  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  };
  const [_, send] = React.useContext(AppContext);
  return (
    <motion.section
      key="options-screen"
      className="Screen-container"
      variants={variants}
      initial="setup"
      animate="entrance"
      exit="exit"
    >
      <div style={{ width: "max-content", margin: "0 auto" }}>
        <h1 className="OptionScreen-title">Options Screen</h1>
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={list}
          className="OptionsScreen-list"
        >
          <motion.li variants={item}>
            <span>Reduced Animation: On</span>
            <ToggleButton />
          </motion.li>
          <motion.li variants={item}>
            <span>Sound: On</span>
            <ToggleButton />
          </motion.li>
          <motion.li variants={item}>
            <span>Difficulty:</span>
            <CycleSelect />
          </motion.li>
        </motion.ul>
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

export default OptionsScreen;
