import React, { useState } from "react";
import Header from "./components/mainpage/Header";
import RoomCard from "./components/mainpage/roomCard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };


  return (
    <div className="bg-black h-full">
      <Header onLoginSuccess={handleLoginSuccess} isLoggedIn={isLoggedIn} />
      
      {isLoggedIn && <RoomCard />}
    </div>
  );
}

export default App;
