import React, { useState } from "react";

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisibility}>{props.viewLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggleVisibility}>{props.hideLabel}</button>
      </div>
    </div>
  );
};

export default Toggleable;
