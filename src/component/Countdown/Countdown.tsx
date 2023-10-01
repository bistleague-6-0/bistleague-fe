import React, { useLayoutEffect, useState, useRef } from "react";
import Semicolon from "../Semicolon/Semicolon";
import css from "../../app/landing.module.css";

const Countdown: React.FC = () => {
  const [timerDays, setTimerDays] = useState<string>("00");
  const [timerHours, setTimerHours] = useState<string>("00");
  const [timerMinutes, setTimerMinutes] = useState<string>("00");
  const [timerSeconds, setTimerSeconds] = useState<string>("00");

  const interval = useRef<NodeJS.Timeout>();

  const getNextTargetDate = (currentDate: Date): Date => {
    console.log(currentDate.getDate());
    if (
      (currentDate.getDate() >= 25 && currentDate.getMonth() >= 8) ||
      (currentDate.getDate() < 2 &&
        currentDate.getMonth() <= 9 &&
        currentDate.getFullYear() <= 2023)
    ) {
      // If current date is on or after 17th September, target 1st October
      console.log("here");
      return new Date("October 2, 2023 00:00:00");
    } else if (
      (currentDate.getDate() < 30 && currentDate.getMonth() <= 9) ||
      (currentDate.getDate() >= 2 &&
        currentDate.getMonth() <= 9 &&
        currentDate.getFullYear() <= 2023)
    ) {
      return new Date("October 30, 2023 00:00:00");
    } else if (
      (currentDate.getDate() < 6 && currentDate.getMonth() <= 10) ||
      (currentDate.getDate() >= 30 &&
        currentDate.getMonth() <= 9 &&
        currentDate.getFullYear() <= 2023)
    ) {
      return new Date("November 6, 2023 00:00:00");
    } else {
      // Otherwise, target 17th September
      return new Date("September 17, 2023 00:00:00");
    }
  };

  const startTimer = () => {
    const targetDate = getNextTargetDate(new Date()).getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString();
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ).toString();
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      ).toString();
      const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString();

      if (distance < 0) {
        // stop timer
        clearInterval(interval.current!);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  // componentDidMount
  useLayoutEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current!);
    };
  }, []);

  return (
    <div className={`${css.countdownSection}`}>
      <div className={`${css.countdownBox}`}>
        <h1 className={`${css.timeValue}`}>
          {timerDays.length < 2 && timerDays !== "00"
            ? `0${timerDays}`
            : timerDays}
        </h1>
        <p className={`${css.unitOfTime}`}>Days</p>
        <p className={`${css.unitOfTimeMobile}`}>Days</p>
      </div>
      <Semicolon />
      <div className={`${css.countdownBox}`}>
        <h1 className={`${css.timeValue}`}>
          {timerHours.length < 2 && timerHours !== "00"
            ? `0${timerHours}`
            : timerHours}
        </h1>
        <p className={`${css.unitOfTime}`}>Hours</p>
        <p className={`${css.unitOfTimeMobile}`}>Hours</p>
      </div>
      <Semicolon />
      <div className={`${css.countdownBox}`}>
        <h1 className={`${css.timeValue}`}>
          {timerMinutes.length < 2 && timerMinutes !== "00"
            ? `0${timerMinutes}`
            : timerMinutes}
        </h1>
        <p className={`${css.unitOfTime}`}>Minutes</p>
        <p className={`${css.unitOfTimeMobile}`}>Mins</p>
      </div>
      <Semicolon />
      <div className={`${css.countdownBox}`}>
        <h1 className={`${css.timeValue}`}>
          {timerSeconds.length < 2 && timerSeconds !== "00"
            ? `0${timerSeconds}`
            : timerSeconds}
        </h1>
        <p className={`${css.unitOfTime}`}>Seconds</p>
        <p className={`${css.unitOfTimeMobile}`}>Secs</p>
      </div>
      {/* ... other countdown boxes ... */}
    </div>
  );
};

export default Countdown;
