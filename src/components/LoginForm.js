import React, { useState } from "react";
import Notification from "./Notification";
import PropTypes from "prop-types";

const LoginForm = ({ handleLoginForm, errorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-3xl font-bold">Micro Stories</h1>
      <img src="./images/logo.png" className="mt-4 w-32 h-32" />
      <h2 className="mt-4 text-2xl font-bold text-gray-700 leading-tight">
        Login
      </h2>
      {errorMessage && <Notification message={errorMessage} />}
      <form
        className="text-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginForm(username, password);
        }}
      >
        <div className="mt-4 flex flex-col w-full">
          <div className="mt-4 flex flex-col">
            <h2>Username</h2>
            <input
              className="component border bg-gray-100 px-4 py-2 text-sm tracking-wide focus:outline-none focus:shadow-outline rounded"
              type="text"
              value={username}
              name="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <h2>Password</h2>
            <input
              className="component border bg-gray-100 px-4 py-2 text-sm tracking-wide focus:outline-none focus:shadow-outline rounded"
              type="password"
              value={password}
              name="Username"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 align-end">
            <button
              className="component border border-transparent rounded font-semibold tracking-wide text-sm px-5 py-2 focus:outline-none focus:shadow-outline bg-blue-500 text-gray-100 hover:bg-blue-600 hover:text-gray-200"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLoginForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default LoginForm;
