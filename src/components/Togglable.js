import React, { useState } from "react";
import PropTypes from "prop-types";

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="m-4 flex justify-center text-center">
      <div
        style={hide}
        className="w-32 border border-transparent rounded font-semibold tracking-wide text-sm px-5 py-2 focus:outline-none focus:shadow-outline bg-gray-500 text-gray-100 hover:bg-gray-600 hover:text-gray-200"
      >
        <button onClick={toggleVisibility}>{props.viewLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button
          className="w-32 border border-transparent rounded font-semibold tracking-wide text-sm px-5 py-2 focus:outline-none focus:shadow-outline bg-gray-500 text-gray-100 hover:bg-gray-600 hover:text-gray-200"
          onClick={toggleVisibility}
        >
          {props.hideLabel}
        </button>
      </div>
    </div>
  );
};

Toggleable.propTypes = {
  viewLabel: PropTypes.string.isRequired,
};

export default Toggleable;
