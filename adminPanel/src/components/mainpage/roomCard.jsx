/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddRoom from "../Addrooms";
import SingleRoom from "./singleRoom";
import AdvertModule from "../advertModule";
import SiteCopyDB from "./siteCopyDB";
// RoomCard component
function RoomCard() {
  const [rooms, setRooms] = useState([]);
  const [cooldown, setCooldown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function sendAdvert() {
    setIsModalOpen(true);
  }
  async function updtPrices() {
    if (!cooldown) {
      await axios.get(
        "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/getprices"
      );
      await axios.get(
        "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/getprices/setPrice"
      );
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
    axios
      .get("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/aparts")
      .then((response) => {
        setRooms(response.data.data);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/aparts"
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
    <div className="">
      <div className="flex flex-col md:flex-row">
        <button
          onClick={updtPrices}
          className="bg-green-600 h-12 w-[290px] m-1 px-4 ml-4 text-lg font-bold text-zinc-50 hover:bg-sky-700"
        >
          Оновити ціни
        </button>
        <button
          onClick={sendAdvert}
          className="bg-orange-600 h-12 w-[290px] m-1 px-4 ml-4 text-lg font-bold text-zinc-50 hover:bg-sky-700"
        >
          надіслати рекламку
        </button>
        <SiteCopyDB />
        <div className="flex flex-col p-2 text-white">
        <p className="">Контакти розробника TG @stepbaka.</p>
        <p> +380983405578</p>
        </div>

      </div>

      <AdvertModule
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
