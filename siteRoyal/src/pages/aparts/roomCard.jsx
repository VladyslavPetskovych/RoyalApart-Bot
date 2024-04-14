/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleRoom from "./singleRoom";

// RoomCard component
function RoomCard() {
  const [rooms, setRooms] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/siteRoyal/copied-rooms"
        );
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchData();
  }, []);

  console.log(rooms);

  return (
    <div className="w-[100%] md:w-[75%]">
      <div className="flex flex-wrap ">
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => (
            <SingleRoom key={room.wubid} room={room}  />
          ))
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
