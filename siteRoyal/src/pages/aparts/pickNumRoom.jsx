import React, { useState } from "react";

function PickNumRoom({ selectedNumRooms, setSelectedNumRooms }) {
  const handleNumRoomClick = (numRoom) => {
    if (selectedNumRooms.includes(numRoom)) {
      setSelectedNumRooms((prevSelectedNumRooms) =>
        prevSelectedNumRooms.filter((room) => room !== numRoom)
      );
    } else {
      setSelectedNumRooms((prevSelectedNumRooms) => [...prevSelectedNumRooms, numRoom]);
    }
  };

  return (
    <div className=" bg-shit2 m-1  h-48 w-[160px]   lg:my-0  items-center justify-center text-white flex flex-col font-popins text-sm  md:text-[16px] lg:mb-10">
      <p className="-ml-16 my-5">Кімнати:</p>
      <button
        onClick={() => handleNumRoomClick(1)}
        className={`  py-2 px-2 my-1 m-1 ${
          selectedNumRooms.includes(1) ? "border-2 rounded-full text-white" : "bg-shit2"
        }`}
      >
        1 кімнатні
      </button>
      <button
        onClick={() => handleNumRoomClick(2)}
        className={`  py-2 px-2 my-1 ${
          selectedNumRooms.includes(2) ? "border-2 rounded-full text-white" : "bg-shit2"
        }`}
      >
         2 кімнатні
      </button>
      <button
        onClick={() => handleNumRoomClick(3)}
        className={` py-2 px-2 my-1 ${
          selectedNumRooms.includes(3) ? "border-2 rounded-full text-white" : "bg-shit2"
        }`}
      >
        3 кімнатні
      </button>
    </div>
  );
}

export default PickNumRoom;
