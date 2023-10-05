import Image from "next/image";
import css from "@/app/landing.module.css";

export default function Timeline() {
    return (
        <div className="relative bg-[url('/images/competition/timeline/bg-timeline-mobile.svg')] lg:bg-[url('/images/competition/timeline/bg-timeline-web.svg')] bg-cover pt-9 lg:py-14 pb-9 px-3.5 lg:px-40">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#F3EEE7] mb-8">Timeline</h1>

            <div className="items-center lg:block hidden">
              <img
                src="./images/landingpage/timelineHorizontal.svg"
                alt="timeline"
                className="mx-auto w-full"
              />
            </div>
            <div className="flex-col lg:hidden block items-center">
              <img
                src="./images/competition/timeline/timeline-mobile.svg"
                alt="timeline"
                className={`mx-auto ${css.timelineVertical}`}
              />
            </div>
        </div>
    )
}