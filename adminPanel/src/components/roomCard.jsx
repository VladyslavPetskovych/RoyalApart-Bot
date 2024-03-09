/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddRoom from "./Addrooms";


const SingleRoom = ({ room }) => (
  <div className="bg-gray-300 h-[450px] m-11 p-1 rounded-lg" key={room.wubid}>
    <img
      className="object-cover h-96 w-96"
      src={`http://localhost:3000/imgs/${room.imgurl[0]}`}
      alt=""
    />

    {console.log(room.imgurl[0])}
    <p className="text-lg font-semibold"> {room.name}</p>
    <p>Ціна: {room.price} грн </p>
  </div>
);

// RoomCard component
function RoomCard() {
  const [rooms, setRooms] = useState([]);

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
    <div className="p-4">
      <div className="flex flex-wrap ">
        <AddRoom />
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => <SingleRoom key={room.wubid} room={room} />)
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
