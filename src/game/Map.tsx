import Button from "../Button";

type MapProps = {
  map: {
    label: string;
    faction: string;
  }[];
  okHandler: () => void;
};

function Map({ map, okHandler }: MapProps) {
  return (
    <>
      <ul>
        {map.map(({ label }) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <div>
        <Button onClick={okHandler}>OK</Button>
      </div>
    </>
  );
}

export default Map;
