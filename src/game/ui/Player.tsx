import styles from "./Player.module.css";

type PlayerProps = {
  loyalty: number;
  suspicionRed: number;
  suspicionBlue: number;
};

function Player({ loyalty, suspicionRed, suspicionBlue }: PlayerProps) {
  return (
    <div className={styles.player}>
      <span>Loyalty:</span>
      <span>{loyalty}</span>
      <span>Red Suspicion:</span>
      <span>{suspicionRed}</span>
      <span>Blue Suspicion:</span>
      <span>{suspicionBlue}</span>
    </div>
  );
}

export default Player;
