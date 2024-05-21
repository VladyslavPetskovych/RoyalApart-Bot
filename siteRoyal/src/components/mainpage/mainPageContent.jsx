import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function MainPageContent() {
  const { t } = useTranslation();

  return (
    <div
      className="z-1  h-full w-screen overflow-hidden bg-fixed   "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6" }}
    >
      <div className="flex h-full font-serif">
        <div className="text-textW">
          <div className=" w-screen  flex  flex-col text-xl  md:text-4xl ">
            <div className="flex flex-col justify-center items-center ">
              <h2 className="mb-4 mt-32 md:mt-64 z-5 drop-shadow-lg shadow-blue-500">
                {t("apartment_rental")}
              </h2>
              <h6 className="text-xl w-[90%] md:w-[50%] ">
                {t("innovative_telegram_bot")}
              </h6>
            </div>

            <h2 className="   m-5 text-2xl md:text-3xl ">
              {t("select_apartments")}
            </h2>
            <div className=" flex flex-row items-center justify-center">
              <div>
                <button className=" inline-flex items-center justify-center p-0 mb-2 me-2 overflow-hidden  shadow-lg shadow-orange-500/50 hover:p-[1px] text-gray-900 rounded-lg  hover:text-black ">
                  <span className="text-xl md:text-2xl px-6 py-4  text-textW  bg-gradient-to-r to-shit from-shit2 rounded-md  ">
                    <Link to="/book">{t("book_now")}</Link>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageContent;
