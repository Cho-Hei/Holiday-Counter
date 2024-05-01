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
    <section className='flex flex-grow items-center justify-center'>
      <div className='flex flex-col space-y-8 justify-center items-center text-black font-semibold'>
        <h2 className='text-center lg:text-4xl text-lg'>
          {isToday() ? `Today is` : `Next Holiday`}
        </h2>
        <h1 className='text-center lg:text-6xl text-lg'>
          {holiday[index]?.name}
        </h1>
        <h3 className='text-center lg:text-4xl text-lg'>{dateofHoliday()}</h3>
        {!isToday() && <Timer time={{ days, hours, minutes, seconds }} />}
      </div>
    </section>
  );
};

export default Holiday;
