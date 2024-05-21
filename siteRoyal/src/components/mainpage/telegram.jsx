import React from 'react'
import tele from "../../assets/telegram.png";
import curs from "../../assets/cursor.332x512.png";
import './mainPagebody.css'
import { useTranslation } from "react-i18next";

function telegram() {
    const { t } = useTranslation();
  return (
    <div className="h-[180px] w-full bg-black flex items-center">
    <img
      src={tele}
      alt=""
      className="h-16  md:h-24 lg:h-32 w-auto  basis-1/2 md:basis-1/3 object-contain"
    />
    <div className="flex items-center justify-center">
      <span className="text-xl md:text-[24px] text-textW font-serif leading-none">
        {t("use_unique_bot")}{" "}
        <a
          href="https://t.me/RoyalApartBot"
          className="text-blue-500 underline"
        >
          {t("booking_on_telegram")}
        </a>
      </span>
    </div>

    <img
      src={curs}
      alt=""
      className=" h-4 md:h-8 w-auto object-contain float ml-[-3px] "
    />
  </div>
  )
}

export default telegram
