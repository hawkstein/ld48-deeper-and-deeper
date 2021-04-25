import { Card } from "../Deck";
import styles from "./Hand.module.css";
import Button from "../../Button";
import { motion } from "framer-motion";
import DisplayCard from "./DisplayCard";

function Hand({
  hand,
  handState,
  send,
  faction,
}: {
  hand: Card[];
  handState: string[];
  send: any;
  faction: string;
}) {
  return (
    <>
      <motion.ul className={styles.hand}>
        {hand.map((card: Card, index: number, cards) => (
          <DisplayCard
            key={`${card.id}-${index}`}
            card={card}
            index={index}
            cards={cards}
            send={send}
            handState={handState}
            faction={faction}
          />
        ))}
      </motion.ul>
      <div className={styles.options}>
        <div>
          <Button onClick={() => send("END_TURN")}>END TURN</Button>
        </div>
      </div>
    </>
  );
}

export default Hand;
