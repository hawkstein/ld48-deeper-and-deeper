import styles from "./HowToPlay.module.css";

function HowToPlay() {
  return (
    <div className={styles.welcome}>
      <p>
        The aim of the game is keep your cover intact and raise suspicions about
        your opponent.{" "}
        <span className={styles.highlight}>
          If you or they hit 100% suspicion then that person loses. You, as a
          double agent, have a suspicion percentage for each faction, red and
          blue.
        </span>
      </p>
      <p>
        Each turn, play cards from your hand in front of you by clicking them.
      </p>
      <p>
        <span className={styles.highlight}>Counter Accusation!:</span> Increases
        the suspicion of your opponent. The more loyal you are to a faction, the
        more damage your word does.
      </p>
      <p>
        <span className={styles.highlight}>Sow Dissent!:</span> Increases your
        perceived loyalty to the faction of the opponent you are facing (and
        decreases to the opposite faction).
      </p>
      <p>
        <span className={styles.highlight}>Loyal Friend:</span> Removes an Under
        Suspicion from your hand(&amp; deck). Click the card first, and then an
        Under Suspicion to remove.
      </p>
      <p>
        <span className={styles.highlight}>Under Suspicion:</span> This card
        cannot be played &amp; will add 2 to your suspicion at turn end.
      </p>
      <p>
        <span className={styles.highlight}>Tell A Tale:</span> Push your luck by
        drawing cards one at a time. Each card drawn adds to the cards defence
        value. However, increasing the cards defense will add a Under Suspicion
        to your deck. If you draw two of the same card or only one, then the
        defense is decreased by one. If reduced to zero, an Under Suspicion is
        added. You must play the card to activate the defense.
      </p>
      <p>
        It is possible with strong enough defenses to reduce your suspicion each
        turn.
      </p>
    </div>
  );
}

export default HowToPlay;
