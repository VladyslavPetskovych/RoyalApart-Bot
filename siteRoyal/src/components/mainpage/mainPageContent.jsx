import React from "react";

function mainPageContent() {
  return (
    <div
      className="z-1  h-full w-screen overflow-hidden bg-fixed   "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6" }}
    >
      <div className="flex h-full font-serif">
        <div className="text-textW">
          <div className=" w-screen  flex justify-center items-center flex-col  text-5xl ">
            <div>
              <h2 className="mb-4  mt-64 z-5 drop-shadow-lg shadow-blue-500">
                КВАРТИРИ ПОДОБОВО ЛЬВІВ
              </h2>
              <h4 className=" text-3xl  ">
                Великий вибір житла за доступними цінами.
              </h4>
              <h6 className="text-2xl  mt-4 mb-48">
                Нерухомість в центрі Львова
              </h6>
            </div>

            <h2 className="   m-5 text-5xl ">Обрати апартаменти в 2 кліки</h2>
            <div className=" flex flex-row items-center justify-center">
              <div>
                <button className=" inline-flex items-center justify-center p-0 mb-2 me-2 overflow-hidden  shadow-lg shadow-orange-500/50 hover:p-[3px] text-gray-900 rounded-lg  hover:text-black ">
                  <span className=" text-3xl px-6 py-4  text-textW  bg-gradient-to-r to-shit from-shit2 rounded-md  ">
                    ЗАБРОНЮВАТИ
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default mainPageContent;
