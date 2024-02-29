import React from "react";
import useCountdown from "@/hooks/useCountdown";
import Timer from "./Timer";

const Holiday = ({ holiday, index }) => {
  const holidayDateISO = new Date(holiday[index]?.date.iso);
  const today = new Date();
  const { days, hours, minutes, seconds } = useCountdown(today, holidayDateISO);

  const dateofHoliday = () => {
    const holidayDate = {
      year: holidayDateISO.getFullYear(),
      month: holidayDateISO.toLocaleString("default", {
        month: "long",
      }),
      day: holidayDateISO.getDate(),
    };

    return `${holidayDate?.year} ${holidayDate?.month} ${holidayDate?.day}`;
  };

  const isToday = () => {
    return today.toDateString() === holidayDateISO.toDateString()
      ? true
      : false;
  };

  return (
    <section className='text-4xl flex flex-grow items-center justify-center'>
      <div className='flex flex-col space-y-8 justify-center items-center'>
        <h2 className='text-center text-white'>
          {isToday() ? `Today is` : `Next Holiday`}
        </h2>
        <h1 className='text-center text-6xl text-white'>
          {holiday[index]?.name}
        </h1>
        <h3 className='text-center text-white'>{dateofHoliday()}</h3>
        {!isToday() && <Timer time={{ days, hours, minutes, seconds }} />}
      </div>
    </section>
  );
};

export default Holiday;
