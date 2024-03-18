import Header from "./components/header";
import fon from "./assets/fon.jpg";
import Footer from "./components/footer";
import React, { useEffect } from "react";
function App() {
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
    <>
      <Header></Header>
      <div
        className=" relative  h-screen overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center"
        style={{ backgroundImage: `url(${fon})` }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-white">
              <div className="h-[400px] w-screen bg-gradient-to-r from-slate-900 flex justify-center items-center flex-col to-slate-600 text-5xl font-mono">
                <h2 className="mb-4  font-semibold">КВАРТИРИ ПОДОБОВО ЛЬВІВ</h2>
                <h4 className="mb-6 text-3xl font-semibold ">
                  Великий вибір житла за доступними цінами
                </h4>
                <button className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden  font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Забронювати
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[700px] bg-gradient-to-r from-slate-900 flex justify-center items-center flex-col to-slate-600">
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
      <Footer></Footer>
    </>
  );
}

export default App;
