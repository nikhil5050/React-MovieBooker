import React from "react";
import ReactPlayer from "react-player";
import { useState } from "react";
import BlurCircle from "./blurCircle";
import { dummyTrailers } from "../assets/assets";
import { PlayCircleIcon } from "lucide-react";

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  
  return (
    <div className="p-6 flex flex-col items-center">
      <p>Trailers</p>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />
        <ReactPlayer
            
          url={currentTrailer.videoUrl}
          controls={true}
          className="max-auto max-w-full"
          width="960px"
          height="400px"
           
        />
      </div>

      <div className="group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div 
            key={trailer.image} 
            className="relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer" 
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="w-full h-full object-cover cursor-pointer border-2 rounded-lg "
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-5 md-w-12 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;