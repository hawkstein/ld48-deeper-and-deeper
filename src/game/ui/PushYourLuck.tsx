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
      <div className={pushStyles.instructions}>
        <p>Draw cards one by one, you don't want to draw two matching cards.</p>
        <p>
          For each unique card, you'll build a better deep cover, and increase
          its defense by one.
        </p>
        <p>
          When you increase defence however, an 'Under Suspicion' card is added
          to your deck.
        </p>
        <p>If you match two cards, the defense will decrease by one!</p>
        <p>
          Tip: when cards have a high defence, it can be worthwhile picking 'No
          more' straight away. They will just lose one defence but will help a
          lot this turn.
        </p>
      </div>
    </div>
  );
}

export default PushYourLuck;
