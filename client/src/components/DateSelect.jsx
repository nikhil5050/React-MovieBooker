import React, { useState } from "react"; // Added useState import
import BlurCircle from "../components/blurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate(); // Moved useNavigate to top level

  const onBookHandler = () => {
    if (!selected) {
      return toast.error("Please select a date"); // Improved toast
    }
    navigate(`/movies/${id}/${selected}`);
    window.scrollTo(0, 0); // Added window prefix
  };

  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
        <BlurCircle top="100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} className="cursor-pointer" />
            <span className="grid grid-cols-4 gap-2">
              {Object.keys(dateTime).map((date, index) => (
                <button
                  key={`${date}-${index}`}
                  onClick={() => setSelected(date)}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer hover:bg-primary/20 transition-colors border ${
                    selected === date 
                      ? "bg-primary text-white border-primary" 
                      : "border-primary/70"
                  }`}
                  aria-label={`Select date ${new Date(date).toLocaleDateString()}`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} className="cursor-pointer" />
          </div>
        </div>
        <button
          onClick={onBookHandler}
          className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;