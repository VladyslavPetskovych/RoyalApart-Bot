import React, { useState, useEffect } from "react";
import Modal from "./saleModal"; // Import the Modal component
import axios from "axios";

function SaleButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSales, setHasSales] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesResponse = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/sales/all"
        );
        if (salesResponse.data.length > 0) {
          setHasSales(true);
        }
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  useEffect(() => {
    const chance = Math.random();
    if (chance < 0.5 && hasSales) {
      setIsOpen(true);
    }
  }, [hasSales]);

  return (
    <div>
      {hasSales && !isOpen && (
        <button
          className="h-16 w-[120px] fixed right-0 bottom-0 z-30 m-3 md:m-12 bg-black opacity-50 hover:bg-red-500 hover:opacity-80"
          onClick={toggleModal}
        >
          <p className="font-roboto shadow-lg shadow-orange-500/50">
            Спеціальні пропозиції🎁
          </p>
        </button>
      )}

      {isOpen && <Modal toggleModal={toggleModal} />}
    </div>
  );
}

export default SaleButton;
