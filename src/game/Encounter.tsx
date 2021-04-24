import styles from "./Encounter.module.css";
import Player from "./ui/Player";
import { Card } from "./Deck";

type EncounterProps = {
  state: any;
  send: any;
};

function Encounter({ state, send }: EncounterProps) {
  const { deck, discard, hand } = state.context;
  return (
    <div className={styles.wrap}>
      <div className={styles.ui}>
        <Player
          suspicion={state.context.suspicion}
          loyalty={state.context.loyalty}
        />
      </div>
      <div className={styles.enemy}>Enemy</div>
      <div className={styles.deck}>
        <span>{deck.length} cards left in the deck</span>
        <span>{hand.length} cards in hand</span>
        <span>{discard.length} cards in the discard</span>
      </div>
      <div className={styles.hand}>
        <ul>
          {state.context.hand.map((card: Card, index: number) => (
            <li key={`${index}`}>{card.name}</li>
          ))}
        </ul>
        <button onClick={() => send("END_TURN")}>END TURN</button>
      </div>
    </div>
  );
}

export default Encounter;
