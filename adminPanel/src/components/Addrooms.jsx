// AddRoom.js

import { useState } from "react";
import Modal from "./modalAdd";

const AddRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-200 m-2 p-1 h-[600px] w-[320px] rounded-lg flex justify-center items-center">
      <button className="text-9xl font-semibold" onClick={openModal}>
        ➕
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
    </div>
  );
};

export default AddRoom;
