import React from "react";
import { Link } from "react-router-dom";
import jac1 from "../../assets/jaccuzzi/jac1.webp";
import jac2 from "../../assets/jaccuzzi/jac2.webp";
import jac3 from "../../assets/jaccuzzi/jac3.webp";

function Jaccuzzi() {
  return (
    <div className="bg-back h-[600px] w-full text-black">
      <div
        className="flex flex-col justify-arround items-center "
        data-aos="fade-up"
      >
        <p className="font-bold  font-popins text-2xl text-black ">
          Апартаменти з джакузі / ванною
        </p>
        <Link to={"/aparts"}>
          <button className=" m-2 mb-4 bg-gradient-to-br  text-back from-amber-500 to-amber-400 text-lg font-bold shadow-orange-500/90  hover:shadow-orange-500/90  p-3 ">
            Джакузі / Ванна
          </button>
        </Link>
      </div>
      <div className="w-full  flex flex-row  justify-around  pb-20">
        <Link to={"/aparts"} className="w-[90%] md:w-1/4 h-96  hover:p-2">
          <img className="w-full h-full  object-cover" src={jac1} alt="" />
        </Link>
        <Link
          to={"/aparts"}
          className=" hidden md:block   md:w-1/4 h-96  hover:p-2"
        >
          <img className="  w-full h-full object-cover" src={jac2} alt="" />
        </Link>
        <Link
          to={"/aparts"}
          className="hidden md:block w-1/4 h-96 hover:p-2 "
        >
          <img className="w-full h-full  object-cover" src={jac3} alt="" />
        </Link>
      </div>
    </div>
  );
}

export default Jaccuzzi;
