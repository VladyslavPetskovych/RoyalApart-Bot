import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function PickCategory({ setSelectedCategory }) {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isBathPreselected = queryParams.get("category") === "bath";

  const [selectedCategories, setSelectedCategoriesLocal] = useState(
    isBathPreselected ? ["bath"] : []
  );

  const handleCategoryClick = (category) => {
    setSelectedCategoriesLocal((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };

  useEffect(() => {
    setSelectedCategory(selectedCategories);
  }, [selectedCategories, setSelectedCategory]);

  return (
    <div className="m-1 h-42 w-[160px] lg:my-0 font-oswald items-center justify-start text-shit2 flex flex-col text-sm text-[14px] md:text-[16px] lg:mb-10">
      <p className="-ml-16 my-2 text-[17px] md:text-[19px] underline">
        {t("categories")}
      </p>
      <div className="flex items-start justify-start flex-col">
        <button
          onClick={() => handleCategoryClick("family")}
          className={`py-2 px-2 my-1 ${
            selectedCategories.includes("family")
              ? "text-shit2 shadow-lg rounded-full shadow-orange-500/90"
              : ""
          }`}
        >
          • {t("family")}
        </button>
        <button
          onClick={() => handleCategoryClick("romantic")}
          className={`py-2 px-2 my-1 ${
            selectedCategories.includes("romantic")
              ? "text-shit2 shadow-lg rounded-full shadow-orange-500/90"
              : ""
          }`}
        >
          • {t("romantic")}
        </button>
        <button
          onClick={() => handleCategoryClick("business")}
          className={`py-2 px-2 my-1 ${
            selectedCategories.includes("business")
              ? "text-shit2 shadow-lg rounded-full shadow-orange-500/90"
              : ""
          }`}
        >
          • {t("business")}
        </button>
        <button
          onClick={() => handleCategoryClick("bath")}
          className={`py-2 px-2 my-1 ${
            selectedCategories.includes("bath")
              ? "text-shit2 shadow-lg rounded-full shadow-orange-500/90"
              : ""
          }`}
        >
          • {t("bath")}
        </button>
      </div>
    </div>
  );
}

export default PickCategory;
