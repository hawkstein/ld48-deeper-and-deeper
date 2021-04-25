import styles from "./Encounter.module.css";
import Player from "./ui/Player";
import Hand from "./ui/Hand";
import Enemy from "./ui/Enemy";
import PushYourLuck from "./ui/PushYourLuck";
import { motion } from "framer-motion";

type EncounterProps = {
  state: any;
  send: any;
};

const variants = {
  setup: { x: 100, opacity: 0 },
  entrance: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
  exit: {
    x: -100,
    opacity: 0,
  },
};

function Encounter({ state, send }: EncounterProps) {
  const {
    deck,
    discard,
    hand,
    handState,
    tableCards,
    map,
    location,
    enemies,
    currentAttack,
  } = state.context;
  return (
    <motion.section
      key="encounter"
      variants={variants}
      initial="setup"
      animate="entrance"
      exit="exit"
      style={{ flex: 1, display: "flex", width: "100%" }}
    >
      {tableCards.length > 0 && (
        <div className={styles.overlay}>
          <PushYourLuck
            cards={tableCards}
            matches={state.matches}
            send={send}
            faction={enemies[map[location].enemies].faction}
          />
        </div>
      )}
      <div className={styles.wrap}>
        <div className={styles.deck}>
          <span className={styles.pile}>
            {deck.length} card{deck.length === 1 ? "" : "s"} left in the deck
          </span>
          <span className={styles.pile}>
            {discard.length} card{discard.length === 1 ? "" : "s"} in the
            discard
          </span>
        </div>
        <div className={styles.enemy}>
          <Enemy
            stats={enemies[map[location].enemies]}
            attack={currentAttack}
          />
        </div>
        <div className={styles.ui}>
          <Player
            suspicionRed={state.context.suspicionRed}
            suspicionBlue={state.context.suspicionBlue}
            loyalty={state.context.loyalty}
          />
        </div>

        <div className={styles.hand}>
          <Hand
            hand={hand}
            handState={handState}
            send={send}
            faction={enemies[map[location].enemies].faction}
          />
        </div>
      </div>
    </motion.section>
  );
}

export default Encounter;
