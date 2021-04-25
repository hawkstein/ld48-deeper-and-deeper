import styles from "./Enemy.module.css";

type EnemyProps = {
  stats: any;
  attack: any;
};

function Enemy({ stats, attack }: EnemyProps) {
  const { name, suspicion } = stats;
  return (
    <div className={styles.enemy}>
      <span>Opponent:</span>
      <span>{name}</span>
      <span>Suspicion: {Math.min(suspicion, 100)}%</span>
      <span>Attack: {attack.label}</span>
    </div>
  );
}

export default Enemy;
