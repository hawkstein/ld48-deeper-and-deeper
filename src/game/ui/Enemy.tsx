import styles from "./Enemy.module.css";

type EnemyProps = {
  stats: any;
  attack: any;
};

function Enemy({ stats, attack }: EnemyProps) {
  const { name, suspicion, roundsLeft } = stats;
  return (
    <div className={styles.enemy}>
      <span>Opponent:</span>
      <span>{name}</span>
      <span>Suspicion: {suspicion}</span>
      <span>Rounds left: {roundsLeft}</span>
      <span>Attack: {attack.label}</span>
    </div>
  );
}

export default Enemy;
