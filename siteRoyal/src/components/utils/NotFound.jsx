import React from "react";
import { Link } from "react-router-dom";
import FuzzyText from "./FuzzyText";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-10">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.6}
        enableHover={true}
        fontSize="clamp(3rem, 20vw, 10rem)"
        color="#bfa66a"
      >
        404
      </FuzzyText>
      <h2 className="text-2xl md:text-3xl font-semibold mt-6 text-center">
        Сторінку не знайдено
      </h2>
      <p className="text-base md:text-lg mt-4 max-w-xl text-center px-2">
        Йой! Такої сторінки не існує або вона була переміщена.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-amber-600 text-white px-5 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base font-medium shadow hover:bg-amber-700 transition-colors"
      >
        На головну
      </Link>
    </div>
  );
}

export default NotFound;
