import React, { useState, useEffect } from "react";

function PickCategory({ setSelectedCategory }) {
  const [selectedCategories, setSelectedCategoriesLocal] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategoriesLocal((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((cat) => cat !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  // Виклик setSelectedCategory тут
  useEffect(() => {
    setSelectedCategory(selectedCategories);
  }, [selectedCategories, setSelectedCategory]);

  return (
    <div className=" m-1 h-42 w-[160px]   lg:my-0  items-center justify-start text-shit2 flex flex-col font-popins text-sm  text-[14px] md:text-[16px] lg:mb-10">
      <p className="-ml-16 my-2 text-[17px] md:text-[19px] underline">Категорії:</p>
      <div className="flex items-start justify-start flex-col">
        <button
          onClick={() => handleCategoryClick("family")}
          className={` py-2 px-2 my-1 ${
            selectedCategories.includes("family")
              ? "  text-shit2 shadow-lg  rounded-full shadow-orange-500/90"
              : ""
          }`}
        >
          Сімейні
        </button>
        <button
          onClick={() => handleCategoryClick("romantic")}
          className={`py-2 px-2 my-1 ${
            selectedCategories.includes("romantic")
              ? "text-shit2 shadow-lg    rounded-full shadow-orange-500/90"
              : ""
          }`}
        >
          Романтичні
        </button>

        <button
          onClick={() => handleCategoryClick("business")}
          className={`  py-2 px-2 my-1 ${
            selectedCategories.includes("business")
              ? "  text-shit2 shadow-lg  rounded-full shadow-orange-500/90"
              : ""
          }`}
        >
          Бізнес
        </button>
      </div>
    </div>
  );
}

export default PickCategory;
