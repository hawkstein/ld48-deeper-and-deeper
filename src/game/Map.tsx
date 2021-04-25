import Button from "../Button";
import styles from "./Map.module.css";
import { motion } from "framer-motion";

type MapProps = {
  map: {
    label: string;
    visited: boolean;
    enemies: string;
  }[];
  okHandler: () => void;
  enemies: any;
};

const getStyle = (visited: boolean, faction: "Red" | "Blue") => {
  if (visited) return styles.visited;
  if (faction === "Red") {
    return styles.red;
  } else {
    return styles.blue;
  }
};

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

function Map({ map, okHandler, enemies: enemyMap }: MapProps) {
  return (
    <motion.section
      key="map"
      variants={variants}
      initial="setup"
      animate="entrance"
      exit="exit"
      className={styles.map}
    >
      <h1>Your route to freedom... or power...</h1>
      <ul>
        {map.map(({ visited, label, enemies }) => (
          <li
            key={label}
            className={`${styles.enemy} ${getStyle(
              visited,
              enemyMap[enemies].faction
            )}`}
          >
            {label}
          </li>
        ))}
      </ul>
      <div>
        <Button onClick={okHandler}>OK</Button>
      </div>
    </motion.section>
  );
}

export default Map;
