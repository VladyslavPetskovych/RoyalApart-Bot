import React, { useEffect } from "react";

 function wubook() {
  useEffect(() => {
    // Initialize WuBook object
    var WuBook = new _WuBook(1638349860);
    var wbparams = {
      bgcolor: "#ffffff",
      textcolor: "#2c2c2c",
      buttoncolor: "#108dbd",
      iconcolor: "#888888",
      bordercolor: "#108dbd",
      lang: "",
      failback_lang: "en",
      wbgoogle: 1,
      dcode: 0,
      leisure: 0,
      default_nights: 1,
      dcodeval: "",
    };

    // Call WuBook.design_rwidget() with the specified div id and parameters
    WuBook.design_rwidget("_baror_", wbparams);
  }, []);

  return (
    <div className="w-96">
      wubook
      <div>
        {" "}
        <div id="_baror_">
          <a
            href="https://wubook.net/page/WooDoo-Booking-Engine-35.html"
            target="_blank"
          >
            <img
              src="https://wubook.net/imgs/default/booking_by_wu.gif"
              alt="booking engine for hotel websites by wubook"
              title="Hotel and tourism solutions"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
export default wubook;