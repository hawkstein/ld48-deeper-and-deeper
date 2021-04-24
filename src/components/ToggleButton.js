import React from "react";
import { motion } from "framer-motion";
import "./ToggleButton.css";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

function ToggleButton({ toggled }) {
  const [isToggled, setToggled] = React.useState(toggled);
  const toggleSwitch = () => setToggled(!isToggled);
  return (
    <div
      className="ToggleButton-outer"
      data-isOn={isToggled}
      onClick={toggleSwitch}
    >
      <motion.div className="ToggleButton-handle" layout transition={spring} />
    </div>
  );
}

export default ToggleButton;
