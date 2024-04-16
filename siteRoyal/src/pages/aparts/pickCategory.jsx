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
    <div className="bg-white h-44 mx-5 my-5 w-[300px] items-center justify-center text-black flex flex-col font-popins text-3xl">
      <button
        onClick={() => handleCategoryClick("family")}
        className={`border-2 rounded-full py-2 px-4 my-1 ${
          selectedCategories.includes("family") ? "bg-blue-500 text-white" : "bg-white"
        }`}
      >
        Сімейні
      </button>
      <button
        onClick={() => handleCategoryClick("romantic")}
        className={`border-2 rounded-full py-2 px-4 my-1 ${
          selectedCategories.includes("romantic") ? "bg-blue-500 text-white" : "bg-white"
        }`}
      >
        Романтичні
      </button>
      <button
        onClick={() => handleCategoryClick("business")}
        className={`border-2 rounded-full py-2 px-4 my-1 ${
          selectedCategories.includes("business") ? "bg-blue-500 text-white" : "bg-white"
        }`}
      >
        Бізнес
      </button>
    </div>
  );
}

export default PickCategory;
