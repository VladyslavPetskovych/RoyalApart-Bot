import React, { useRef, useEffect } from "react";
import fon from "../../assets/slider.jpg";
import fon2 from "../../assets/slider2.jpg";
import fon3 from "../../assets/slider3.jpg";
import fon4 from "../../assets/slider4.jpg";
import { useTranslation } from "react-i18next";

const images = [
  { src: fon, alt: "Slide 1" },
  { src: fon2, alt: "Slide 2" },
  { src: fon3, alt: "Slide 3" },
  { src: fon4, alt: "Slide 4" },
];

function Courosel() {
  const { t } = useTranslation();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
        <div className=" left-0 top-0 w-full h-6 -mt-1">
        <div className="bg-gradient-to-b from-black to-back w-full h-full transition-all duration-500"></div>
      </div>
      <div className="bg-back h-[600px] flex w-full lg:h-[420px] flex-col lg:flex-row">
        <div className="flex flex-col items-center justify-center">
          <p className="font-oswald sm:text-xl text-black mt-8 lg:text-2xl w-[80%] flex items-center justify-center text-center">
            {t("apartment_description")}
          </p>
        </div>
        <div className="md:mr-16 lg:mr-32 w-full flex items-center justify-center">
          <div className="relative h-96 w-[450px] m-5">
            <div ref={carouselRef}>
              {images.map((image, index) => (
                <div
                  className={`absolute inset-0 h-full w-full transform duration-1000 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                  key={index}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="left-0 top-0 w-full h-6 -mt-1">
        <div className="bg-gradient-to-t from-black to-back w-full h-full transition-all duration-500"></div>
      </div>
    </>
  );
}

export default Courosel;
