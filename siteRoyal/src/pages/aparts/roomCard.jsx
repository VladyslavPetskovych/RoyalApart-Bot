import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleRoom from "./singleRoom";
import SearchBar from "./searchBar";
import { useTranslation } from "react-i18next";
import bathData from "/bath.json";

function RoomCard({ selectedNumRoom, selectedCategory }) {
  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const bathWubids = new Set(bathData.bath);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://royalapart.online/siteRoyal/get-all-wodoo"
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

      const hasBath = bathWubids.has(room.wubid);

      const categoryFilterActive =
        selectedCategory && selectedCategory.length > 0;
      const numRoomFilterActive = selectedNumRoom && selectedNumRoom.length > 0;

      let matchesCategories = true;
      if (categoryFilterActive) {
        if (selectedCategory.includes("bath")) {
          const otherCategories = selectedCategory.filter(
            (cat) => cat !== "bath"
          );
          matchesCategories =
            hasBath &&
            (otherCategories.length === 0 ||
              otherCategories.includes(room.category));
        } else {
          matchesCategories = selectedCategory.includes(room.category);
        }
      }

      let matchesNumRoom = true;
      if (numRoomFilterActive) {
        matchesNumRoom = selectedNumRoom.includes(room.numrooms);
      }

      return matchesSearchQuery && matchesCategories && matchesNumRoom;
    });

    setFilteredRooms(filtered);
    setCurrentPage(1);
  }, [allRooms, searchQuery, selectedCategory, selectedNumRoom]);

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const indexOfLastRoom = currentPage * itemsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
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
          <p>{t("No rooms found.")}</p>
        )}
      </div>
      {filteredRooms.length > 0 && (
        <div className="flex justify-center mt-12 my-2 text-xs md:text-base font-popins ">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="px-0 md:px-3 py-2 bg-shit2 bg-opacity-20 hover:bg-opacity-30 rounded-md mr-2 hover:underline hover:transition-all"
          >
            {t("First")}
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-0 md:px-3 py-2 bg-shit2 bg-opacity-20 hover:bg-opacity-30 rounded-md mr-2 hover:underline hover:transition-all"
          >
            {t("Previous")}
          </button>
          <span className="px-0 md:px-4 py-2">
            {t("Page")} {currentPage} {t("of")} {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-0 md:px-3 py-2 bg-shit2 bg-opacity-20 hover:bg-opacity-30 rounded-md ml-2 mr-2 hover:underline hover:transition-all"
          >
            {t("Next")}
          </button>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className="px-0 md:px-3 py-2 bg-shit2 bg-opacity-20 hover:bg-opacity-30 rounded-md ml-2 hover:underline hover:transition-all"
          >
            {t("Last")}
          </button>
        </div>
      )}
    </div>
  );
}

export default RoomCard;
