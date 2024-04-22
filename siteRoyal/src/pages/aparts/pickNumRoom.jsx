import React, { useState } from "react";
import { useTranslation } from "react-i18next";
function PickNumRoom({ selectedNumRooms, setSelectedNumRooms }) {
  const { t } = useTranslation();
  const handleNumRoomClick = (numRoom) => {
    if (selectedNumRooms.includes(numRoom)) {
      setSelectedNumRooms((prevSelectedNumRooms) =>
        prevSelectedNumRooms.filter((room) => room !== numRoom)
      );
    } else {
      setSelectedNumRooms((prevSelectedNumRooms) => [...prevSelectedNumRooms, numRoom]);
    }
  };

  return (
    <div className="  m-1  h-42 w-[160px]   lg:my-0 font-oswald items-center justify-start text-shit2 flex flex-col  text-sm text-[14px] md:text-[16px] lg:mb-10">
      <p className="-ml-16 my-2  text-[17px] md:text-[19px] underline ">{t("rooms")}</p>
      <div className="flex items-start justify-start flex-col">
      <button
        onClick={() => handleNumRoomClick(1)}
        className={`  py-2 px-2 my-1  ${
          selectedNumRooms.includes(1) ? "  text-shit2  shadow-lg rounded-full shadow-orange-500/90" : ""
        }`}
      >
       •  {t("one_room")}
      </button>
      <button
        onClick={() => handleNumRoomClick(2)}
        className={`  py-2 px-2 my-1 ${
          selectedNumRooms.includes(2) ? "  text-shit2  shadow-lg rounded-full shadow-orange-500/90" : ""
        }`}
      >
        • {t("two_rooms")}
      </button>
      <button
        onClick={() => handleNumRoomClick(3)}
        className={` py-2 px-2 my-1 ${
          selectedNumRooms.includes(3) ? " text-shit2  shadow-lg rounded-full shadow-orange-500/90" : ""
        }`}
      >
       • {t("three_rooms")}
      </button>
      </div>
      
    </div>
  );
}

export default PickNumRoom;
