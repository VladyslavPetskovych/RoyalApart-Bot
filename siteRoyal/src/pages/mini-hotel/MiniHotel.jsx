import React, { useEffect } from "react";
import k23 from "../../assets/miniHotel/K23.jpg";
import k24 from "../../assets/miniHotel/K24.jpg";
import k25 from "../../assets/miniHotel/K25.jpg";
import k26 from "../../assets/miniHotel/K26.jpg";
import k27 from "../../assets/miniHotel/K27.jpg";
import k28 from "../../assets/miniHotel/K28.jpg";
import k29 from "../../assets/miniHotel/K29.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

const MiniHotel = () => {
  useEffect(() => {
    AOS.init({ duration: 700 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-full w-full overflow-x-hidden">
      <div className="bg-shit2 h-24 "></div>
      <div>
        <p className="text-2xl md:text-4xl lg:text-4xl font-oswald  m-5">
          Найкраще співвідношення ціни і якості у нашому міні-готелі.
        </p>
        <div>
          <p className="w-full mb-9 text-left text-lg p-5">
            Пропонуємо вашій увазі групу смарт-апартаментів у центрі Львова по
            вул Ковжуна. У апартаментах одна спальня, яка розташована на другому
            рівні, а також розкладний диван. Ця квартирb розрахована до 4-ох
            осіб. На вихідні ціна змінюється! У ванній кімнаті нова сантехніка
            преміум класу. Душ, умивальник. У квартирі індивідуальне опалення,
            цілодобово гаряча і холодна вода. В наявності фен, праска. У
            квартирі працює Wi-Fi. Постільна білизна, рушники, засоби гігієни
            входять у вартість проживання.
          </p>
        </div>
      </div>

      <div className="bg-back h-[450vh] text-black">
        <div className="grid grid-cols-2 grid-rows-7 gap-0 h-full">
          <div className="bg-red-400">
            <img className="object-cover h-full w-full" src={k28} alt="" />
          </div>
          <div className="bg-back m-auto">
            <p className="font-oswald text-3xl " data-aos="fade-left">
              Ковжуна 2/8
            </p>
          </div>
          <div className="bg-back m-auto">
            <p className="font-oswald text-3xl " data-aos="fade-right">
              Ковжуна 2/9
            </p>
          </div>
          <div className="bg-red-400">
            <img className="object-cover h-full w-full" src={k29} alt="" />
          </div>
          <div className="bg-red-400">
            <img className="object-cover h-full w-full" src={k27} alt="" />
          </div>
          <div className="bg-back m-auto">
            <p className="font-oswald text-3xl " data-aos="fade-left">
              Ковжуна 2/7
            </p>
          </div>
          <div className="bg-back m-auto">
            <p className="font-oswald text-3xl " data-aos="fade-right">
              Ковжуна 2/6
            </p>
          </div>
          <div className="bg-red-400">
            <img className="object-cover h-full w-full" src={k26} alt="" />
          </div>
          <div className="bg-red-400">
            <img className="object-cover h-full w-full" src={k25} alt="" />
          </div>
          <div className="bg-back m-auto">
            <p className="font-oswald text-3xl " data-aos="fade-left">
              Ковжуна 2/5
            </p>
          </div>
          <div className="bg-back m-auto">
            <p className="font-oswald text-3xl " data-aos="fade-right">
              Ковжуна 2/4
            </p>
          </div>
          <div className="bg-red-400">
            <img className="object-cover h-full w-full" src={k24} alt="" />
          </div>
          <div className="bg-red-400">
            <img className="object-cover h-full w-full" src={k23} alt="" />
          </div>
          <div className="bg-back m-auto">
            <p className="font-oswald text-3xl " data-aos="fade-left">
              Ковжуна 2/3
            </p>
          </div>
        </div>
      </div>
      <div className="z-50 fixed bottom-24 right-8 opacity-70 hover:opacity-100 w-48">
        <button className="h-10 bg-gradient-to-br from-amber-600 to-amber-400 rounded-md w-full hover:shadow-lg shadow-md shadow-orange-500/90 hover:shadow-orange-500/90">
          <a href="https://wubook.net/nneb/mprop?f=today&n=1&ep=95d630b4&w_id=6782">
            Забронювати
          </a>
        </button>
      </div>
    </div>
  );
};

export default MiniHotel;
