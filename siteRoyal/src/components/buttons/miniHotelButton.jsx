import React from "react";

function miniHotelButton() {
  return (
    <div className="flex flex-row justify-center items-center bg-back ">
      <p className="font-bold text-lg text-black" >
        Особлива пропозиція смарт-апартаментів
      </p>
      <button className=" bg-gradient-to-br from-amber-500 to-amber-400 text-lg font-bold shadow-orange-500/90  hover:shadow-orange-500/90  p-4 rounded-3xl">
        Міні-готель
      </button>
    </div>
  );
}

export default miniHotelButton;
