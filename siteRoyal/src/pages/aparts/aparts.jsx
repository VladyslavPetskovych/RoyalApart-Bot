import React, { useState } from "react";
import RoomCard from "./roomCard";
import PickCategory from "./pickCategory";
import PickNumRoom from "./pickNumRoom";
function aparts() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedNumRoom, setSelectedNumRoom] = useState("");
  return (
    <div className="h-full text-black bg-black flex flex-col">
      <div className="bg-slate-800 h-24"></div>
      <div className="mt-[20px] ">
        <div className="flex flex-col lg:flex-row p-2">
          <div className="flex flex-col md:flex-row lg:flex-col font-oswald font-bold ">
            <PickNumRoom setSelectedNumRoom={setSelectedNumRoom} />
            <PickCategory setSelectedCategory={setSelectedCategory} />
          </div>
          <RoomCard
            selectedCategory={selectedCategory}
            selectedNumRoom={selectedNumRoom}
          />
        </div>
      </div>
    </div>
  );
}

export default aparts;
