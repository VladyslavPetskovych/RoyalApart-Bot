import React, { useState, useEffect } from "react";
import fon from "../../assets/hero_imgs/fon.png";
import fon2 from "../../assets/hero_imgs/fon2.png";
import fon3 from "../../assets/hero_imgs/fon3.png";
//import fon4 from "../../assets/hero_imgs/";
import tele from "../../assets/telegram.png";
import curs from "../../assets/cursor.332x512.png";
import crown from "../../assets/crown.png";
import MainPageContent from "./mainPageContent";
import Courosel from "./courosel";

import SliderCategories from "./home/sliderCategories";
import "../../../src/hideScrollbar.css";
import MySVG from "../../assets/svgg.svg";

import "./mainPagebody.css";

function mainPagebody() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: fon,
    },
    {
      image: fon2,
    },
    {
      image: fon3,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide =
        currentSlide + 1 === slides.length ? 0 : currentSlide + 1;
      setCurrentSlide(nextSlide);
    }, 2000);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const updateSlide = (newSlide) => {
    clearInterval(timer);
    const nextSlide = newSlide + 1 === slides.length ? 0 : newSlide + 1;
    setCurrentSlide(nextSlide);

    useEffect(() => {
      const timer = setInterval(() => {
        const nextSlide =
          currentSlide + 1 === slides.length ? 0 : currentSlide + 1;
        setCurrentSlide(nextSlide);
      }, 2000);

      return () => clearInterval(timer);
    }, [currentSlide, slides.length]);
  };

  return (
    <>
      <div className="h-[700px] md:h-[1000px] ">
        <div
          className="text-textW relative h-full overflow-hidden bg-cover bg-no-repeat  text-center"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            transition: "background-image 0.5s ease",
          }}
        >
          <MainPageContent />
        </div>
      </div>
      <div className="h-[230px] w-full bg-black flex items-center">
        <img
          src={tele}
          alt=""
          className="h-16  md:h-32 lg:h-48 w-auto  basis-1/2 md:basis-1/3 object-contain"
        />
        <div className="flex items-center justify-center">
          <span className="text-xl md:text-3xl text-textW font-serif leading-none">
            Скористайся нашим унікальним ботом для{" "}
            <a
              href="https://t.me/RoyalApartBot"
              className="text-blue-500 underline"
            >
              бронювання в телеграмі
            </a>
          </span>
        </div>

        <img
          src={curs}
          alt=""
          className=" h-4 md:h-8 w-auto object-contain float ml-[-3px] "
        />
      </div>
      <div className=" left-0 top-0 w-full h-6 ">
        <div className="bg-gradient-to-b from-black to-back w-full h-full transition-all duration-500"></div>
      </div>

      <div className="bg-back h-[600px] flex w-full lg:h-[420px] flex-col lg:flex-row ">
        <div className=" flex flex-col items-center justify-center">
          <p className="font-oswald sm:text-2xl text-black mt-8 lg:text-4xl w-[80%] flex items-center justify-center text-center">
            {" "}
            У кожних апартаментах виконаний авторський ремонт, це підкреслить
            Ваш відпочинок новими враженнями і затишком.
          </p>
        </div>
        <div className="  md:mr-16 lg:mr-32 w-full flex  items-center justify-center">
          <Courosel />
        </div>
      </div>
      {/* <div
        className="w-full h-8  bg-contain "
        style={{ backgroundImage: `url(${MySVG})` }}
      ></div>
  */}

      <div className=" left-0 top-0 w-full h-6 ">
        <div className="bg-gradient-to-t from-black to-back w-full h-full transition-all duration-500"></div>
      </div>

      <div className="bg-black text-white py-16 ">
        <div className="container mx-auto flex flex-col items-center justify-center  text-center my-32">
          <img src={crown} alt="" className="h-16 w-16 object-contain" />
          <h1 className="text-6xl font-oswald mb-16">
            Чому саме Royal Apart ?
          </h1>
          <p className="text-gray-300 mb-16 text-2xl font-oswald">
            Ми пропонуємо найкращі апартаменти за доступними цінами. Гарантія
            ідеальної чистоти у кожних апартаментах
          </p>
          <div className="flex items-center justify-center">
            <div className="text-center mr-8">
              <h3 className="text-5xl font-serif mb-4">7500</h3>
              <p className="text-gray-300">Щасливих гостей</p>
            </div>
            <div className="text-center mr-8">
              <h3 className="text-5xl font-serif mb-4">11 років</h3>
              <p className="text-gray-300">На ринку нерухомості</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-serif mb-4">24</h3>
              <p className="text-gray-300">-годинна підтримка</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[94vw] h-[330px] px-8  lg:h-[500px] ">
        <SliderCategories />
      </div>

      <div className=" left-0 top-0 w-full h-6 ">
        <div className="bg-gradient-to-b from-black to-back w-full h-full transition-all duration-500"></div>
      </div>
    </>
  );
}

export default mainPagebody;
