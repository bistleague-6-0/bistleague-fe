"use client";
import Image from "next/image";

import HeroRound from "@images/competition/hero/hero-round.svg";
import BataTopLeft from "@images/competition/hero/hero-bata-topleft.svg";
import BataTopRight from "@images/competition/hero/hero-bata-topright.svg";
import BataMidLeft from "@images/competition/hero/hero-bata-mid.svg";
import BataMidRight from "@images/competition/hero/hero-bata-rightmid.svg";
import BataBotRight from "@images/competition/hero/hero-bata-botright.svg";
import KotakSatu from "@images/competition/hero/hero-kotak-satu.svg";
import toast from "react-hot-toast";
import { useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Countdown from "@/component/Countdown/Countdown";

interface ProfileData {
  uid: string;
  team_id: string;
  email: string;
  full_name: string;
  age: 0;
  username: string;
  address: string;
  phone_number: string;
  institution: string;
  major: string;
  entry_year: number;
  linkedin_url: string;
  line_id: string;
}

export default function Hero({ profileData }: { profileData: ProfileData }) {
  const router = useRouter();

  const [timerDays, setTimerDays] = useState<number>(0);
  const [timerHours, setTimerHours] = useState<number>(0);
  const [timerMinutes, setTimerMinutes] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const interval = useRef<NodeJS.Timeout | null>(null);

  const earlyBirdRegistrationClose = new Date(
    "October 1, 2023 23:59:59 "
  ).getTime();
  const normalRegistrationClose = new Date(
    "October 29, 2023 23:59:59 "
  ).getTime();
  const lateRegistrationClose = new Date(
    "November 5, 2023 23:59:59 "
  ).getTime();

  const [componentReady, setcomponentReady] = useState<boolean>(false);
  const [registrationStatus, setRegistrationStatus] = useState<String>(
    "Closed Early Bird Registration in"
  );
  const [date, setDate] = useState<String>("1 Oktober 2023");

  useLayoutEffect(() => {
    const now = new Date().getTime();
    if (now > earlyBirdRegistrationClose) {
      setRegistrationStatus("Closed Registration");
      setDate("29 Oktober 2023");
    } else if (now > normalRegistrationClose) {
      setRegistrationStatus("Closed late Registration in");
      setDate("5 November 2023");
    }
    setcomponentReady(true);
  }, []);

  return (
    <div className="bg-[url('/images/competition/hero/bg-hero-mobile.svg')] lg:bg-[url('/images/competition/hero/bg-hero-web.svg')] relative bg-cover overflow-hidden mt-20 py-24">
      <Image
        src={BataMidLeft}
        alt="Bata Mid Left"
        className="hidden lg:block overflow-hidden absolute bottom-44"
      />
      <Image
        src={BataTopLeft}
        alt="Bata Top Left"
        className="scale-125 hidden lg:block overflow-hidden absolute -top-1 left-32"
      />
      <Image
        src={BataTopRight}
        alt="Bata Top Right"
        className="hidden lg:block overflow-hidden absolute -top-10 right-4"
      />
      <Image
        src={BataMidRight}
        alt="Bata Mid Right"
        className="hidden lg:block overflow-hidden absolute top-56 right-0"
      />
      <Image
        src={BataBotRight}
        alt="Bata Bot Right"
        className="hidden lg:block overflow-hidden absolute bottom-24 right-0"
      />
      <Image
        src={KotakSatu}
        alt="Kotak Satu"
        className="hidden lg:block overflow-hidden absolute top-40 right-24"
      />

      <div className="flex flex-col mx-4 h-full justify-center items-center text-center z-10 lg:mx-72">
        <Image
          src={HeroRound}
          alt="Hero Round"
          className="scale-125 w-[248px] h-[329px] lg:w-[400px] lg:h-[530px] overflow-hidden absolute -top-3 left-[-90px] lg:top-20 lg:left-12 z-0"
        />
        {profileData ? (
          <>
            <p className="text-[#F3EEE7] lg:leading-snug font-monument text-3xl lg:text-[64px] font-MonumentExtended font-extrabold drop-shadow-[-4px_4px_0_rgba(16,109,108,1)]">
              BUSINESS IT CASE COMPETITION
            </p>
            <p className="mt-6 lg:mt-2 text-2xl text-white font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
              Registration closes in:
            </p>
            <Countdown />
            <div className="flex justify-center mt-7 lg:mt-10 z-10">
              <button
                className="px-20 lg:px-24 py-4 bg-[#F8A22D] rounded-lg text-base lg:text-2xl font-bold"
                onClick={() =>
                  profileData.team_id
                    ? toast.error("You already have a team!")
                    : router.push("/compregistration")
                }
              >
                Register Team
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[#F3EEE7] lg:leading-snug font-monument text-3xl lg:text-[64px] lg:mt-20 font-MonumentExtended font-extrabold drop-shadow-[-4px_4px_0_rgba(16,109,108,1)]">
              BUSINESS IT CASE COMPETITION
            </p>
            <div className="flex justify-center mt-7 lg:mt-20 mb-10 z-10">
              <button
                className="px-20 lg:px-24 py-4 bg-[#F8A22D] rounded-lg text-base lg:text-2xl font-bold"
                onClick={() => router.push("/register")}
              >
                Register Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
