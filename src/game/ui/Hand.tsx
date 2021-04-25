import { Card, CardType } from "../Deck";
import styles from "./Hand.module.css";
import Button from "../../Button";

function cardState(id: string | undefined, handState: string[]) {
  if (id && handState.includes(id)) {
    return styles.disabledCard;
  } else {
    return null;
  }
}

function Hand({
  hand,
  handState,
  send,
}: {
  hand: Card[];
  handState: string[];
  send: any;
}) {
  return (
    <>
      <ul className={styles.hand}>
        {hand.map((card: Card, index: number) => (
          <li
            key={`${index}`}
            className={`${styles.card} ${cardState(card.id, handState)}`}
            onClick={() => {
              if (card.id && !handState.includes(card.id)) {
                send(card.type, { card });
              }
            }}
          >
            <span className={styles.title}>{card.name}</span>
            <span className={styles.description}>{card.description}</span>
            {card.type === CardType.IDENTITY && (
              <span>Defense: {card.bonus}</span>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.options}>
        <div>
          <Button onClick={() => send("END_TURN")}>END TURN</Button>
        </div>
      </div>
    </>
  );
}

export default Hand;
