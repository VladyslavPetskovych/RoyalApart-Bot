import React, { useState, useEffect } from "react";
import fon from "../../assets/fon.jpg";
import fon2 from "../../assets/IMG_8653.jpg";
import fon3 from "../../assets/зображення_viber_2021-09-18_13-26-53-911.jpg";
import tele from "../../assets/telegram.png";
import MainPageContent from "./mainPageContent";

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
      <div className="h-[300px] bg-shit2">
        <img
          src={tele}
          alt=""
          className="h-32 w-32 duration-100 ease-out transform 
  translate-x-0 translate-y-0 scale-100 hover:translate-x-20 hover:translate-y-20 hover:scale-150"
        />
      </div>
    </>
  );
}

export default mainPagebody;
