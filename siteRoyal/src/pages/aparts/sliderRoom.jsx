/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

function Slider({ room }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState([]);

  useEffect(() => {
    const preloadImages = () => {
      const images = room.imgurl.map((img) => {
        const imageObj = new Image();
        imageObj.src = `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/imgsRoyal/${room.wubid}/${img}`;
        return imageObj;
      });
      setPreloadedImages(images);
    };
    preloadImages();
  }, [room]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? room.imgurl.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === room.imgurl.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative overflow-hidden">
      {preloadedImages.length > 0 && (
        <img
          className="object-cover h-[300px] md:h-[400px] w-96 flex flex-row transition-opacity duration-500"
          src={preloadedImages[currentIndex].src}
          alt=""
        />
      )}
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-0 text-6xl bg-slate-600 h-40 opacity-20 hover:opacity-70"
        onClick={goToPrevious}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-0 text-6xl bg-slate-600 h-40 opacity-20 hover:opacity-70"
        onClick={goToNext}
      >
        &gt;
      </button>
    </div>
  );
}

export default Slider;
