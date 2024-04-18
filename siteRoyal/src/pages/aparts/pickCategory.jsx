import React, { useState,useEffect } from "react";

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
    <div className=" bg-shit2 m-1 h-48 w-[160px]   lg:my-0  items-center justify-center text-white flex flex-col font-popins text-sm  md:text-[16px] lg:mb-10">
      <p className="-ml-16 my-5">Категорії:</p>
      <button
        onClick={() => handleCategoryClick("family")}
        className={` rounded-full py-2 px-4 my-1 ${
          selectedCategories.includes("family") ? "border-2 rounded-full text-white" : "bg-shit2"
        }`}
      >
        Сімейні
      </button>
      <button
        onClick={() => handleCategoryClick("romantic")}
        className={` rounded-full py-2 px-4 my-1 ${
          selectedCategories.includes("romantic") ? "border-2 rounded-full text-white" : "bg-shit2"
        }`}
      >
        Романтичні
      </button>
      <button
        onClick={() => handleCategoryClick("business")}
        className={` rounded-full py-2 px-4 my-1 ${
          selectedCategories.includes("business") ? "border-2 rounded-full text-white" : "bg-shit2"
        }`}
      >
        Бізнес
      </button>
    </div>
  );
}

export default PickCategory;
