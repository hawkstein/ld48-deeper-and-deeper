type EncounterProps = {
  enemy: any;
};

function Encounter({ enemy }: EncounterProps) {
  return (
    <div>
      <h1>Encounter!</h1>
      <p>Deck</p>
      <p>Hand</p>
      <p>Encounter UI</p>
    </div>
  );
}

export default Encounter;
