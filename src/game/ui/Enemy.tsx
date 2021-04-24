type EnemyProps = {
  stats: any;
  attack: any;
};

function Enemy({ stats, attack }: EnemyProps) {
  const { name, suspicion, roundsLeft } = stats;
  return (
    <div>
      <span>You are facing: {name}</span>
      <span>Suspicion: {suspicion}</span>
      <span>Rounds left: {roundsLeft}</span>
      <span>They {attack.label}</span>
    </div>
  );
}

export default Enemy;
