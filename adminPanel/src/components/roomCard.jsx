/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddRoom from "./Addrooms";
import SingleRoom from "./singleRoom";

// RoomCard component
function RoomCard() {
  const [rooms, setRooms] = useState([]);
  const [cooldown, setCooldown] = useState(false);

  function updtPrices() {
    if (!cooldown) {
      axios.get("http://localhost:3000/getprices/setPrice");
      // Show an alert
      alert("Ціни Оновлені!");

      // Set cooldown to true
      setCooldown(true);

      // Reset cooldown after 1 minute (60 seconds)
      setTimeout(() => {
        setCooldown(false);
      }, 60000);
    } else {
      alert("Зачекайте хвилину, щоб оновити ціни ще раз!");
    }
  }
  const updateRooms = () => {
    axios.get("http://localhost:3000/aparts").then((response) => {
      setRooms(response.data.data);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/aparts");
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchData();
  }, []);

  console.log(rooms);

  return (
    <div className="">
      <button
        onClick={updtPrices}
        className="bg-green-600 h-12 px-4 ml-4 text-lg font-bold text-zinc-50 hover:bg-sky-700"
      >
        Оновити ціни
      </button>
      <div className="flex flex-wrap ">
        <AddRoom />
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => (
            <SingleRoom key={room.wubid} room={room} onDelete={updateRooms} />
          ))
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
