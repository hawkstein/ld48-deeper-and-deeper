import Button from "../../Button";
import { Card } from "../Deck";

function PushYourLuck({
  cards,
  send,
  matches,
}: {
  cards: Card[];
  send: any;
  matches: (check: any) => boolean;
}) {
  return (
    <div>
      <ul>
        {cards.map((card, index) => (
          <li key={`${card.name}-${index}`}>{card.name}</li>
        ))}
      </ul>
      {matches("encounter.playerDecision.pushYourLuck.choose") && (
        <>
          <Button
            onClick={() => {
              send("NO_MORE");
            }}
          >
            No more
          </Button>
          <Button
            onClick={() => {
              send("UNO_MAS");
            }}
          >
            One more!
          </Button>
        </>
      )}
      {matches("encounter.playerDecision.pushYourLuck.resolve") && (
        <>
          <Button
            onClick={() => {
              send("FINISHED");
            }}
          >
            Finished
          </Button>
        </>
      )}
    </div>
  );
}

export default PushYourLuck;
