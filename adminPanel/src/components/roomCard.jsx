/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddRoom from "./Addrooms";
import edit from "../assets/4226577.png";
import del from "../assets/del.png";

const SingleRoom = ({ room }) => (
  <div
    className="bg-gray-300 h-[700px] m-2 p-1 rounded-lg text-lg  max-w-96 "
    key={room.wubid}
  >
    <div className="w-full flex justify-between  ">
      <button className="">
        <img
          src={del}
          className="object-cover h-10 w-10  rounded-bl-lg"
          alt=""
        />
      </button>
      <button className="">
        <img
          src={edit}
          className="object-cover h-20 w-20 bg-blue-500 rounded-bl-lg"
          alt=""
        />
      </button>
    </div>

    <img
      className="object-cover h-96 w-96"
      src={`http://localhost:3000/imgs/${room.imgurl[0]}`}
      alt=""
    />
    {console.log(room.imgurl[0])}

    <div className="">
      <p className=" font-semibold"> {room.name}</p>
      <p>Ціна: {room.price} грн </p>
      <p>Кількість кімнат: {room.numrooms}</p>
      <p>Поверх: {room.floor}</p>
      <p>Кількість гостей: {room.guests}</p>
      <p>Площа: {room.surface} м2</p>
      <p>Кількість ліжок: {room.beds}</p>
    </div>
  </div>
);

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
      <div className="flex flex-wrap ">
        <button
          onClick={updtPrices}
          className="bg-green-600 h-12 px-4 ml-4 text-lg font-bold text-zinc-50 hover:bg-sky-700"
        >
          Оновити ціни
        </button>
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
