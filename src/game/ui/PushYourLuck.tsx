import Button from "../../Button";
import { Card, CardType } from "../Deck";
import styles from "./DisplayCard.module.css";
import pushStyles from "./PushYourLuck.module.css";
import { motion } from "framer-motion";

function DisplayCard({ card, faction }: { card: Card; faction: string }) {
  return (
    <motion.li
      className={`${styles.card} ${
        card.type === CardType.FLAW ? styles.flaw : ``
      }`}
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

function PushYourLuck({
  cards,
  send,
  matches,
  faction,
}: {
  cards: Card[];
  send: any;
  matches: (check: any) => boolean;
  faction: string;
}) {
  return (
    <div>
      <ul className={pushStyles.flop}>
        {cards.map((card, index) => (
          <DisplayCard
            key={`${card.name}-${index}`}
            card={card}
            faction={faction}
          />
        ))}
      </ul>
      <div className={pushStyles.buttons}>
        {matches("encounter.playerDecision.pushYourLuck.choose") && (
          <>
            <Button
              onClick={() => {
                send("NO_MORE");
              }}
            >
              No more
            </Button>
            <Button
              onClick={() => {
                send("UNO_MAS");
              }}
            >
              One more!
            </Button>
          </>
        )}
        {matches("encounter.playerDecision.pushYourLuck.resolve") && (
          <>
            <Button
              onClick={() => {
                send("FINISHED");
              }}
            >
              Finished
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default PushYourLuck;
