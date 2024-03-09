/* eslint-disable react/prop-types */
// Modal.js
const Modal = ({ isOpen, onClose, children }) => {
  const overlayStyle = isOpen ? "fixed inset-0 overflow-y-auto" : "hidden";
  const modalStyle = isOpen ? "fixed inset-0 bg-black opacity-75" : "hidden";
  const contentStyle = isOpen
    ? "relative z-10 bg-slate-200 p-8 w-[70%] h-[700px] mx-auto"
    : "hidden";

  return (
    <>
      <div className={overlayStyle}>
        <div className="flex items-center justify-center min-h-screen ">
          <div className={modalStyle}></div>
          <div className={contentStyle}>
            <div className="flex flex-col h-96 ">
              <div className="flex flex-row h-16 items-center  justify-between">
                <p>Додати нову квартиру</p>
                <button
                  className="bg-red-500 border m-10 hover:text-gray-700 focus:outline-none"
                  onClick={onClose}
                >
                  Вийти 🗙
                </button>
              </div>

              <div className="flex flex-row">
                <form action="" className=" flex flex-col w-[60%] bg-slate-400 p-3">
                  <div className="flex flex-row mt-2">
                    <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
                      Адреса
                    </label>
                    <input type="text" />
                  </div>
                  <div className="flex flex-row mt-2">
                    <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
                      Опис
                    </label>
                    <textarea className="h-[200px] w-[300px]  rounded-md resize-none"></textarea>
                  </div>
                  <div className="flex flex-row mt-2">
                    <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
                      Кількість кімнат
                    </label>
                    <input type="number" />
                  </div>
                  <div className="flex flex-row mt-2">
                    <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
                      Категорія
                    </label>
                    <select className=" px-4 py-2 border rounded-md">
                      <option value="romantic">romantic</option>
                      <option value="family">family</option>
                      <option value="business">business</option>
                    </select>
                  </div>
                  <div className="flex flex-row mt-2 ">
                    <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
                      Ціна
                    </label>
                    <input type="number" />
                  </div>
                  <div className="flex flex-row mt-2">
                    <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
                      Поверх
                    </label>
                    <input type="number" />
                  </div>
                  <div className="flex flex-row mt-2">
                    <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
                      Кількість ліжок
                    </label>
                    <input type="number" />
                  </div>
                  <div className="flex flex-row mt-2">
                    <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
                      Кількість гостей
                    </label>
                    <input type="number" />
                  </div>
                  <div className="flex flex-row mt-2">
                    <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
                      площа
                    </label>
                    <input type="number" />
                  </div>
                  <div className="flex flex-row mt-2">
                    <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
                      wuBook id 
                    </label>
                    <input type="number" />
                  </div>
                </form>
                <div className="bg-slate-500 w-[30%]">
                  <p>Завантажити фото</p>
                </div>
              </div>
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
