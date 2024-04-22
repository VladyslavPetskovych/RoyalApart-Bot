import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleRoom from "./singleRoom";
import SearchBar from "./searchBar";

function RoomCard({ selectedNumRoom, selectedCategory }) {
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

  const filteredRooms = rooms.filter((room) => {
    const matchesSearchQuery = room.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategories =
      !selectedCategory || selectedCategory.length === 0 || selectedCategory.includes(room.category);
    const matchesNumRoom = selectedNumRoom.length === 0 || selectedNumRoom.includes(room.numrooms);

    return matchesSearchQuery && matchesCategories && matchesNumRoom;
  });

  return (
    <div className="w-[100%] ">
      <div className="flex flex-col md:flex-row font-oswald items-center mb-4">
        
        <SearchBar setSearchQuery={setSearchQuery} />
      </div>
      <div className="flex flex-wrap  items-center justify-center">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => <SingleRoom key={room.wubid} room={room} />)
        ) : (
          rooms.map((room) => <SingleRoom key={room.wubid} room={room} />)
        )}
      </div>
    </div>
  );
}

export default RoomCard;
