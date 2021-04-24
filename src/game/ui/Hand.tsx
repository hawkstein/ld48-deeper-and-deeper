import { Card } from "../Deck";
import styles from "./Hand.module.css";
import Button from "../../Button";

function Hand({ hand, send }: { hand: Card[]; send: any }) {
  return (
    <>
      <ul className={styles.hand}>
        {hand.map((card: Card, index: number) => (
          <li key={`${index}`} className={styles.card}>
            {card.name}
          </li>
        ))}
      </ul>
      <div>
        <Button onClick={() => send("END_TURN")}>END TURN</Button>
      </div>
    </>
  );
}

export default Hand;
