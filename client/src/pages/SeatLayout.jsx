import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { isoTimeFormate } from "../lib/isoTimeFormate";
import BlurCircle from "../components/blurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const getShow = async () => {
    const movieShow = dummyShowsData.find((show) => show.id === id);
    if (movieShow) {
      setShow({
        movie: movieShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can select only 5 seats");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex items-center gap-3">
      <span className="w-4">{row}</span>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 text-xs ${
                selectedSeats.includes(seatId)
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    getShow();
  }, [id]);

  if (!show) return <Loading />;

  const availableTimes = show.dateTime[date] || [];

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-16 lg:px-24 xl:px-40 py-10 gap-6 mt-10">
      {/* === Left Column: Available Timings === */}
      <div className="md:w-1/4 w-full bg-primary/10 border border-primary/20 rounded-lg py-6 h-max md:sticky md:top-24">
        <p className="text-lg font-semibold px-6 mb-4">Available Timings</p>
        <div className="space-y-1">
          {availableTimes.map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormate(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === Right Column: Seat Layout === */}
      <div className="md:w-3/4 w-full relative  p-6  mt-10">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="-100px" />
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Select Your Seat
        </h1>
        <img src={assets.screenImage} alt="screen" className="mx-auto mb-2" />
        <p className="text-center text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        {/* Selected seat info */}
        <p className="text-sm text-center mb-4 ">
          Selected Seats: {selectedSeats.join(", ") || "None"}
        </p>

        <div className="flex flex-col items-center mt-10 gap-4 text-sm ">
          {/* First group: A & B in 1 column */}
          <div className="flex flex-col gap-2">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          {/* Remaining rows in two columns */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 w-full">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx} className="flex flex-col gap-2 items-center">
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>
        <button onClick={()=> navigate('/my-bookings')} className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
