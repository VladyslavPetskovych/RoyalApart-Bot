import { useState } from "react";
import axios from "axios";

export default function FormComponent() {
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [address, setAdress] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("romantic");
  const [roomcount, setRoomcount] = useState(1);
  const [price, setPrice] = useState(2000);
  const [beds, setBeds] = useState(2);
  const [guests, setGuests] = useState(4);
  const [floor, setFloor] = useState(4);
  const [square, setSquare] = useState(50);
  const [wubid, setWubid] = useState(50);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("address", address);
    formData.append("body", body);
    formData.append("category", category);
    formData.append("roomcount", roomcount);
    formData.append("price", price);
    formData.append("beds", beds);
    formData.append("guests", guests);
    formData.append("square", square);
    formData.append("floor", floor);
    formData.append("wubid", wubid);
    try {
      const response = await axios.post(
        "http://localhost:3000/aparts/newRoom",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Квартира додана!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  return (
    <form className="flex flex-row" onSubmit={handleSubmit}>
      <div className=" flex flex-col w-[60%] bg-slate-400 p-3">
        <div className="flex flex-row mt-2">
          <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
            Адреса
          </label>
          <input
            type="text"
            value={address}
            required
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>
        <div className="flex flex-row mt-2">
          <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
            Опис
          </label>
          <textarea
            value={body}
            required
            onChange={(e) => setBody(e.target.value)}
            className="h-[200px] w-[300px]  rounded-md resize-none"
          ></textarea>
        </div>
        <div className="flex flex-row mt-2">
          <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
            Кількість кімнат
          </label>
          <input type="number" onChange={(e) => setRoomcount(e.target.value)} />
        </div>
        <div className="flex flex-row mt-2">
          <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
            Категорія
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=" px-4 py-2 border rounded-md"
          >
            <option value="romantic">romantic</option>
            <option value="family">family</option>
            <option value="business">business</option>
          </select>
        </div>
        <div className="flex flex-row mt-2 ">
          <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
            Ціна
          </label>
          <input type="number" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="flex flex-row mt-2">
          <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
            Поверх
          </label>
          <input type="number" onChange={(e) => setFloor(e.target.value)} />
        </div>
        <div className="flex flex-row mt-2">
          <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
            Кількість ліжок
          </label>
          <input type="number" onChange={(e) => setBeds(e.target.value)} />
        </div>
        <div className="flex flex-row mt-2">
          <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
            Кількість гостей
          </label>
          <input type="number" onChange={(e) => setGuests(e.target.value)} />
        </div>
        <div className="flex flex-row mt-2">
          <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
            площа
          </label>
          <input type="number" onChange={(e) => setSquare(e.target.value)} />
        </div>
        <div className="flex flex-row mt-2">
          <label className="block mb-2 text-sm font-medium w-[150px] text-gray-900 mr-3">
            wuBook id
          </label>
          <input type="number" onChange={(e) => setWubid(e.target.value)} />
        </div>
        <div className="bg-slate-300">
          <p>Вписані дані</p>
          <p>{address}</p>
          <p>{body}</p>
          <p>{category}</p>
          <p>{roomcount}</p>
          <p>{price}</p>
          <p>{beds}</p>
          <p>{guests}</p>
          <p>{square}</p>
        </div>
      </div>
      <div className="bg-slate-600 w-[30%] flex-row text-white p-3">
        <h3 className="mb-5">
          Назвіть файл англійською - наприклад (leontov5.jpg)
        </h3>
        <p>Завантажити фото</p>
        <input type="file" onChange={handleImage} />
        <div className="w-80 h-60">
          {image && (
            <img
              src={image}
              alt="Uploaded"
              className="  object-cover max-w-full max-h-full"
            />
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Записати Квартиру!
        </button>
      </div>
    </form>
  );
}
