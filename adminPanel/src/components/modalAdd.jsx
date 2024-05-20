/* eslint-disable react/prop-types */

import AddNewRoom from "./addNewRoom";
// Modal.js
const Modal = ({ isOpen, onClose, children }) => {
  const overlayStyle = isOpen ? "fixed inset-0 overflow-y-auto" : "hidden";
  const modalStyle = isOpen ? "fixed inset-0 bg-black opacity-75" : "hidden";
  const contentStyle = isOpen
    ? "relative z-50 bg-slate-200 p-8 w-[90%] h-[970px] mx-auto"
    : "hidden";

  return (
    <>
      <div className={overlayStyle}>
        <div className="flex items-center justify-center min-h-screen mt-5">
          <div className={modalStyle}></div>
          <div className={contentStyle}>
            <div className="flex flex-col h-96 ">
              <div className="flex flex-row h-16 items-center  justify-between">
                <p>Додати нову квартиру</p>
                <button
                  className="bg-red-500 border h-12 w-40 text-lg  m-10 hover:text-gray-700 focus:outline-none"
                  onClick={onClose}
                >
                  Вийти 🗙
                </button>
              </div>

              <AddNewRoom />
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
