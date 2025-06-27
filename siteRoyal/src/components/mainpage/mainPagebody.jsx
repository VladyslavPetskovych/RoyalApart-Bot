import React, { useState, useEffect } from "react";
import fon from "../../assets/hero_imgs/fon.jpg";
import fon2 from "../../assets/hero_imgs/fon2.png";
import fon3 from "../../assets/hero_imgs/fon3.png";
import fon4 from "../../assets/hero_imgs/fon4.jpg";
import Telegram from "./telegram";
import MainPageContent from "./mainPageContent";
import Courosel from "./courosel";
import { useTranslation } from "react-i18next";
import SliderCategories from "./home/sliderCategories";
import WhyRoyal from "./whyRoyal";
import Jaccuzzi from "./jaccuzzi";
import "../../../src/hideScrollbar.css";
import SEO from "../SEO";
import Sale from "./home/saleButton";
import MiniHotelButton from "../../components/buttons/miniHotelButton";

function MainPageBody() {
  const { t } = useTranslation();
  const slides = [fon, fon2, fon3, fon4];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [restLoaded, setRestLoaded] = useState(false);

  // Завантажуємо першу картинку одразу
  useEffect(() => {
    const img = new Image();
    img.src = slides[0];
    img.onload = () => setFirstLoaded(true);
  }, [slides]);

  // Завантажуємо решту картинок у фоні
  useEffect(() => {
    if (firstLoaded) {
      const preloadRest = async () => {
        const promises = slides.slice(1).map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
          });
        });
        await Promise.all(promises);
        setRestLoaded(true);
      };

      preloadRest();
    }
  }, [firstLoaded, slides]);

  // Перемикання слайдів після завантаження решти
  useEffect(() => {
    if (restLoaded) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [restLoaded, slides.length]);

  return (
    <>
      <SEO />
      <div className="h-[700px] md:h-[1000px]">
        <div
          className="text-textW relative h-full overflow-hidden bg-cover bg-center bg-no-repeat text-center"
          style={{
            backgroundImage: `url(${slides[currentSlide]})`,
            transition: "background-image 0.5s ease",
          }}
        >
          <MainPageContent />
        </div>
      </div>
      <Sale />
      <Telegram />
      <Courosel />
      <WhyRoyal />
      <MiniHotelButton />
      <Jaccuzzi />
      <div className="w-[94vw] h-[330px] px-8 lg:h-[500px] mx-auto">
        <SliderCategories />
      </div>
      <div className="left-0 top-0 w-full h-6 -mt-1">
        <div className="bg-gradient-to-b from-black to-back w-full h-full transition-all duration-500"></div>
      </div>
    </>
  );
}

export default MainPageBody;
