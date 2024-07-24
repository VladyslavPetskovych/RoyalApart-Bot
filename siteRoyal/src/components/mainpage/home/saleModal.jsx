import React, { useEffect, useState } from "react";
import axios from "axios";
import SaleList from "./saleList";

function SaleModal({ toggleModal }) {
  const [sales, setSales] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.classList.add("overflow-hidden");
    return () => {
      // Re-enable scrolling when modal is closed
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/sales/all"
        );
        setSales(salesResponse.data);

        const roomsResponse = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/aparts"
        );
        setRooms(roomsResponse.data.data);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white text-black rounded-lg p-5 w-[85%] h-[70%] lg:w-1/2 lg:h-1/2 overflow-auto flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white mt-16 text-black font-roboto text-lg rounded-lg p-5 w-[85%] md:w-[75%] h-[78%] lg:w-2/3 lg:h-[84%] overflow-auto">
        <button
          onClick={toggleModal}
          className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Х
        </button>
        <div className="mt-10">
          <SaleList sales={sales} rooms={rooms} />
        </div>
      </div>
    </div>
  );
}

export default SaleModal;
