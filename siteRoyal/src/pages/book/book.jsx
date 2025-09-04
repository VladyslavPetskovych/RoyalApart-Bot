import { useEffect } from "react";

function Book() {
  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://wubook.net/js/wblib.jgz";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const WuBook = new _WuBook(1749140045);
      const wbparams = {
        width: 100,
        height: "auto",
        lang: "",
        layout: "",
        mobile: 0,
        width_unit: "%",
        mheight: 1000,
      };
      WuBook.design_iframe("_baror_", wbparams);
    };


    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="py-24 z-50 overflow-hidden bg-shit2">
      <div
        id="_baror_"
        style={{
          overflow: "hidden", 
        }}
      >
        <a
          href="https://wubook.net/"
          style={{
            display: "block",
            marginTop: "5px",
            textDecoration: "none",
            border: "none",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://wubook.net/imgs/default/booking_by_wu.gif"
            alt="wubook"
            title="Hotel and tourism solutions"
            style={{ border: "none", textDecoration: "none" }}
          />
        </a>
      </div>
    </div>
  );
}

export default Book;
