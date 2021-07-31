import React from "react";

function Header({ name, handleLogout }) {
  return (
    <div className="flex justify-around items-center border-b-4 p-4 border-gray-600">
      <img src="./images/logo.png" className="w-24 h-24" />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Micro Stories</h1>
      </div>
      <div>
        <p className="mt-4 text-center text-gray-600 font-bold hover:text-black">
          Welcome {name}!
        </p>
        <button
          className="mt-4 text-center text-blue-500 border-indigo-200 hover:border-blue-500 hover:text-blue-600 justify-self-end"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
