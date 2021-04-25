import Button from "../Button";
import { motion } from "framer-motion";

const variants = {
  setup: { x: 300, opacity: 0 },
  entrance: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
  exit: {
    x: -300,
    opacity: 0,
  },
};

type DialogueProps = {
  children: React.ReactNode;
  okHandler: () => void;
  okLabel: string;
};

function Dialogue({ children, okHandler, okLabel = "OK" }: DialogueProps) {
  return (
    <motion.section
      key="dialogue"
      variants={variants}
      initial="setup"
      animate="entrance"
      exit="exit"
      style={{
        position: "absolute",
      }}
    >
      {children}
      <div>
        <Button onClick={okHandler}>{okLabel}</Button>
      </div>
    </motion.section>
  );
}

export default Dialogue;
