import React, { useState, useEffect } from "react";
import axios from "axios";

const Wubook = ({ isOpen, onClose }) => {
  const [textareaValue, setTextareaValue] = useState("");
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/aparts/roomType"
        );
        console.log();
        const filteredData = response.data.data.map((item) => ({
          name: item.name,
          id_room_type: item.id_room_type,
        }));
        setTextareaValue(JSON.stringify(filteredData, null, 2));
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchRoomData();
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto mt-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
          <div className="bg-gray-50 px-4 py-3">
            <div className="h-[500px] w-[500px]">
              {" "}
              <div>
                <textarea className="w-[400px] h-[400px]" value={textareaValue} readOnly={true} />
              </div>
            </div>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wubook;
