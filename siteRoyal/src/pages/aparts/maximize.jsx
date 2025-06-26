import React, { useState, useEffect } from "react";
import Slider from "./sliderRoom";
import { useTranslation } from "react-i18next";
import { slugify } from "transliteration";

const Maximizee = ({ isOpen, onClose, room }) => {
  const { t, i18n } = useTranslation();
  const [translatedDescription, setTranslatedDescription] = useState("");

  useEffect(() => {
    const translateDescription = async () => {
      if (i18n.language !== "uk" && room.description) {
  
        try {
          const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=uk&tl=${i18n.language}&dt=t&q=${encodeURIComponent(room.description)}`);
          const data = await response.json();
      
          if (data[0]) {
            const translatedText = data[0].map(segment => segment[0]).join(" ");
            setTranslatedDescription(translatedText);
          }
        } catch (error) {
          console.error("Error translating description:", error);
          setTranslatedDescription(room.description);  
        }
      } else {
        setTranslatedDescription(room.description);  
      }
    };

    if (isOpen) {  
      translateDescription();
    }

    return () => {
      if (!isOpen) {
        setTranslatedDescription("");  // Clear translation when the modal/dialog is closed
      }
    };
  }, [isOpen, i18n.language, room.description]);

  const isEnglish = i18n.language === "en";

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-back p-1 rounded-lg shadow-lg w-[95%] h-auto mr-0 text-xs md:text-sm font-roboto">
            <div className="flex flex-row justify-between mb-5">
              <p></p>
              <p className="text-sm md:text-xl">
                {t("full_inf_room")}{" "}
                {isEnglish ? slugify(room.name).charAt(0).toUpperCase() + slugify(room.name).slice(1) : room.name}
              </p>
              <button onClick={onClose} className="p-1 m-1 md:text-xl bg-red-400">
              ✖️
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-[100%] h-auto md:w-[70%] md:h-auto">
                <Slider room={room} isMaximize={true} />
              </div>
              <div className="flex flex-col text-left font-roboto m-3">
                <div className="flex items-center justify-center flex-col">
                  <p className="w-full md:max-w-[300px]">
                    {translatedDescription || room.description}
                  </p>
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
