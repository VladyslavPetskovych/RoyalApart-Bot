/* eslint-disable react/prop-types */
import Slider from "./sliderRoom";

function SingleRoom({ room }) {
  return (
    <div className="border-2 border-orange-50 hover:shadow-lg hover:shadow-orange-300/30 m-3 h-[630px] w-[340px] md:h-[340px] md:w-[540px] mb-4 mx-2  text-lg flex md:flex-row flex-col ">
      <Slider room={room} />

      <div className="w-full  md:w-[300px] h-[50%] flex flex-col justify-between items-center p-3">
        <div>
          <p className="font-semibold text-xl font-roboto">{room.name}</p>
          <div className="flex flex-col justify-start text-left font-roboto text-base">
            <div className="flex flex-row  items-center mt-5">
              <p className="mr-1 font-semibold">Ціна: </p>
              <p>{room.price} грн</p>
            </div>
            <div className="flex flex-row  items-center">
              <p className="mr-1 font-semibold">Кількість кімнат: </p>
              <p>{room.numrooms} </p>
            </div>
            <div className="flex flex-row  items-center">
              <p className="mr-1 font-semibold">Поверх: </p>
              <p>{room.floor} </p>
            </div>
            <div className="flex flex-row  items-center">
              <p className="mr-1 font-semibold">Кількість гостей: </p>
              <p>{room.guests} </p>
            </div>
            <div className="flex flex-row  items-center">
              <p className="mr-1 font-semibold">Площа: </p>
              <p>
                {room.surface} m<sup>2</sup>
              </p>
            </div>
            <div className="flex flex-row  items-center">
              <p className="mr-1 font-semibold">Кількість ліжок: </p>
              <p>{room.beds} </p>
            </div>
          </div>
        </div>

        <div className="w-[100%] md:mt-10 font-roboto font-semibold text-lg">
          <button className=" h-10 bg-gradient-to-br from-amber-600 to-amber-400 rounded-md w-[70%] hover:shadow-lg shadow-md shadow-orange-500/90  hover:shadow-orange-500/90">
            Забронювати
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleRoom;
