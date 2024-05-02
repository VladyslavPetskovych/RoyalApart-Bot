import React, { useState, useEffect } from "react";
import maximize from "../../assets/aparts/maximize.png";
import Maximizee from "./maximize";

function Slider({ room, isMaximize }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMaximizeClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    <div className={`relative overflow-hidden ${isMaximize ? '' : ' w-[340px] md:w-[410px]'}`}>
      <Maximizee isOpen={isModalOpen} onClose={handleCloseModal} room={room} />
      {!isMaximize && (
        <img
          src={maximize}
          alt="Maximize"
          onClick={handleMaximizeClick}
          className={`h-5 w-5 absolute top-0 right-0 m-1.5 cursor-pointer hover:h-[21px] hover:w-[21px] ${
            isModalOpen ? "border border-gray-500" : ""
          }`}
          style={{ zIndex: 10 }} 
        />
      )}

      {preloadedImages.length > 0 && (
        <div 
          className="w-full flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            position: 'relative', // Ensure the parent container has relative positioning
          }}
        >
          {preloadedImages.map((image, index) => (
            <img
              key={index}
              className={`object-cover ${
                isMaximize
                  ? "h-[300px] md:h-[550px] w-full"
                  : "h-[300px] md:h-[340px] w-full"
              }  flex-none`}
              src={image.src}
              alt=""
            />
          ))}
        </div>
      )}
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
