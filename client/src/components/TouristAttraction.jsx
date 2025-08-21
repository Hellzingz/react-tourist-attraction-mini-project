import React, { useEffect, useState } from "react";
import {DebounceInput} from 'react-debounce-input';
import { BeatLoader } from "react-spinners";
import axios from "axios";
import TouristCard from "./TourisrCard";

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
      <TouristCard
      key={location.eid}
      location={location}
      handleTagClick={handleTagClick}
      />
      ))}
    </div>
  );
}

export default TouristAttraction;
