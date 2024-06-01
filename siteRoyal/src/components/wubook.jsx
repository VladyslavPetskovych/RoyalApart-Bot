import React, { useEffect } from "react";

function Wubook() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://wubook.net/js/nebi/iframe.jgz";
    script.async = true;

    document.body.appendChild(script);

    const iframeConfig = {
      id: "nebi_11310131",
      src: "https://wubook.net/neb/bk?f=&n=1&ep=95d630b4&iframe_session=-1",
      scrolling: "no",
      width: "100%",
      height: "1500px",
      marginheight: "0",
      marginwidth: "0",
      frameborder: "0",
      horizontalscrolling: "no",
      verticalscrolling: "no",
      allow:
        "autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowfullscreen: "",
    };

    const targetElement = document.querySelector(
      "#the_place_where_iframe_will_be_installed"
    );
    const iframe = createIframe(iframeConfig);

    targetElement.appendChild(iframe);

    // Add event listener to adjust iframe height based on content
    window.addEventListener("message", (event) => {
      if (event.data && event.data.type === "setHeight" && event.data.height) {
        iframe.style.height = `${event.data.height}px`;
      }
    });

    return () => {
      targetElement.removeChild(iframe);
      window.removeEventListener("message", adjustIframeHeight);
    };
  }, []);

  function createIframe(config) {
    const iframe = document.createElement("iframe");
    Object.entries(config).forEach(([key, value]) => {
      iframe.setAttribute(key, value);
    });
    iframe.style.display = "block";
    iframe.style.border = "none";
    iframe.style.overflowY = "hidden";
    return iframe;
  }

  return (
    <div className="bg-shit2 flex justify-center">
      <div className="w-full h-full mt-20">
        <p className="text-2xl font-roboto my-10">
          Бронюй квартиру швидко і зручно
        </p>
        <div id="the_place_where_iframe_will_be_installed"></div>
      </div>
    </div>
  );
}

export default Wubook;
