import React, { useState } from "react";
import axios from "axios";

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-row mx-2 bg-slate-200 p-1">
      <p>{label}: </p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="ml-1 p-1 border rounded w-[110px]"
      />
    </div>
  );
}

function DelSale({ onClick }) {
  return (
    <button onClick={onClick} className="bg-red-400 mx-1 p-1 font-bold text-xl">
      -
    </button>
  );
}

function AddButton({ onClick }) {
  return (
    <button onClick={onClick} className="bg-blue-400 mx-1 p-1 text-xl">
      +
    </button>
  );
}

function SingleSale({ room, sale, fetchRoomsAndSales }) {
  const [discount, setDiscount] = useState(sale ? sale.discount : "");
  const [tillDate, setTillDate] = useState(
    sale ? new Date(sale.tillDate).toISOString().split("T")[0] : ""
  );

  const handleAddSale = async () => {
    try {
      const response = await axios.post("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/sales", {
        roomId: room.wubid, // Send roomId as a number
        discount: parseFloat(discount), // Ensure discount is a number
        tillDate,
      });
      console.log("Sale added:", response.data);
      fetchRoomsAndSales(); // Fetch the updated data
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/sales/${room.wubid}`);
      console.log(response.data);
      fetchRoomsAndSales(); // Fetch the updated data
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  return (
    <li key={room.wubid} className="m-2 flex flex-row justify-between items-center">
      <p>{room.name}</p>
      <Input
        label="знижка %"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />
      <Input
        label="До якої дати"
        type="date"
        value={tillDate}
        onChange={(e) => setTillDate(e.target.value)}
      />
      <AddButton onClick={handleAddSale} />
      <DelSale onClick={handleDelete} />
      {sale && (
        <div className="ml-2 p-2 text-green-500">
          Знижка: {sale.discount}%, до: {new Date(sale.tillDate).toLocaleDateString()}
        </div>
      )}
    </li>
  );
}

export default SingleSale;
