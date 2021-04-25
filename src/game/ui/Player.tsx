import styles from "./Player.module.css";

type PlayerProps = {
  loyalty: number;
  suspicionRed: number;
  suspicionBlue: number;
};

function getLoyalty(loyalty: number): string {
  if (loyalty <= 0.55 && loyalty >= 0.45) {
    return `On the fence`;
  }
  if (loyalty > 0.55 && loyalty <= 0.65) {
    return `Kinda Red`;
  }
  if (loyalty > 0.65 && loyalty <= 0.85) {
    return `Hella Red`;
  }
  if (loyalty > 0.85 && loyalty < 1) {
    return `Red to the core`;
  }
  if (loyalty === 1) {
    return `Red Zealot (Max)`;
  }
  if (loyalty < 0.45 && loyalty >= 0.35) {
    return `Kinda Blue`;
  }
  if (loyalty < 0.35 && loyalty >= 0.15) {
    return `Hella Blue`;
  }
  if (loyalty < 0.15 && loyalty > 0) {
    return `True blue`;
  }
  if (loyalty === 0) {
    return `Blue blood (Max)`;
  }
  return ``;
}

function getLoyaltyClass(loyalty: number) {
  if (loyalty >= 0.55) {
    return styles.red;
  } else if (loyalty <= 0.45) {
    return styles.blue;
  } else {
    return ``;
  }
}

function Player({ loyalty, suspicionRed, suspicionBlue }: PlayerProps) {
  return (
    <div className={styles.player}>
      <span>Loyalty:</span>
      <span className={getLoyaltyClass(loyalty)}>{getLoyalty(loyalty)}</span>
      <span>Red Suspicion:</span>
      <span className={styles.red}>{suspicionRed}%</span>
      <span>Blue Suspicion:</span>
      <span className={styles.blue}>{suspicionBlue}%</span>
    </div>
  );
}

export default Player;
