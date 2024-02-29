"use client";
import { useState, useEffect } from "react";
import { COUNTRIES } from "@/constant/countrycodes";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import icon from "../../public/images/icon.jpg";

const Header = () => {
  const [country, setCountry] = useState();
  const [location, setLocation] = useLocalStorage();

  useEffect(() => {
    const getClientDetails = async () => {
      const response = await fetch("/api/ipapi").then((res) => res.json());
      const clientCountry = response.countryCode;

      setStorageCountry(clientCountry);
      setCountry(clientCountry);
    };

    const localStoragecountry = localStorage.getItem("location");
    if (!localStoragecountry) {
      getClientDetails();
    } else {
      setCountry(location);
    }
  }, []);

  const setStorageCountry = (newcountry) => {
    setLocation(newcountry);
  };

  const changelocation = (newcountry) => {
    setStorageCountry(newcountry);
    setCountry(newcountry);
  };

  return (
    <header className='p-4 bg-blue-500 rounded-b-lg text-white'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-row text-center items-center'>
          <Image
            src={icon}
            alt='icon'
            width={50}
            height={50}
            className='rounded-xl m-2'
          />
          <h2 className='text-3xl'>Holiday Countdown</h2>
        </div>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn m-1 text-white'>
            {location ? location : country}
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 h-96 flex-nowrap overflow-y-scroll'>
            {COUNTRIES.map((country) => {
              return (
                <li key={country.code}>
                  <a onClick={() => changelocation(country.code)}>
                    {country.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
