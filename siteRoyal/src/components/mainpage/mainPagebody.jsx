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
import "../../../src/hideScrollbar.css";
import MySVG from "../../assets/svgg.svg";
import "./mainPagebody.css";
import SEO from "../SEO";
import Sale from "./home/saleButton";

function MainPageBody() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const slides = [fon, fon2, fon3, fon4];

  useEffect(() => {
    // Preload images
    const preloadImages = async () => {
      const promises = slides.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, [slides]);

  useEffect(() => {
    if (imagesLoaded) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [imagesLoaded, slides.length]);

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
      <Sale/>
      <Telegram />
      <Courosel />
      <WhyRoyal />
      <div className="w-[94vw] h-[330px] px-8 lg:h-[500px]">
        <SliderCategories />
      </div>
      <div className="left-0 top-0 w-full h-6 -mt-1">
        <div className="bg-gradient-to-b from-black to-back w-full h-full transition-all duration-500"></div>
      </div>
    </>
  );
}

export default MainPageBody;
