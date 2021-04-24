import Button from "../Button";
import styles from "./Map.module.css";

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

function Map({ map, okHandler, enemies: enemyMap }: MapProps) {
  return (
    <div className={styles.map}>
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
    </div>
  );
}

export default Map;
