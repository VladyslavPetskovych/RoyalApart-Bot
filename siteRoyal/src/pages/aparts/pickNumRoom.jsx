import React, { useState } from "react";

function PickNumRoom({ setSelectedNumRoom }) {
  const [selectedNumRoom, setSelectedNumRoomLocal] = useState("");

  const handleNumRoomClick = (numRoom) => {
    if (selectedNumRoom === numRoom) {
      setSelectedNumRoom(""); // Unselect the number of rooms
      setSelectedNumRoomLocal(""); // Uncheck the button
    } else {
      setSelectedNumRoom(numRoom);
      setSelectedNumRoomLocal(numRoom);
    }
  };

  return (
    <div className="bg-white h-44 mx-5 my-5 lg:my-0  w-[300px] items-center justify-center text-black  flex flex-col   font-popins text-3xl">
      <button 
        onClick={() => handleNumRoomClick(1)}
        className={`border-2 rounded-full py-2 px-4 my-1 ${selectedNumRoom === 1 ? "bg-blue-500 text-white" : "bg-white"}`}
      >
        Однокімнатні
      </button>
      <button 
        onClick={() => handleNumRoomClick(2)}
        className={`border-2 rounded-full py-2 px-4 my-1 ${selectedNumRoom === 2 ? "bg-blue-500 text-white" : "bg-white"}`}
      >
        Двокімнатні
      </button>
      <button 
        onClick={() => handleNumRoomClick(3)}
        className={`border-2 rounded-full py-2 px-4 my-1 ${selectedNumRoom === 3 ? "bg-blue-500 text-white" : "bg-white"}`}
      >
        Трикімнатні
      </button>
    </div>
  );
}

export default PickNumRoom;
