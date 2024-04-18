import React, { useState } from "react";
import RoomCard from "./roomCard";
import PickCategory from "./pickCategory";
import PickNumRoom from "./pickNumRoom";
function aparts() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNumRooms, setSelectedNumRooms] = useState([]); // Initialize as an empty array
  return (
    <div className="h-full w-screen text-black bg-back flex flex-col ">
      <div className="bg-shit2 h-24 "></div>
      <div className=" flex items-center justify-center">
        <div className="flex flex-col-reverse  lg:flex-row p-2">
          <RoomCard
            selectedCategory={selectedCategory}
            selectedNumRoom={selectedNumRooms}
          />
          <div className="flex flex-row  m-1  md:flex-row lg:flex-col font-oswald font-bold items-center justify-center lg:justify-start">
            <PickNumRoom
              selectedNumRooms={selectedNumRooms}
              setSelectedNumRooms={setSelectedNumRooms}
            />
            <PickCategory setSelectedCategory={setSelectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default aparts;
