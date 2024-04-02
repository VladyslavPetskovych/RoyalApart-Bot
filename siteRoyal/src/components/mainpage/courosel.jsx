import React, { useRef, useEffect } from "react";
import fon from "../../assets/slider.jpg";
import fon2 from "../../assets/slider2.jpg";
import fon3 from "../../assets/slider3.jpg";
import fon4 from "../../assets/slider4.jpg";
const images = [
  { src: fon, alt: "Slide 1" },
  { src: fon2, alt: "Slide 2" },
  { src: fon3, alt: "Slide 3" },
  { src: fon4, alt: "Slide 4" },
];

function Courosel() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    const interval = setInterval(() => {
      if (currentIndex === images.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className="relative h-96 w-[450px] object-contain m-5">
      <div className=" " ref={carouselRef}>
        {images.map((image, index) => (
          <div
            className={`slide absolute inset-0 h-full w-full transform duration-1000 ${
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
  );
}

export default Courosel;
