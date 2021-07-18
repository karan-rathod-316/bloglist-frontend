import React, { useState } from "react";
import Notification from "./Notification";
// setUsername("");
// setPassword("");

const LoginForm = ({ handleLoginForm, errorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2>login</h2>
      {errorMessage && <Notification message={errorMessage} />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginForm(username, password);
        }}
      >
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Username"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
