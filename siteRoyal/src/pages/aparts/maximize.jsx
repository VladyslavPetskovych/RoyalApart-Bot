// Maximizee component
import React from "react";
import Slider from "./sliderRoom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { slugify } from "transliteration";


const Maximizee = ({ isOpen, onClose, room }) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // Add or remove class to body based on modal state
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    // Cleanup function to reset overflow on component unmount
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);
  const isEnglish = i18n.language === "en";
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen  bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-back p-1 rounded-lg shadow-lg w-[95%] h-auto  mr-0 text-xs md:text-sm font-roboto">
            <div className="flex flex-row justify-between mb-5">
              <p></p>
              <p className="text-sm md:text-xl">
                {t("full_inf_room")}{" "}
                {isEnglish ? slugify(room.name).charAt(0).toUpperCase() + slugify(room.name).slice(1) : room.name}
              </p>

              <button onClick={onClose} className="bg-red-300">
                {t("close")}
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-[100%] h-auto md:w-[70%]  md:h-auto">
                <Slider room={room} isMaximize={true} />
              </div>

              <div className="flex flex-col  text-left font-roboto m-3">
                <div className="flex items-center justify-center flex-col">
                  <p className=" w-full md:max-w-[300px]">{room.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Maximizee;
