"use client";
import Image from "next/image";

import GuideRound from "@images/competition/guidebook/guidebook-round.svg";
import BulatKecil from "@images/competition/guidebook/guidebook-bulat-kecil.svg";

export default function Guidebook() {
  const downloadpdf = () => {
    const pdfUrl = "/guidebook.pdf";

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = "Guidebook.pdf";
    link.click();
  };
  return (
    <div className="bg-[url('/images/competition/guidebook/bg-guidebook-mobile.svg')] lg:bg-[url('/images/competition/guidebook/bg-guidebook-web.svg')] relative h-[700px] lg:h-full bg-cover pt-16 lg:py-14 pb-9 px-3.5 lg:px-40 overflow-hidden">
      <div className="lg:w-[782px] relative z-10">
        <h1 className="text-4xl font-extrabold text-white lg:text-5xl">
          Guidebook
        </h1>
        <p className="text-lg font-normal leading-7 text-justify text-white lg:text-xl mt-9 lg:mt-14">
          As mentioned before, preliminary round will be carried out online and
          the final round will be carried out offline. The preliminary case will
          be announced and submitted through this website. The final round will
          be held for 2 days in fully offline. For more detailed information,
          please download the guidebook below.
        </p>
        <div className="flex justify-center mt-9 lg:mt-10 lg:justify-normal">
          <button
            className="px-11 lg:px-6 py-4 bg-[#F8A22D] rounded-lg text-base lg:text-2xl font-bold"
            onClick={() => downloadpdf()}
          >
            Download Guidebook
          </button>
        </div>
      </div>
      <Image
        src={GuideRound}
        alt="Hero Round"
        className="block absolute xl:-bottom-24 xl:right-48 -bottom-[240px] -right-20"
      />
      <Image
        src={BulatKecil}
        alt="Hero Round"
        className="absolute hidden scale-125 lg:block lg:top-16 lg:right-32"
      />
    </div>
  );
}
