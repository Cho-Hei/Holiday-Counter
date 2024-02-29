"use client";
import { useState, useEffect } from "react";
import useHoliday from "../hooks/useHoliday";
import Footer from "./Footer";
import Holiday from "./Holiday";
import styles from "../styles/hero.module.css";

const Hero = () => {
  const { data, isLoading, isError, handleNextData } = useHoliday();
  const [holidays, setHolidays] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (data) {
      if (
        holidays.length === 0 ||
        holidays[0].country.id === data[0].country.id
      ) {
        const filteredHolidays = filterHolidays(data);
        appendHolidays(filteredHolidays);
      } else {
        setIsVisible(false);
        setTimeout(() => {
          const filteredHolidays = filterHolidays(data);
          setCurrentIndex(0);
          setHolidays(filteredHolidays);
        }, 300);
      }
    }
    setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => {
      clearTimeout();
    };
  }, [data]);

  const filterHolidays = (data) => {
    return data.filter((holiday) => {
      const now = new Date();
      const holidayDate = new Date(holiday.date.iso);
      return holidayDate >= now && holiday.type.includes("National holiday");
    });
  };

  const appendHolidays = (newHolidays) => {
    setHolidays((prevHolidays) => [...prevHolidays, ...newHolidays]);
  };

  const nextHoliday = () => {
    if (!isVisible) {
      return;
    }
    setIsVisible(false);

    setTimeout(() => {
      if (currentIndex + 1 > holidays.length - 1 && currentIndex !== 0) {
        handleNextData();
      }
      setCurrentIndex((prevIndex) => prevIndex + 1);

      setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    }, 500);
  };

  const prevHoliday = () => {
    setIsVisible(false);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    });

    setTimeout(() => {
      setIsVisible(true);
    }, 1500);
  };

  // Keyboard navigation (not working properly | for next feature update)
  // const updateIndex = (e) => {
  //   if (e.key === "ArrowLeft") {
  //     prevHoliday();
  //   } else if (e.key === "ArrowRight") {
  //     nextHoliday();
  //   }
  // };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (isVisible) {
  //       setTimeout(() => {
  //         updateIndex(e);
  //       }, 500);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [data, currentIndex, holidays, isVisible]);

  if (isError) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <section className='flex flex-grow flex-col'>
      <div
        className={`flex flex-grow ${
          isVisible ? `${styles.fade_in}` : `${styles.fade_out}`
        } `}>
        <Holiday holiday={holidays} index={currentIndex} />
      </div>
      <Footer
        handlePrevHoliday={prevHoliday}
        handleNextHoliday={nextHoliday}
        currentIndex={currentIndex}
      />
    </section>
  );
};

export default Hero;
