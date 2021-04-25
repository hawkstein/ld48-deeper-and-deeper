import styles from "./Welcome.module.css";

function Welcome() {
  return (
    <div className={styles.welcome}>
      <p>
        In the UK's <del>grim</del> daft future, after the stupid sounding
        Disunification War, London has been split into east and west, a
        microcosm of the fractured island.
      </p>
      <p>
        The two factions, <span className={styles.reds}>reds</span> and{" "}
        <span className={styles.blues}>blues</span>, fight for power. Agents
        work amongst the surveillance state and double agents like yourself
        tread a thin line between being useful and dead.
      </p>
      <p className={styles.big}>You've had enough, you're bloody sick of it!</p>
      <p>
        The only way to survive is to use your cover identities. You'll make
        your way deep into the spy networks of both and beat the masters at
        their own game.
      </p>
      <p>
        Face up against handlers and agents one link at a time. Then make
        suspicion fall on the bosses for disloyalty. Easy, right?!
      </p>
    </div>
  );
}

export default Welcome;
