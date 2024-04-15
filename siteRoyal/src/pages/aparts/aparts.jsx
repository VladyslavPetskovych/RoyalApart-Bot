import PickNumRoom from "./pickNumRoom";
import RoomCard from "./roomCard";
import SearchBar from "./searchBar";
import PickCategory from "./pickCategory";
function aparts() {
  return (
    <div className="h-full  text-black bg-black flex flex-col">
      <div className="bg-slate-800 h-24">
      </div>
      <div className="mt-[20px] ">
        <div className="flex flex-col md:flex-row font-oswald items-center my-10">
          <p className="text-white text-2xl mx-5">
            Обери апартаменти для себе.
          </p>
          <SearchBar />
        </div>
        <div className="flex flex-col lg:flex-row p-2">
          <div className="flex flex-col md:flex-row lg:flex-col font-oswald font-bold ">
            <PickNumRoom />
            <PickCategory />
          </div>
          <RoomCard />
        </div>
      </div>
    </div>
  );
}

export default aparts;
