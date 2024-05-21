import React from "react";
import { useTranslation } from "react-i18next";
import crown from "../../assets/crown.png";

function whyRoyal() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white py-2 ">
      <div className="container mx-auto flex flex-col items-center justify-center  text-center my-32">
        <img src={crown} alt="" className="h-16 w-16 object-contain" />
        <h1 className=" text-3xl md:text-4xl lg:text-6xl font-oswald mb-16">
          {t("why_royal_apart")}
        </h1>
        <p className="text-gray-300 mb-16 text-xl md:text-3xl w-[55%]  font-oswald">
          {t("best_apartments")}
        </p>
        <div className="flex items-center justify-center">
          <div className="text-center mr-8">
            <h3 className="text-3xl md:text-5xl font-serif mb-4">7500</h3>
            <p className="text-gray-300">{t("happy_guests")}</p>
          </div>
          <div className="text-center mr-8">
            <h3 className="text-3xl md:text-5xl font-serif mb-4">
              11 {t("years")}
            </h3>
            <p className="text-gray-300">{t("real_estate_market")}</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-serif mb-4">24</h3>
            <p className="text-gray-300">{t("support")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default whyRoyal;
