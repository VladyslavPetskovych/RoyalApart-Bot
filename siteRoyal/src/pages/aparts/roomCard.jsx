/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleRoom from "./singleRoom";
import SearchBar from "./searchBar";

// RoomCard component
function RoomCard() {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[100%] md:w-[75%]">
      <div className="flex flex-col md:flex-row font-oswald items-center my-10">
        <p className="text-white text-2xl mx-5">Обери апартаменти для себе.</p>
        <SearchBar setSearchQuery={setSearchQuery} />
      </div>
      <div className="flex flex-wrap ">
        {Array.isArray(filteredRooms) && filteredRooms.length > 0 ? (
          filteredRooms.map(room => <SingleRoom key={room.wubid} room={room} />)
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
