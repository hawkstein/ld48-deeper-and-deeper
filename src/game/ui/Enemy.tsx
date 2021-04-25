import styles from "./Enemy.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { uid } from "uid";
import { Card, CardType } from "../Deck";
import React from "react";

type EnemyProps = {
  stats: any;
  attack: any;
  hand: Card[];
  handState: string[];
};

function Enemy({ stats, attack, hand, handState }: EnemyProps) {
  const { name, suspicion, faction } = stats;
  const [attackKey, setAttackKey] = React.useState(uid());
  React.useEffect(() => {
    setAttackKey(uid());
  }, [attack, setAttackKey]);
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

      <span>Suspicion: {Math.min(suspicion, 100)}%</span>
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
            key={attackKey}
            exit={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
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
