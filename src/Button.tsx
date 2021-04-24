import "./Button.css";
//import useSound from "use-sound";
//import blip from "./sounds/blip.mp3";
import * as React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: React.SyntheticEvent) => void;
};

function Button({ children, onClick }: ButtonProps) {
  //const [playClick] = useSound(blip);
  return (
    <button
      className="Button-base"
      onClick={(e) => {
        //playClick();
        onClick(e);
      }}
    >
      <span className="Button-shadow"></span>
      <span className="Button-edge"></span>
      <span className="Button-front">{children}</span>
    </button>
  );
}

export default Button;
