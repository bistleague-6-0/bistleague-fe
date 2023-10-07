import KotakTengahKiri from "@images/minichallenge/KotakTengahKiri.svg";
import KotakKananAtas from "@images/minichallenge/KotakKananAtas.svg";
import KotakBawah from "@images/minichallenge/KotakBawah.svg";
import Piala from "@images/minichallenge/Piala.svg";
import KotakTopMobile from "@images/competition/registration/regist-bata-top-mobile.svg"
import KotakBotMobile from "@images/competition/registration/regist-bata-bottom-mobile.svg"

import Image from "next/image";

export default function Prize(){
    return(
        <div className="pt-16 lg:py-14 pb-9 px-3.5 lg:px-40 relative bg-[url('/images/minichallenge/Bg-Prize-Mobile.svg')] h-[770px] md:h-full lg:bg-[url('/images/minichallenge/Bg-Prize.svg')] bg-cover">
            <Image
                src={KotakKananAtas}
                alt="Hero Round"
                className="hidden md:block overflow-hidden absolute md:top-0 md:right-14 z-0"
            />
            <Image
                src={KotakTengahKiri}
                alt="Hero Round"
                className="hidden md:block overflow-hidden absolute md:bottom-28 md:left-0 z-0"
            />
            <Image
                src={KotakBawah}
                alt="Hero Round"
                className="hidden md:block overflow-hidden absolute md:bottom-10 md:left-96 z-0"
            />
            <Image
                src={Piala}
                alt="Hero Round"
                className="scale-75 md:scale-100 overflow-hidden absolute -bottom-[21px] -right-2 md:bottom-0 md:right-10 z-0"
            />

            <h1 className="text-4xl lg:text-5xl font-extrabold relative z-10 text-[#F3EEE7]">Prize</h1>
            <div className="flex flex-wrap justify-center text-center gap-9 xl:gap-20 my-12">
                <Image
                    src={KotakTopMobile}
                    alt="Hero Round"
                    className="md:hidden overflow-hidden absolute top-[234px] right-0 z-0"
                />
                <Image
                    src={KotakBotMobile}
                    alt="Hero Round"
                    className="md:hidden overflow-hidden absolute bottom-40 left-0 z-0"
                />
                <div className="w-64 h-28 bg-white rounded-lg p-5 shadow-[0_2px_0_0] shadow-[#B1D5D3] drop-shadow-[0_4px_15px_rgba(0,0,0,0.25)] z-10">
                    <h2 className="text-2xl font-bold mb-4">First Champion</h2>
                    <p className="text-xl">Rp300.000,00</p>
                </div>
                <div className="w-64 h-28 bg-white rounded-lg p-5 shadow-[0_2px_0_0] shadow-[#B1D5D3] drop-shadow-[0_4px_15px_rgba(0,0,0,0.25)] z-10">
                    <h2 className="text-2xl font-bold mb-4">Second Champion</h2>
                    <p className="text-xl">Rp200.000,00</p>
                </div>
                <div className="w-64 h-28 bg-white rounded-lg p-5 shadow-[0_2px_0_0] shadow-[#B1D5D3] drop-shadow-[0_4px_15px_rgba(0,0,0,0.25)] z-10">
                    <h2 className="text-2xl font-bold mb-4">Third Champion</h2>
                    <p className="text-xl">Rp100.000,00</p>
                </div>
            </div>
        </div>
    )
}