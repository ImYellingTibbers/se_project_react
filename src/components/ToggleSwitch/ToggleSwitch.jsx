import { useState } from "react";

import "./ToggleSwitch.css";

const ToggleSwitch = ({ customClassName = "", onColor }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <label className={`switch ${customClassName}`}>
        <input
          className="switch__checkbox"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="switch__circle"></span>
        <span className="switch__text switch__text-left">F</span>
        <span className="switch__text switch__text-right">C</span>
        {/* <div className="switch__label">
          <span className="switch__text switch__text-left">F</span>
          <span className="switch__text switch__text-right">C</span>
          <span className="switch__circle"></span>
        </div> */}
      </label>
    </>
  );
};

export default ToggleSwitch;

// import { useState } from "react";

// import "./ToggleSwitch.css";

// const ToggleSwitch = ({ label, className = "", onColor }) => {
//   const [checked, setChecked] = useState(false);

//   const handleChange = () => {
//     setChecked(!checked);
//   };

//   return (
//     <>
//       <input
//         className={`react-switch-checkbox ${className}`}
//         id={`react-switch-new`}
//         type="checkbox"
//         checked={checked}
//         onChange={handleChange}
//       />
//       <label style={{ background: checked && onColor }} className="react-switch-label" htmlFor={`react-switch-new`}>
//         <span className={`react-switch-button`} />
//       </label>
//       {label}
//       <p>=Is checked? {checked.toString()}</p>
//     </>
//   );
// };

// export default ToggleSwitch;
