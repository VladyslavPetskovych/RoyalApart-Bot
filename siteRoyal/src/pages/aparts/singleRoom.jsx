/* eslint-disable react/prop-types */
import Slider from "./sliderRoom";
import { useTranslation } from "react-i18next";
import { slugify } from "transliteration";
import { Link, useLocation } from "react-router-dom";
function SingleRoom({ room }) {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";
  return (
    <div className="border-2 border-orange-50 hover:shadow-lg hover:shadow-orange-300/30 m-3 h-[630px] w-[340px] md:h-[340px] md:w-[540px] mb-4 mx-2  text-lg flex md:flex-row flex-col ">
      <Slider room={room} />

      <div className="w-full  md:w-[300px] h-[50%] flex flex-col justify-between items-center p-3">
        <div>
          <Link to={`/room/${room.wubid}`}>
            <p className="font-semibold text-xl font-roboto">
              {isEnglish
                ? slugify(room.name).charAt(0).toUpperCase() +
                  slugify(room.name).slice(1)
                : room.name}
            </p>
          </Link>
          <div className="flex flex-col justify-start text-left font-roboto text-base">
          
            <div className="flex flex-row  items-center">
              <p className="mr-1 font-semibold">{t("num_rooms")}: </p>
              <p>{room.numrooms} </p>
            </div>
            <div className="flex flex-row  items-center">
              <p className="mr-1 font-semibold">{t("floor")}: </p>
              <p>{room.floor} </p>
            </div>
            <div className="flex flex-row  items-center">
              <p className="mr-1 font-semibold">{t("guests")}: </p>
              <p>{room.guests} </p>
            </div>
            <div className="flex flex-row  items-center">
              <p className="mr-1 font-semibold">{t("area")}: </p>
              <p>
                {room.surface} m<sup>2</sup>
              </p>
            </div>
            <div className="flex flex-row  items-center">
              <p className="mr-1 font-semibold">{t("beds")}: </p>
              <p>{room.beds} </p>
            </div>
          </div>
          <Link to={`/room/${room.wubid}`}>
            <p className="text-blue-900 hover:underline cursor-pointer text-base  font-roboto font-semibold text-left">
              {t('more inf')}
            </p>
          </Link>
        </div>

        <div className="w-[100%] md:mt-10 font-roboto font-semibold text-lg">
          <button className=" h-10 bg-gradient-to-br from-amber-600 to-amber-400 rounded-md w-[70%] hover:shadow-lg shadow-md shadow-orange-500/90  hover:shadow-orange-500/90">
            <a href="https://wubook.net/nneb/mprop?f=today&n=1&ep=95d630b4&w_id=6782">{t("book_now2")}</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleRoom;
