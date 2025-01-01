"use client";
import { useState, useEffect } from "react";
import { COUNTRIES } from "@/constant/countrycodes";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import icon from "../../public/images/icon.jpg";

const Header = () => {
    const [country, setCountry] = useState({ country: "", timezone: "" });
    const [location, setLocation] = useLocalStorage();

    useEffect(() => {
        const getClientDetails = async () => {
            const response = await fetch("/api/ipapi").then((res) => res.json());
            const SelectedCountry = response.countryCode;
            const SelectedTime = response.timezone;

            setStorageCountry({ country: SelectedCountry, timezone: SelectedTime });
            setCountry({ country: SelectedCountry, timezone: SelectedTime });
        };

        const localStoragecountry = localStorage.getItem("location");
        if (!localStoragecountry) {
            getClientDetails();
        } else {
            console.log("localStoragecountry", localStoragecountry);
            setCountry({ country: location.SelectedCountry, timezone:location.timezone });
        }
    }, []);

    const setStorageCountry = (newcountry) => {
        setLocation(newcountry);
    };

    const changelocation = (newcountry) => {
        setStorageCountry({ country: newcountry.code, timezone: newcountry.timezones[0] });
        setCountry({ country: newcountry.code, timezone: newcountry.timezones[0] });
    };

    return (
        <header className='p-4 bg-primary rounded-b-lg text-white'>
            <div className='flex justify-center md:justify-between items-center'>
                <div className='hidden md:block'>
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
                </div>
                <div className='dropdown dropdown-end'>
                    <div
                        tabIndex={0}
                        role='button'
                        className='btn m-1 hover:bg-accent-focus bg-accent border-accent text-white'>
                        Country: {location?.country ? location?.country : country.country}
                    </div>
                    <ul
                        tabIndex={0}
                        className='dropdown-content z-[1] menu p-2 shadow bg-accent rounded-box w-52 h-96 flex-nowrap overflow-y-scroll'>
                        {COUNTRIES.map((country) => {
                            return (
                                <li key={country.code}>
                                    <div
                                        role='button'
                                        tabIndex='0'
                                        className='btn bg-accent border-accent hover:bg-accent hover:border-accent'>
                                        <a onClick={() => changelocation(country)}>
                                            {country.name}
                                        </a>
                                    </div>
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
