// App.js

import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios
      .post("http://localhost:3001/api/register", { username, password })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:3001/api/login", { username, password })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>React MERN Login</h2>
      <div>
        <label>Username: </label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default App;
