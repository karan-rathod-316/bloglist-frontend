import React from "react";

function Notification({ message }) {
  return (
    <div className="text-center mt-4">
      <p>{message}</p>
    </div>
  );
}

export default Notification;
