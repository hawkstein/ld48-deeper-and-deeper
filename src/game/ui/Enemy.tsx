import styles from "./Enemy.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardType } from "../Deck";

type EnemyProps = {
  stats: any;
  attack: any;
  hand: Card[];
  handState: string[];
};

function Enemy({ stats, attack, hand, handState }: EnemyProps) {
  const { name, suspicion, faction, roundsLeft } = stats;
  const defense = hand
    .filter(
      (card) =>
        handState.includes(card.id || "") && card.type === CardType.IDENTITY
    )
    .reduce((prev, curr) => {
      return prev + (curr.bonus || 0);
    }, 0);
  return (
    <div className={styles.enemy}>
      <div className={styles.header}>
        <span>Opponent:</span>
        <span className={`${styles.opponent} ${styles[faction.toLowerCase()]}`}>
          {name}
        </span>
      </div>
      <AnimatePresence>
        <motion.div
          key={`${Math.min(suspicion, 100)}`}
          exit={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          initial={{
            y: 20,
            opacity: 0,
          }}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Suspicion: {Math.min(suspicion, 100)}%</span>
        </motion.div>
      </AnimatePresence>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AnimatePresence>
          <motion.div
            key={`${attack.label}${roundsLeft}`}
            exit={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
            }}
            initial={{
              y: -10,
              opacity: 0,
              scale: 2,
              rotate: Math.floor(Math.random() * 20) - 10,
            }}
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Attack: {attack.label}</span>
            <span>
              Strength: {attack.strength} Defense: {defense}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Enemy;
