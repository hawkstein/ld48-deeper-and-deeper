import styles from "./Welcome.module.css";

function BeatTheGame() {
  return (
    <div className={styles.welcome}>
      <h1>You Beat The Game!</h1>
      <p>
        Having made you way deep into the heart of both intelligence networks,
        it's only you who have made it out and the leaders end up on the nasty
        end of this spy business. Don't imagine you'll be seeing them again.
      </p>
      <p>
        Your double agent escapes their life in the Neo-East/West London of the
        future and lives out their days on a farm. It's an idyllic life and they
        deserve it.
      </p>
    </div>
  );
}

export default BeatTheGame;
