import React from "react";
import { useTranslation } from "react-i18next";
function SearchBar({ setSearchQuery }) {
  const { t } = useTranslation();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="w-[300px] md:w-[300px]">
      <div className="pt-2 relative    text-gray-600">
        <input
          className="border-2 border-gray-300 w-[300px] md:w-auto bg-white h-10 md:px-10 md:pr-12  text-base focus:outline-none"
          type="search"
          name="search"
          placeholder={t("searchbar")}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="absolute top-0 mt-2 w-10 h-10 text-xl bg-amber-500 rounded-full ml-[-26px] md:ml-[-18px]"
        >
          🔎
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
