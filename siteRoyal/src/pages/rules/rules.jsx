import React, { useState } from 'react';

function Dropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[50%] m-2 mx-10 flex flex-col items-start justify-start">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        {title}
      </button>
      <div
        className={`overflow-hidden transition-all ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Rules() {
  return (
    <div className="pt-36 flex flex-col items-start justify-start">
      <p className='text-xl mx-10'>Деталі бронювання FAQ</p>
      <Dropdown title="Коли заселення, виселення?">
        <ul className="p-4">
          <li>Заїзд з 15.00</li>
          <li>Виїзд до 11.00</li>
          <li>
            За день до Вашого заїзду з Вами зв'яжеться наш адміністратор і
            домовиться про поселення.
          </li>
        </ul>
      </Dropdown>
      <Dropdown title="Як я отримаю ключі?">
        <ul className="p-4">
          <li>Наш адміністратор зустріне Вас за адресою, та проведе до апартаментів.</li>
        </ul>
      </Dropdown>
      <Dropdown title="Як отримати підтвердження бронювання?">
        <ul className="p-4">
          <li>Наші менеджери зв’яжуться з Вами, як тільки отримають лист з Вашим бронюванням, або Вам потрібно самостійно зв’язатись з Нами.
Якщо Ви не гарантуєте своє бронювання кредитною картою, ми зв’яжемось з Вами для уточнення способу Внесення передоплати.</li>
        </ul>
      </Dropdown>
      <Dropdown title="Чи потрібно вносити передплату?">
        <ul className="p-4">
          <li>Так,вам потрібно внести передоплату за першу добу. Ви можете внести передоплату вказавши кредитну карту у бронюванні, переказати на корпоративну карту компанії, чи оплатити готівкою у нашому офісі вул.Весела 5. м.Львів – на Google карти.</li>
        </ul>
      </Dropdown>
      <Dropdown title="Які правила скасування?">
        <ul className="p-4">
          <li>Гість може скасувати за 30 днів до заїзду безкоштовно. Після закінчення терміну безкоштовного скасування передоплата не повертається.</li>
        </ul>
      </Dropdown>
      <Dropdown title="Що таке страховий депозит?">
        <ul className="p-4">
          <li>Гість може скасувати за 30 днів до заїзду безкоштовно. Після закінчення терміну безкоштовного скасування передоплата не повертається.</li>
        </ul>
      </Dropdown>
    </div>
  );
}

export default Rules;
