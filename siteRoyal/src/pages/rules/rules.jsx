import React, { useState } from "react";

function Dropdown({ title, children, index, openIndex, setOpenIndex }) {
  const isOpen = index === openIndex;

  const handleClick = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <div className="w-[90%]  m-2 mx-10 flex flex-col items-start justify-start">
      <button
        onClick={handleClick}
        className="hover:bg-shit hover:bg-opacity-60 flex flex-row items-center justify-center text-black font-bold py-2 px-4 rounded m-2"
      >
        <p className="text-shit text-3xl px-2 -mt-1">{isOpen ? "‒" : "+"}</p>
        {title}
      </button>
      <div
        className={`overflow-hidden transition-all text-left ${
          isOpen ? "max-h-96 my-2  text-shit font-semibold" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Rules() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="pt-28 flex flex-col items-start justify-start">
      <p className="text-3xl font-bold font-oswald p-1 md:ml-28 md:m-5 text-back">
        Деталі бронювання FAQ
      </p>
      <div className="bg-back">
        <Dropdown
          title="Коли заселення, виселення?"
          index={0}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        >
          <ul className="p-4">
            <li>• Заїзд з 15.00</li>
            <li>• Виїзд до 11.00</li>
            <li>
              • За день до Вашого заїзду з Вами зв'яжеться наш адміністратор і
              домовиться про поселення.
            </li>
          </ul>
        </Dropdown>
        <Dropdown
          title="Як я отримаю ключі?"
          index={1}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        >
          <ul className="p-4">
            <li>
            • Наш адміністратор зустріне Вас за адресою, та проведе до
              апартаментів.
            </li>
          </ul>
        </Dropdown>
        <Dropdown
          title="Як отримати підтвердження бронювання?"
          index={3}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        >
          <ul className="p-4">
            <li>
            • Наші менеджери зв’яжуться з Вами, як тільки отримають лист з Вашим
              бронюванням, або Вам потрібно самостійно зв’язатись з Нами. Якщо
              Ви не гарантуєте своє бронювання кредитною картою, ми зв’яжемось з
              Вами для уточнення способу Внесення передоплати.
            </li>
          </ul>
        </Dropdown>
        <Dropdown
          title="Чи потрібно вносити передплату?"
          index={4}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        >
          <ul className="p-4">
            <li>
            • Так,вам потрібно внести передоплату за першу добу. Ви можете
              внести передоплату вказавши кредитну карту у бронюванні,
              переказати на корпоративну карту компанії, чи оплатити готівкою у
              нашому офісі вул.Весела 5. м.Львів – на Google карти.
            </li>
          </ul>
        </Dropdown>
        <Dropdown
          title="Які правила скасування?"
          index={5}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        >
          <ul className="p-4">
            <li>
            • Гість може скасувати за 30 днів до заїзду безкоштовно. Після
              закінчення терміну безкоштовного скасування передоплата не
              повертається.
            </li>
          </ul>
        </Dropdown>
        <Dropdown
          title="Що таке страховий депозит?"
          index={6}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        >
          <ul className="p-4">
            <li>
            • Гість може скасувати за 30 днів до заїзду безкоштовно. Після
              закінчення терміну безкоштовного скасування передоплата не
              повертається.
            </li>
          </ul>
        </Dropdown>
        <Dropdown
          title="Що включено у вартість проживання?"
          index={7}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        >
          <ul className="p-4 text-left">
            <li>– Wi-fi</li>
            <li>– холодильник</li>
            <li>– прасувальні засоби</li>
            <li>– індивідуальне опалення</li>
            <li>– засоби гігієни</li>
            <li>– постільна білизна</li>
            <li>– рушники</li>
            <li>– душ</li>
            <li>– зона кухні</li>
            <li>– гаряча вода</li>
            <li>– телевізор</li>
            <li>– цілодобова технічна підтримка</li>
            <li>– всі податки і збори.</li>
          </ul>
        </Dropdown>
        <Dropdown
          title="Які ще послуги я можу отримати додатково?( За домовленістю) за додаткову плату"
          index={8}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        >
          <ul className="p-4">
            <li>– додаткове прибирання</li>
            <li>– трансфер</li>
            <li>– додаткова постіль та рушники.</li>
          </ul>
        </Dropdown>
        <Dropdown
          title="методи оплати"
          index={9}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        >
          <ul className="p-4">
            <li>Оплата може здійснюватись</li>
            <li>– кредитною картою( в офісі)</li>
            <li>– готівкою</li>
            <li>– переказом на карту</li>
            <li>– по- перерахунку</li>
            <li>– міжнародними переказами.</li>
          </ul>
        </Dropdown>
      </div>

      <p className="text-3xl font-bold font-oswald p-5">Адреса офісу</p>
      <div className="w-screen flex justify-center items-center py-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d340.7203155078027!2d24.026883168975875!3d49.846646527820226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add0ccfd9e63f%3A0xc15e4a8be7be479c!2sVesela%20St%2C%205%2C%20L&#39;viv%2C%20L&#39;vivs&#39;ka%20oblast%2C%2079000!5e0!3m2!1sen!2sua!4v1714400834628!5m2!1sen!2sua"
          className="w-[90vw]"
          height="450"
          style={{ border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Rules;
