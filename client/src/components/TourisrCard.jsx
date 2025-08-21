import { FaLink } from "react-icons/fa6";

function TouristCard({ location, handleTagClick }) {
    return (
      <div className="flex flex-col items-center sm:flex-row mt-2 gap-2 sm:mt-5 relative shadow-md p-4 rounded-2xl">
        <div>
          <img
            src={location.photos[0]}
            alt={location.title}
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
    );
  }

  export default TouristCard;