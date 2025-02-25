import React, { useEffect, useState } from "react";

function Book() {
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => setIframeHeight(window.innerHeight); 

    window.addEventListener("resize", updateHeight);

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", updateHeight);
      document.body.style.overflow = ""; 
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="bg-shit2 flex flex-col items-center w-full h-screen">
      <p className="text-2xl font-roboto text-center mt-20">
        
      </p>
      <iframe
        id="wubook_iframe"
        src="https://wubook.net/neb/bk?f=&n=1&ep=95d630b4&iframe_session=-1"
        width="100%"
        height="100%"
        style={{
          border: "none",
          display: "block",
          flexGrow: 1,
        }}
        scrolling="yes"
        allow="fullscreen; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
}

export default Book;
