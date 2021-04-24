import Button from "../Button";

type DialogueProps = {
  children: React.ReactNode;
  okHandler: () => void;
};

function Dialogue({ children, okHandler }: DialogueProps) {
  return (
    <>
      {children}
      <div>
        <Button onClick={okHandler}>OK</Button>
      </div>
    </>
  );
}

export default Dialogue;
