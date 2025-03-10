import { useContext } from "react";

import "./ToggleSwitch.css";
import CurrentTemperatureContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureContext
  );

  return (
    <>
      <label className={`switch`}>
        <input
          className="switch__checkbox"
          type="checkbox"
          onChange={handleToggleSwitchChange}
        />
        <span className="switch__circle"></span>
        <span
          className={`switch__text switch__text-F ${
            currentTemperatureUnit === "F" ? "switch__text_color_white" : ""
          }`}
        >
          F
        </span>
        <span
          className={`switch__text switch__text-C ${
            currentTemperatureUnit === "C" ? "switch__text_color_white" : ""
          }`}
        >
          C
        </span>
      </label>
    </>
  );
};

export default ToggleSwitch;
