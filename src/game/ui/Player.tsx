import styles from "./Player.module.css";

type PlayerProps = {
  loyalty: number;
  suspicion: number;
};

function Player({ loyalty, suspicion }: PlayerProps) {
  return (
    <div className={styles.player}>
      <span>Loyalty: {loyalty}</span>
      <span>Suspicion: {suspicion}</span>
    </div>
  );
}

export default Player;
