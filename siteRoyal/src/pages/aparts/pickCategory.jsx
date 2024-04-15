import React, { useState } from "react";

function PickCategory({ setSelectedCategory }) {
  const [clickedCategory, setClickedCategory] = useState("");

  const handleCategoryClick = (category) => {
    console.log("handleCategoryClick")
    console.log(category)
    if (clickedCategory === category) {
      setSelectedCategory(""); // Reset category if clicked again
      setClickedCategory("");
    } else {
      setSelectedCategory(category); // Set selected category
      setClickedCategory(category);
    }
  };

  return (
    <div className="bg-white h-44 mx-5 my-5 w-[300px] items-center justify-center text-black flex flex-col font-popins text-3xl">
      <button
        onClick={() => handleCategoryClick("family")}
        className={`border-2 rounded-full py-2 px-4 my-1 ${
          clickedCategory === "family" ? "bg-blue-500 text-white" : "bg-white"
        }` }
        
      >
        Сімейні
      </button>
      <button
        onClick={() => handleCategoryClick("romantic")}
        className={`border-2 rounded-full py-2 px-4 my-1 ${
          clickedCategory === "romantic" ? "bg-blue-500 text-white" : "bg-white"
        }`}
      >
        Романтичні
      </button>
      <button
        onClick={() => handleCategoryClick("business")}
        className={`border-2 rounded-full py-2 px-4 my-1 ${
          clickedCategory === "business" ? "bg-blue-500 text-white" : "bg-white"
        }`}
      >
        Бізнес
      </button>
    </div>
  );
}

export default PickCategory;
