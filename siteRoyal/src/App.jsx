import Header from "./components/header";
import fon from "./assets/fon.jpg";
import Footer from "./components/footer";
import Wubook from "./components/wubook";
import React, { useEffect } from "react";
function App() {
  return (
    <>
      <Header></Header>
      <div
        className=" relative  h-screen overflow-hidden  bg-cover bg-no-repeat p-12 text-center"
        style={{ backgroundImage: `url(${fon})` }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-white">
              <div className="h-[400px] w-screen  flex justify-center items-center flex-col  text-5xl font-mono">
                <h2 className="mb-4  font-semibold">КВАРТИРИ ПОДОБОВО ЛЬВІВ</h2>
                <h4 className="mb-6 text-3xl font-semibold ">
                  Великий вибір житла за доступними цінами
                </h4>
                <h2 className="mb-5 mt-5 text-3xl">
                  Оберіть спосіб бронювання
                </h2>
                <div className=" flex flex-row items-center justify-center">
                  <div>
                    <button className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden  font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        телеграм бот
                      </span>
                    </button>
                  </div>

                  <div>
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden  font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Сайт
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[700px] bg-gradient-to-r from-slate-900 flex justify-center items-center flex-col to-slate-600">
        <Wubook />
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
