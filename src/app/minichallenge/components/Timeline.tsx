import Image from "next/image";
import Bulat from "@images/minichallenge/Bulat.svg";

export default function Timeline() {
    return (
        <div className="relative bg-[url('/images/minichallenge/Bg-Timeline-Mobile.svg')] lg:bg-[url('/images/minichallenge/Bg-Timeline.svg')] bg-cover pt-9 lg:py-14 pb-9 px-3.5 lg:px-40">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#F3EEE7] mb-8">Timeline</h1>

            <Image
                src={Bulat}
                alt="Bulat"
                className="hidden lg:block scale-110 overflow-hidden absolute bottom-[17px] left-20"
            />

            <div className="items-center lg:block hidden relative w-full max-w-xl aspect-[517/171] mx-auto z-10">
              <Image
                src="./images/minichallenge/Timeline.svg"
                fill={true}
                alt="timeline"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-col lg:hidden block items-center relative w-full max-w-xl aspect-[267/306] mx-auto z-10">
              <Image
                src="./images/minichallenge/Timeline-Mobile.svg"
                fill={true}
                alt="timeline"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="lg:hidden text-sm lg:text-xl font-bold text-white mt-9 lg:mt-14 lg:mx-auto lg:text-center text-justify">* Subject to change</div>
        </div>
    )
}