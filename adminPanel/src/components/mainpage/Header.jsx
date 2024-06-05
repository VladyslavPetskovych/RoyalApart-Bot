import React, { useState } from "react";
import axios from "axios";

function Header({ onLoginSuccess, isLoggedIn }) {

  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/auth/login",
        credentials
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); 
        onLoginSuccess(); 
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-black ">
      <div className="flex justify-between items-center p-3">
        <form onSubmit={handleSubmit} className="flex items-center flex-col md:flex-row">
          <input
            type="text"
            name="login"
            placeholder="Login"
            value={credentials.login}
            onChange={handleChange}
            className=" h-10 px-2 mr-2 text-lg font-bold  outline-none my-1"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className=" h-10 px-2 mr-2 text-lg font-bold  outline-none my-1"
          />
          <button
            type="submit"
            className=" h-10 px-4 text-lg font-bold text-zinc-50 bg-red-600 hover:bg-sky-700"
          >
            Login
          </button>
        </form>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </nav>
  );
}

export default Header;
