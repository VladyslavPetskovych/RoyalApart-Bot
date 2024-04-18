import React from "react";

function SearchBar({ setSearchQuery }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="w-[250px] md:w-[300px]">
      <div className="pt-2 relative    text-gray-600">
        <input
          className="border-2 border-gray-300  bg-white h-12 md:px-10 md:pr-12  text-xl focus:outline-none"
          type="search"
          name="search"
          placeholder="Пошук квартир"
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="absolute top-0 mt-2 w-12 h-12 text-2xl bg-amber-500 rounded-full ml-[-48px] md:ml-[-18px]"
        >
          🔎
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
