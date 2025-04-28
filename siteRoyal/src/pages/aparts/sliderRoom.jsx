import React, { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import maximize from "../../assets/aparts/maximize.png";
import Maximizee from "./maximize";

function Slider({ room, isMaximize }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState([]);
  const [loadingStates, setLoadingStates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMaximizeClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const preloadCurrentAndNext = () => {
      const indexesToPreload = [
        currentIndex,
        (currentIndex + 1) % room.imgurl.length,
      ];
      const newImages = [];

      indexesToPreload.forEach((index) => {
        if (!preloadedImages[index]) {
          const img = new Image();
          img.src = `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/imgsRoyal/${room.wubid}/${room.imgurl[index]}`;
          img.onload = () => handleImageLoad(index);
          newImages[index] = img;
        }
      });

      setPreloadedImages((prev) => {
        const updated = [...prev];
        indexesToPreload.forEach((index) => {
          if (!updated[index]) updated[index] = newImages[index];
        });
        return updated;
      });

      setLoadingStates((prevLoadingStates) => {
        const updated = [...prevLoadingStates];
        indexesToPreload.forEach((index) => {
          if (typeof updated[index] === "undefined") updated[index] = true;
        });
        return updated;
      });
    };

    preloadCurrentAndNext();
  }, [currentIndex, room]);

  const handleImageLoad = (index) => {
    setLoadingStates((prevLoadingStates) => {
      const newLoadingStates = [...prevLoadingStates];
      newLoadingStates[index] = false;
      return newLoadingStates;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === room.imgurl.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? room.imgurl.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={`relative overflow-hidden ${
        isMaximize ? "" : " w-[340px] md:w-[410px]"
      }`}
    >
      <Maximizee isOpen={isModalOpen} onClose={handleCloseModal} room={room} />
      {/* {!isMaximize && (
        <img
          src={f}
          alt="Maximize"
          onClick={handleMaximizeClick}
          className={`h-5 w-5 absolute top-0 right-0 m-1.5 cursor-pointer hover:h-[21px] hover:w-[21px] ${
            isModalOpen ? "border border-gray-500" : ""
          }`}
          style={{ zIndex: 10 }}
        />
      )} */}

      <div
        className="w-full flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          position: "relative",
        }}
      >
        {room.imgurl.map((imgName, index) => {
          const image = preloadedImages[index];
          const isLoading = loadingStates[index];
          return (
            <div
              key={index}
              className={`object-cover ${
                isMaximize
                  ? "h-[300px] md:h-[830px] md:px-24 lg:px-48 w-full"
                  : "h-[300px] md:h-[340px] w-full"
              } flex-none relative`}
            >
              {isLoading || !image ? (
                <div className="absolute inset-0 flex justify-center items-center">
                  <Circles color="#00BFFF" height={80} width={80} />
                </div>
              ) : (
                <img
                  className="w-full h-full object-cover"
                  loading="lazy"
                  src={image.src}
                  alt=""
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-0 text-6xl bg-shit h-32 opacity-50 bg-opacity-0 hover:bg-opacity-40"
        onClick={goToPrevious}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-0 text-6xl bg-shit h-32 opacity-50 bg-opacity-0 hover:bg-opacity-40"
        onClick={goToNext}
      >
        &gt;
      </button>
    </div>
  );
}

export default Slider;
