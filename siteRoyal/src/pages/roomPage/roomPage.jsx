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
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {slugify} from "transliteration";

function RoomPage() {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const [wubidL, setWubidL] = useState(
    parseInt(location.pathname.split("/room/")[1])
  );
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [translatedDescription, setTranslatedDescription] = useState("");

  const amenities = [
    "wifi",
    "kettle",
    "microwave",
    "tv",
    "dishes",
    "shower",
    "heating",
    "iron",
    "hair_dryer",
    "water",
    "dining_table",
    "bed_linen",
    "towels",
    "fridge",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
            // `http://localhost:3000/siteRoyal/copied-rooms/${wubidL}`
            `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/siteRoyal/copied-rooms/${wubidL}`
        );
        const foundRoom = response.data;

        setCurrentRoom(foundRoom);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchData();
  }, [i18n.language]);

  useEffect(() => {
    const translateDescription = async () => {
      if (i18n.language !== "uk" && currentRoom && currentRoom.description) {
        try {
          const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=uk&tl=${
              i18n.language
            }&dt=t&q=${encodeURIComponent(currentRoom.description)}`
          );
          const data = await response.json();
          const translatedText = data[0].map((segment) => segment[0]).join(" "); // Join all segments together
          setTranslatedDescription(translatedText);
        } catch (error) {
          console.error("Error translating description:", error);
          setTranslatedDescription(currentRoom.description);
        }
      } else {
        setTranslatedDescription(currentRoom ? currentRoom.description : "");
      }
    };

    translateDescription();
  }, [i18n.language, currentRoom]);

  const getRoomName = (name) => {
    const capitalizeFirstLetter = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    if (i18n.language === "en") {
      return capitalizeFirstLetter(slugify(name));
    } else {
      return capitalizeFirstLetter(name);
    }
  };
  return (
    <div className="bg-shit2 relative">
      <div className="h-24 "></div>
      <div>
        <div className="bg-back text-black">
          {loading ? (
            <p>{t("loading")}</p>
          ) : (
            <div>
              <div className="font-roboto">
                <p className="text-2xl font-bold font-oswald p-6">
                  Royal Apart {getRoomName(currentRoom.name)}
                </p>
                <div className="w-screen px-3">
                  <Slider room={currentRoom} isMaximize={true} />
                </div>
                <div className="text-left">
                  <p className=" p-5 text-3xl  font-bold font-oswald">
                    {getRoomName(currentRoom.name)}
                  </p>
                  <p className="px-5">{t("description2")}</p>
                  <p className="p-2">{translatedDescription}</p>
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
                    <p>
                      {" "}
                      {currentRoom.numrooms} {t("roomss")}
                    </p>
                  </div>
                  <div className="flex flex-col m-1">
                    <img
                      className="w-5 h-5 md:w-7 md:h-7 flex justify-center items-center mx-auto"
                      src={user}
                    />
                    <p>
                      {" "}
                      {currentRoom.guests} {t("guestss")}
                    </p>
                  </div>
                  <div className="flex flex-col m-1">
                    <img
                      className="w-5 h-5 md:w-7 md:h-7 flex justify-center items-center mx-auto"
                      src={floor}
                    />
                    <p>
                      {" "}
                      {currentRoom.floor} {t("floor")}
                    </p>
                  </div>
                  <div className="flex flex-col m-1">
                    <img
                      className="w-5 h-5 md:w-7 md:h-7 flex justify-center items-center mx-auto"
                      src={beds}
                    />
                    <p>
                      {" "}
                      {currentRoom.beds} {t("bedss")}
                    </p>
                  </div>
                </div>
                <div className=" text-left">
                  <div className="bg-white p-2 mt-10">
                    <p className="p-8 text-2xl font-bold ">{t("in room")}</p>
                    <p className=" px-8 pt-4 text-xl font-bold ">
                      {t("additional")}
                    </p>
                    <div className="flex flex-wrap justify-center  p-2 md:p-5  border m-1 md:m-4 text-left bg-white">
                      {amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="w-1/2 md:w-1/3 xl:w-1/4 p-2 flex flex-row"
                        >
                          <p className="text-xl text-amber-400 font-bold px-1">
                            {" ✓ "}
                          </p>
                          <p className="text-base">
                            {t(`amenities.${amenity}`)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto py-5">
                <p className=" pb-5  text-xl font-bold ">{t("address")}</p>
                <Googlemap currentRoom={currentRoom} />
              </div>
            </div>
          )}
          <div className="text-left text-lg font-roboto p-5">
            <p>{t("royal_care")}</p>
            <p>{t("see_you")}</p>
            <p>+38 (067)677-73-30</p>
          </div>
          <div>
            <div className="text-white h-[330px] px-8  lg:h-[500px] mx-auto  bg-shit2">
              <SliderCategories />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-5 right-0 opacity-70 hover:opacity-100 md:right-5   w-48 ">
        <button className=" h-10 bg-gradient-to-br from-amber-600 to-amber-400 rounded-md w-[70%] hover:shadow-lg shadow-md shadow-orange-500/90  hover:shadow-orange-500/90">
          <Link to={"/book"}>{t("book_now")}</Link>
        </button>
      </div>
    </div>
  );
}

export default RoomPage;
