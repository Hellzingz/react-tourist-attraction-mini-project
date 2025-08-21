import React, { useEffect, useState } from "react";
import {DebounceInput} from 'react-debounce-input';
import { BeatLoader } from "react-spinners";
import { FaLink } from "react-icons/fa6";
import axios from "axios";

function TouristAttraction() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");

  const isLoading = status === "Loading";
  const isError = status === "Error";
  const isCompleted = status === "Completed";

  const getData = async () => {
    try {
      setStatus("Loading");
      const { data } = await axios.get(
        `http://localhost:4001/trips?keywords=${query}`
      );
      setData(data.data);
      setStatus("Completed");
      console.log(data.data);
      
    } catch (err) {
      setStatus("Error");
      console.log(err);
    }
  };  

  useEffect(() => {
    getData();
  }, [query]);

  function handleTagClick(tag) {            //ทำให้Inputไม่ซ้ำได้ Stateอัพเดท แต่ผลลัพธ์ไม่ออกเพราะไม่Rerenderตามที่ต้องการ เลยให้Aiช่วย
    setQuery((prevQuery) => {
      const trimmedPrev = prevQuery.trim();
      if (!trimmedPrev.split(" ").includes(tag)) {
        return trimmedPrev ? `${trimmedPrev} ${tag}` : tag;
      }
      return prevQuery;
    });
  }

  return (
    <div className="container mx-auto flex gap-2 flex-col px-5 py-2">
      <h1 className="text-4xl font-bold text-center text-sky-500">
        เที่ยวไหนดี
      </h1>
      <p className="font-semibold">ค้นหาที่เที่ยว</p>
      <DebounceInput
        type="text"
        minLength={2}
        debounceTimeout={200}
        placeholder="หาที่เที่ยวแล้วไปกัน..."
        value={query}
        className="text-center border-b border-gray-400 w-[90%] mx-auto focus:outline-none focus:border-b-2 focus:border-black"
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && (
        <div className="flex justify-center mt-20">
          <BeatLoader color="skyblue" />
        </div>
      )}
      {isError && (
        <div className="flex justify-center mt-20">
          <h1 className="text-red-600 text-2xl">
            เกิดข้อผิดพลาดในการโหลดข้อมูล
          </h1>
        </div>
      )}
      {isCompleted &&
        data.map((location) => (
          <div
            key={location.eid}
            className="flex flex-col items-center sm:flex-row mt-2 gap-2 sm:mt-5 relative shadow-md p-4 rounded-2xl"
          >
            <div>
              <img
                src={location.photos[0]}
                alt="รูปประกอบสถานที่ท่องเที่ยว"
                className="rounded-xl h-54 w-84"
              />
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-[70%] ml-5">
              <p className="font-semibold text-2xl">{location.title}</p>
              <p className="line-clamp-1">
                {location.description.length > 100
                  ? location.description.slice(0, 100) + "..."
                  : location.description}
              </p>
              <p className="text-sky-400 underline cursor-pointer">
                <a href={location.url} target="_blank" rel="noopener noreferrer">
                  อ่านต่อ
                </a>
              </p>
              <div className="hidden sm:flex gap-2">
                <p className="font-semibold">หมวด :</p>
                {location.tags.map((tag) => (
                  <button
                    key={tag}
                    value={tag}
                    className="underline hover:text-sky-400 cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="hidden sm:flex gap-2 mt-5">
                {location.photos.slice(1).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    width={100}
                    alt="รูปประกอบสถานที่ท่องเที่ยว"
                    className="rounded-sm"
                  />
                ))}
              </div>
            </div>
            <div className="hidden md:block absolute right-10 bottom-5">
              <FaLink
                onClick={() => navigator.clipboard.writeText(`${location.url}`)}
                color="skyblue"
                size={25}
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default TouristAttraction;
