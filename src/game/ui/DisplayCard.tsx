import { Card, CardType } from "../Deck";
import styles from "./DisplayCard.module.css";
import { motion } from "framer-motion";

function cardState(id: string | undefined, handState: string[]) {
  if (id && handState.includes(id)) {
    return styles.disabledCard;
  } else {
    return ``;
  }
}

const variants = {
  visible: ({ i, l }: { i: number; l: number }) => {
    return {
      opacity: 1,
      y: 10,
      transition: {
        delay: i * 0.1,
      },
    };
  },
  hidden: { y: 30, opacity: 0 },
};

function DisplayCard({
  card,
  index,
  cards,
  handState,
  send,
  faction,
}: {
  card: Card;
  index: number;
  cards: Card[];
  handState: string[];
  send: any;
  faction: string;
}) {
  return (
    <motion.li
      initial="hidden"
      custom={{ i: index, l: cards.length }}
      animate="visible"
      variants={variants}
      className={`${styles.card} ${cardState(card.id, handState)}${
        card.type === CardType.FLAW ? styles.flaw : ``
      }`}
      onClick={() => {
        if (card.id && !handState.includes(card.id)) {
          send(card.type, { card });
        }
      }}
    >
      <div className={styles[faction.toLowerCase()]}>
        <span className={styles.title}>{card.name}</span>
        <span className={styles.description}>{card.description}</span>
        {card.type === CardType.IDENTITY && (
          <span className={styles.effect}>
            Defense:{" "}
            <span className={styles.bonus}>
              <span>{card.bonus}</span>
            </span>{" "}
            against attack
          </span>
        )}
        {card.type !== CardType.IDENTITY && (
          <span className={styles.effect}>{card.effect}</span>
        )}
      </div>
    </motion.li>
  );
}
//Math.abs(((i - (l - 1) / 2) / l) * 80)
/**style={{
        rotateZ: ((index - (cards.length - 1) / 2) / cards.length) * 20,
      }} */
export default DisplayCard;
