import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import back1 from "../../assets/miniHotel/back1.jpg";
import back2 from "../../assets/miniHotel/back2.jpg";
import back3 from "../../assets/miniHotel/back3.jpg";

import AOS from "aos";
import "aos/dist/aos.css"

function miniHotelButton() {
  useEffect(() => {
    AOS.init({duration:700})
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-back ">
      <div className="flex flex-col justify-arround items-center h-24 m-8 md:m-4" data-aos="fade-up">
        <p className="font-bold  font-popins text-2xl text-black " >
          Особлива пропозиція смарт-апартаментів
        </p>
        <Link to={"/mini-hotel"}>
          <button className=" m-0.5 bg-gradient-to-br  from-amber-500 to-amber-400 text-lg font-bold shadow-orange-500/90  hover:shadow-orange-500/90  p-3 ">
            Міні-готель
          </button>
        </Link>
      </div>
      <div className="w-full  flex flex-row  justify-around  pb-20">
        <Link to={"/mini-hotel"} className="w-[90%] md:w-1/4 h-96  hover:p-2">
          <img className="w-full h-full  object-cover" src={back1} alt="" />
        </Link>
        <Link
          to={"/mini-hotel"}
          className=" hidden md:block   md:w-1/4 h-96  hover:p-2"
        >
          <img className="  w-full h-full object-cover" src={back2} alt="" />
        </Link>
        <Link
          to={"/mini-hotel"}
          className="hidden md:block w-1/4 h-96 hover:p-2 "
        >
          <img className="w-full h-full  object-cover" src={back3} alt="" />
        </Link>
      </div>
    </div>
  );
}

export default miniHotelButton;
