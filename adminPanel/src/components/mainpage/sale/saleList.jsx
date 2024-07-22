import React, { useState, useEffect } from "react";
import sale from "../../../assets/sale/sales.png";
import axios from "axios";
import SingleSale from "./singleSale";

function AddSale() {
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [sales, setSales] = useState([]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const fetchRoomsAndSales = async () => {
    try {
      const [roomsResponse, salesResponse] = await Promise.all([
        axios.get("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/aparts"),
        axios.get("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/sales/all"),
      ]);

      setRooms(roomsResponse.data.data);
      setSales(salesResponse.data);
    } catch (error) {
      console.error("Error fetching rooms and sales:", error);
    }
  };

  useEffect(() => {
    fetchRoomsAndSales();
  }, []);

  return (
    <div>
      <div className="bg-yellow-400 mx-5 w-16 h-16">
        <button onClick={toggleModal}>
          <img src={sale} alt="Sale" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[80%] h-[78%] overflow-auto">
            <div className="sticky top-0 bg-white flex flex-row items-center justify-between p-4">
              <h2 className="text-xl flex-1 font-bold">
                Додайте знижку на квартиру
              </h2>
              <button
                onClick={toggleModal}
                className="bg-red-500 m-2 text-white ml-4 p-2 rounded"
              >
                Х
              </button>
            </div>
            <div>
              <ul className="mt-6 p-4">
                {rooms.map((room) => {
                  const sale = sales.find((sale) => sale.roomId === room.wubid);
                  return (
                    <SingleSale key={room.wubid} room={room} sale={sale} fetchRoomsAndSales={fetchRoomsAndSales} />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddSale;
