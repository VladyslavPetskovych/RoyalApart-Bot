import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center text-back transition-opacity duration-500 ease-out">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 border-4 border-back border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 border-4 border-back-500 border-b-transparent rounded-full animate-spin-slow" />
      </div>
      <p className="text-lg text-back font-medium tracking-wide">
        Завантаження...
      </p>
    </div>
  );
}

export default Loader;
