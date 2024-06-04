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
      scrolling: "yes",
      width: "100%",
      height: "1000px",
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

    return () => {
      targetElement.removeChild(iframe);
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
