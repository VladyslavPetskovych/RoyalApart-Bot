/* eslint-disable react/prop-types */
import { useState } from "react";
import edit from "../assets/4226577.png";
import del from "../assets/del.png";
import axios from "axios";

function SingleRoom({ room, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [editedRoomData, setEditedRoomData] = useState({
    name: room.name,
    price: room.price,
    description: room.description,
    numrooms: room.numrooms,
    category: room.category,
    wubid: room.wubid,
    floor: room.floor,
    beds: room.beds,
    guests: room.guests,
    surface: room.surface,
    imgurl: room.imgurl,
  });
  const [formData, setFormData] = useState({
    name: room.name,
    price: room.price,
    numrooms: room.numrooms,
    floor: room.floor,
    guests: room.guests,
    surface: room.surface,
    beds: room.beds,
    imgurl: room.imgurl,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("New value for", name, ":", value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("New edited room data for", name, ":", value);

    if (event.target.id === "image-input") {
      const file = event.target.files[0];
      const fileName = file.name;
      setFileData(file);
      setEditedRoomData((prevEditedRoomData) => ({
        ...prevEditedRoomData,
        imgurl: [fileName],
      }));
    } else {
      setEditedRoomData((prevEditedRoomData) => ({
        ...prevEditedRoomData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", editedRoomData.name);
    formData.append("price", editedRoomData.price);
    formData.append("numrooms", editedRoomData.numrooms);
    formData.append("floor", editedRoomData.floor);
    formData.append("guests", editedRoomData.guests);
    formData.append("surface", editedRoomData.surface);
    formData.append("beds", editedRoomData.beds);
    formData.append("imgurl", editedRoomData.imgurl[0]);
    formData.append("file", fileData);

    axios
      .put(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/aparts/${room._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Data successfully sent to the backend:", response.data);
        alert("Зміни внесено!!!");
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
        alert("Помилка при відправленні даних на сервер. Спробуйте ще раз.");
      });
  };
  const deleteRoom = async () => {
    try {
      if (confirm("Ви впевнені що хочете видалити цю квартиру??")) {
        axios.delete(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/aparts/${room._id}`).then(() => {
          onDelete(room._id);
        });
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      // Handle error (display error message, retry logic, etc.)
    }
  };

  return (
    <div className="bg-gray-300 h-[700px] m-2 p-1 rounded-lg text-lg  max-w-96 ">
      <div className="w-full flex justify-between  bg-blue-500">
        <button className="" onClick={deleteRoom}>
          <img
            src={del}
            className="object-cover h-11 bg-white rounded-full w-11  ml-2"
            alt=""
          />
        </button>
        <button className="" onClick={openModal}>
          <img
            src={edit}
            className="object-cover h-20 w-20 rounded-bl-lg"
            alt=""
          />
        </button>
      </div>

      <img
        className="object-cover h-96 w-96"
        src={`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/imgs/${room.imgurl[0]}`}
        alt=""
      />

      <div className="">
        <p className="font-semibold">{formData.name}</p>
        <p>Ціна: {formData.price} грн</p>
        <p>Кількість кімнат: {formData.numrooms}</p>
        <p>Поверх: {formData.floor}</p>
        <p>Кількість гостей: {formData.guests}</p>
        <p>Площа: {formData.surface} м2</p>
        <p>Кількість ліжок: {formData.beds}</p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 rounded-lg flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white rounded-lg text-xl z-50 flex flex-col h-screen md:h-[95%] w-[95%]">
            <div className="flex p-6 flex-row rounded-lg justify-between bg-slate-400">
              <h2 className="text-xl font-bold">Змінити дані про квартиру</h2>

              <button
                className="bg-red-500 border h-12 w-40    hover:text-gray-700 focus:outline-none"
                onClick={closeModal}
              >
                Вийти 🗙
              </button>
            </div>
            <div className="p-6 flex flex-col xl:w-[35%] lg:w-[70%] w-[95%] md:w-[85%] text-xl font-bold ">
              <div className="flex justify-between m-2">
                <label>Назва квартири:</label>
                <input
                  className="bg-slate-200 "
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between m-2 bg-slate-200">
                <label>Ціна: </label>
                <input
                  className="bg-slate-200 "
                  type="number"
                  name="price"
                  value={editedRoomData.price || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between m-2">
                <label>Опис: </label>
                <textarea
                  className="bg-slate-200  w-[800px] h-[150px]"
                  name="description"
                  value={editedRoomData.description || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between m-2">
                <label>Кількість кімнат: </label>
                <input
                  className="bg-slate-200 "
                  type="number"
                  name="numrooms"
                  value={editedRoomData.numrooms || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between m-2 bg-slate-200">
                <label>Категорія: </label>
                <select
                  className="bg-slate-200 "
                  type="text"
                  name="category"
                  value={editedRoomData.category || ""}
                  onChange={handleInputChange}
                >
                  <option value="romantic">romantic</option>
                  <option value="family">family</option>
                  <option value="business">business</option>
                </select>
                <input />
              </div>
              <div className="flex justify-between m-2">
                <label>WUBOOK ID: </label>
                <input
                  className="bg-slate-200 "
                  type="number"
                  name="wubid"
                  value={editedRoomData.wubid || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between m-2">
                <label>Поверх: </label>
                <input
                  className="bg-slate-200 "
                  type="number"
                  name="floor"
                  value={editedRoomData.floor || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between m-2">
                <label>Кількість ліжок: </label>
                <input
                  className="bg-slate-200 "
                  type="number"
                  name="beds"
                  value={editedRoomData.beds || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between m-2">
                <label>Кількість гостей: </label>
                <input
                  className="bg-slate-200 "
                  type="number"
                  name="guests"
                  value={editedRoomData.guests || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between m-2">
                <label>Площа м2: </label>
                <input
                  className="bg-slate-200 "
                  type="number"
                  name="surface"
                  value={editedRoomData.surface || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex  m-2">
              <label>Завантажити фото: </label>
              {editedRoomData.imgurl[0] && (
                <img
                  src={`http://localhost:3000/imgs/${editedRoomData.imgurl[0]}`}
                  alt=""
                  className="w-32 h-32 object-cover"
                />
              )}
              <input
                className="bg-slate-200 "
                type="file"
                id="image-input"
                name="imgurl"
                onChange={handleInputChange}
              />
            </div>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
              onClick={() => handleSubmit(room)}
            >
              Submit Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleRoom;
