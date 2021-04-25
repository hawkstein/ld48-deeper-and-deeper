import Button from "../Button";

type DialogueProps = {
  children: React.ReactNode;
  okHandler: () => void;
  okLabel: string;
};

function Dialogue({ children, okHandler, okLabel = "OK" }: DialogueProps) {
  return (
    <>
      {children}
      <div>
        <Button onClick={okHandler}>{okLabel}</Button>
      </div>
    </>
  );
}

export default Dialogue;
