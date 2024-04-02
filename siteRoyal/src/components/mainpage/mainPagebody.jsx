import React, { useState, useEffect } from "react";
import fon from "../../assets/fon.jpg";
import fon2 from "../../assets/IMG_8653.jpg";
import fon3 from "../../assets/зображення_viber_2021-09-18_13-26-53-911.jpg";
import tele from "../../assets/telegram.png";
import curs from "../../assets/cursor.332x512.png";
import crown from "../../assets/crown.png";
import MainPageContent from "./mainPageContent";
import Courosel from "./courosel";

import "./body.css";

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
    // Add more slides here
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
      <div className="h-[1000px]">
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
          className="h-32 w-32  basis-1/2 md:basis-1/3 object-contain"
        />
        <h2 className="text-3xl text-textW text-center font-serif flex flex-row">
          Скористайся нашим унікальним ботом для ‎
          <a
            href="https://t.me/RoyalApartBot"
            className="text-blue-500 underline "
          >
            бронювання в телеграмі
          </a>
          <img
            src={curs}
            alt=""
            className="h-8 w-8 object-contain float ml-[-3px] "
          />
        </h2>
      </div>

      <div className="bg-back h-[600px] flex w-full md:h-[420px] flex-col md:flex-row ">
        <div className=" flex flex-col items-center justify-center">
          <p className="font-oswald sm:text-2xl text-black mt-8 lg:text-4xl w-[60%] flex items-center justify-center text-center">
            {" "}
            У кожних апартаментах виконаний авторський ремонт, це підкреслить
            Ваш відпочинок новими враженнями і затишком.
          </p>
        </div>
        <div className=" mr-4 sm:mr-32 md:mr-64">
          <Courosel />
        </div>
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
    </>
  );
}

export default mainPagebody;
