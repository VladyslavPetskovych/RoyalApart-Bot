import React, { useState } from "react";
import { useEffect } from "react";

function OneSale({ sale, room }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(sale.tillDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(sale.tillDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [sale.tillDate]);

  const discountedPrice = (
    room.price -
    room.price * (sale.discount / 100)
  ).toFixed();

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl m-3">{room.name}</p>
      {room.imgurl && room.imgurl[0] && (
        <img
          src={`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/imgsRoyal/${room.wubid}/${room.imgurl[0]}`}
          alt={room.name}
          className="md:w-[60%]"
        />
      )}
      <div className="flex flex-row m-0.5">
        <p className="mx-2 animate-pulse bg-amber-500 px-2">Знижка {sale.discount}%  </p>
        <p> {room.price > 10000 ? "договірна" : `від ${room.price} грн`}</p>
      </div>
      <p className="font-semibold">
       
        Бронюй за {room.price > 10000 ? "договірна" : `${discountedPrice} грн`}
      </p>
      <p>Залишилось часу: {formatTimeLeft(timeLeft)}</p>
    </div>
  );
}

function calculateTimeLeft(tillDate) {
  const difference = new Date(tillDate) - new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return timeLeft;
}

function formatTimeLeft(timeLeft) {
  const { days, hours, minutes, seconds } = timeLeft;
  return `${days} днів ${hours} годин ${minutes} хвилин ${seconds} секунд`;
}

function SaleList({ sales, rooms }) {
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    const filterRooms = () => {
      const filtered = rooms
        .filter((room) => sales.some((sale) => room.wubid === sale.roomId))
        .map((room) => ({
          ...room,
          sale: sales.find((sale) => sale.roomId === room.wubid),
        }));
      setFilteredRooms(filtered);
    };

    filterRooms();
  }, [sales, rooms]);

  return (
    <div>
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => (
          <div key={room.wubid} className="border p-2 mb-2">
            <OneSale sale={room.sale} room={room} />
          </div>
        ))
      ) : (
        <p>No sales available</p>
      )}
    </div>
  );
}

export default SaleList;
