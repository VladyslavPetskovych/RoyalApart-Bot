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
    <div className="bg-gray-200 m-2 p-1 h-[700px] w-96 rounded-lg flex justify-center items-center">
      <button className="text-9xl font-semibold" onClick={openModal}>
        ➕
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
    </div>
  );
};

export default AddRoom;
