import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleRoom from "./singleRoom";
import SearchBar from "./searchBar";
import { useTranslation } from "react-i18next";

function RoomCard({ selectedNumRoom, selectedCategory }) {
  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust this value as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/siteRoyal/copied-rooms"
        );
        setAllRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = allRooms.filter((room) => {
      const matchesSearchQuery = room.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategories =
        !selectedCategory ||
        selectedCategory.length === 0 ||
        selectedCategory.includes(room.category);
      const matchesNumRoom =
        selectedNumRoom.length === 0 || selectedNumRoom.includes(room.numrooms);

      return matchesSearchQuery && matchesCategories && matchesNumRoom;
    });

    setFilteredRooms(filtered);
    setCurrentPage(1); // Reset current page when filters change
  }, [allRooms, searchQuery, selectedCategory, selectedNumRoom]);

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const indexOfLastRoom = currentPage * itemsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const { t } = useTranslation();
  return (
    <div className="w-screen md:w-[100%]">
      <div className="flex flex-col md:flex-row font-oswald items-center mb-4">
        <SearchBar setSearchQuery={setSearchQuery} />
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {currentRooms.length > 0 ? (
          currentRooms.map((room) => (
            <SingleRoom key={room.wubid} room={room} />
          ))
        ) : (
          <p> {t("No rooms found.")}</p>
        )}
      </div>
      {filteredRooms.length > 0 && (
        <div className="flex justify-center mt-12 my-2 text-xs md:text-base font-popins ">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="px-0 md:px-3  py-2 bg-shit2 bg-opacity-20 hover:bg-opacity-30 rounded-md mr-2 hover:underline hover:transition-all"
          >
            {t("First")}
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-0 md:px-3  py-2 bg-shit2 bg-opacity-20 hover:bg-opacity-30 rounded-md mr-2 hover:underline hover:transition-all"
          >
            {t("Previous")}
          </button>
          <span className="px-0 md:px-4 py-2">
            {t("Page")} {currentPage} {t("of")} {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-0 md:px-3  py-2 bg-shit2 bg-opacity-20 hover:bg-opacity-30  rounded-md ml-2 mr-2 hover:underline hover:transition-all"
          >
            {t("Next")}
          </button>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className="px-0 md:px-3 py-2 bg-shit2 bg-opacity-20 hover:bg-opacity-30  rounded-md ml-2 hover:underline hover:transition-all"
          >
            {t("Last")}
          </button>
        </div>
      )}
    </div>
  );
}

export default RoomCard;
