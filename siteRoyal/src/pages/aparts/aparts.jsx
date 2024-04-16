import React, { useState } from "react";
import RoomCard from "./roomCard";
import PickCategory from "./pickCategory";
import PickNumRoom from "./pickNumRoom";
function aparts() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNumRooms, setSelectedNumRooms] = useState([]); // Initialize as an empty array
  return (
    <div className="h-full text-black bg-black flex flex-col ">
      <div className="bg-slate-800 h-24 "></div>
      <div className="mt-[20px] flex items-center justify-center">
        <div className="flex flex-col lg:flex-row p-2">
          <div className="flex flex-col md:flex-row lg:flex-col font-oswald font-bold ">
            <PickNumRoom
              selectedNumRooms={selectedNumRooms}
              setSelectedNumRooms={setSelectedNumRooms}
            />
            <PickCategory setSelectedCategory={setSelectedCategory} />
          </div>
          <RoomCard
            selectedCategory={selectedCategory}
            selectedNumRoom={selectedNumRooms}
          />
        </div>
      </div>
    </div>
  );
}

export default aparts;
