import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Slider from "../aparts/sliderRoom";
import plan from "../../assets/roomPage/house-plan.png";
import beds from "../../assets/roomPage/double-bed.png";
import rooms from "../../assets/roomPage/room.png";
import user from "../../assets/roomPage/user.png";
import floor from "../../assets/roomPage/stairs.png";
import SliderCategories from "../../components/mainpage/home/sliderCategories";
import Googlemap from "./googlemap";

function RoomPage() {
  const location = useLocation();
  const [wubidL, setWubidL] = useState(
    parseInt(location.pathname.split("/room/")[1])
  );
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/siteRoyal/copied-rooms"
        );
        const allRooms = response.data.data;

        const foundRoom = allRooms.find((room) => {
          return room.wubid === wubidL;
        });

        setCurrentRoom(foundRoom);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-shit2 ">
      <div className="h-24 "></div>
      <div>
        <div className="bg-back text-black">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div className="font-roboto">
                <p className="text-2xl font-bold font-oswald p-6">
                  Royal Apart {currentRoom.name}
                </p>
                <div className="w-screen px-3">
                  <Slider room={currentRoom} isMaximize={true} />
                </div>
                <div className="bg-white text-sm md:text-base flex flex-row p-5 justify-around mt-5">
                  <div className="flex flex-col m-1">
                    <img
                      className="w-5 h-5 md:w-7 md:h-7 flex justify-center items-center mx-auto"
                      src={plan}
                    />
                    <p>
                      {" "}
                      {currentRoom.surface} m<sup>2</sup>
                    </p>
                  </div>
                  <div className="flex flex-col m-1">
                    <img
                      className="w-5 h-5 md:w-7 md:h-7 flex justify-center items-center mx-auto"
                      src={rooms}
                    />
                    <p> {currentRoom.numrooms} кімнат</p>
                  </div>
                  <div className="flex flex-col m-1">
                    <img
                      className="w-5 h-5 md:w-7 md:h-7 flex justify-center items-center mx-auto"
                      src={user}
                    />
                    <p> {currentRoom.guests} гостей</p>
                  </div>
                  <div className="flex flex-col m-1">
                    <img
                      className="w-5 h-5 md:w-7 md:h-7 flex justify-center items-center mx-auto"
                      src={floor}
                    />
                    <p> {currentRoom.floor} поверх</p>
                  </div>
                  <div className="flex flex-col m-1">
                    <img
                      className="w-5 h-5 md:w-7 md:h-7 flex justify-center items-center mx-auto"
                      src={beds}
                    />
                    <p> {currentRoom.beds} ліжок</p>
                  </div>
                </div>
                <div className="p-5 text-left">
                  <p className="text-2xl  font-bold font-oswald">
                    {currentRoom.name}
                  </p>
                  <p className="">Опис:</p>
                  <p>{currentRoom.description}</p>
                </div>
              </div>
              <div className="mx-auto">
                <Googlemap currentRoom={currentRoom} />
              </div>
            </div>
          )}

          <div>
            <div className="text-white h-[330px] px-8  lg:h-[500px] mx-auto  bg-shit2">
              <SliderCategories />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
