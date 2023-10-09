"use client"
import HeroRound from "@images/minichallenge/BulatKiri.svg";
import BataTopLeft from "@images/competition/hero/hero-bata-topleft.svg";
import BataTopRight from "@images/competition/hero/hero-bata-topright.svg";
import BataMidLeft from "@images/competition/hero/hero-bata-mid.svg";
import BataMidRight from "@images/competition/hero/hero-bata-rightmid.svg";
import BataBotRight from "@images/competition/hero/hero-bata-botright.svg";
import KotakSatu from "@images/competition/hero/hero-kotak-satu.svg";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();
    return (
        <div className="bg-[url('/images/minichallenge/MiniChallenge-Mobile.svg')] lg:bg-[url('/images/minichallenge/MiniChallenge.svg')] h-[568px] lg:h-[630px] relative bg-cover overflow-hidden mt-20 py-24">
            <Image
                src={BataMidLeft}
                alt="Bata Mid Left"
                className="hidden md:block overflow-hidden absolute bottom-44"
            />
            <Image
                src={BataTopLeft}
                alt="Bata Top Left"
                className="scale-125 hidden md:block overflow-hidden absolute -top-1 left-32"
            />
            <Image
                src={BataTopRight}
                alt="Bata Top Right"
                className="hidden md:block overflow-hidden absolute -top-10 right-4"
            />
            <Image
                src={BataMidRight}
                alt="Bata Mid Right"
                className="hidden md:block overflow-hidden absolute top-56 right-0"
            />
            <Image
                src={BataBotRight}
                alt="Bata Bot Right"
                className="hidden md:block overflow-hidden absolute bottom-24 right-0"
            />
            <Image
                src={KotakSatu}
                alt="Kotak Satu"
                className="hidden md:block overflow-hidden absolute top-44 right-24"
            />

            <div className="flex flex-col mx-5 h-full justify-center items-center text-center z-10 lg:mx-72">
                <Image
                    src={HeroRound}
                    alt="Hero Round"
                    className="scale-125 w-[248px] h-[329px] md:w-[400px] md:h-[530px] overflow-hidden absolute -top-3 left-[-90px] md:top-20 md:left-12 z-0"
                />
                <p className="text-[#F3EEE7] lg:leading-snug font-monument text-3xl lg:text-[64px] lg:mt-20 font-MonumentExtended font-extrabold drop-shadow-[-4px_4px_0_rgba(65,54,135,1)]">
                    MINI CHALLENGE
                </p>
                <div className="flex justify-center mt-10 lg:mt-20 lg:mb-5 z-10">
                    <button
                        className="px-20 lg:px-24 py-4 bg-[#F8A22D] rounded-lg text-base lg:text-2xl font-bold"
                        onClick={() => router.push("/dashboarduser/minichallenge")}
                    >
                        Submit Link
                    </button>
                </div>

            </div>
        </div>
    );
}