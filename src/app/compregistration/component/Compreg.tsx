import Image from "next/image";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Compreg() {
  return (
    <div className="px-5 py-10">
      <div className="flex text-[#F3EEE7] gap-3 items-center">
        <AiOutlineArrowLeft className="text-2xl" />
        <h1 className="font-extrabold text-2xl lg:hidden">Register Your Team</h1>
        <h1 className="font-bold text-base hidden lg:block">Back to Competition</h1>
      </div>

    <h1 className="text-center text-white text-5xl font-bold mb-16 mt-8 hidden lg:block">Register Your Team</h1>

      <div className="flex flex-col lg:flex-row lg:gap-32 justify-center items-center">
        <div className="flex flex-col bg-white px-10 lg:py-14 py-7 gap-8 lg:gap-12 rounded-lg mt-8 max-w-sm">
          <h1 className="text-center text-lg lg:text-xl">
            Want to create a team as a team leader
          </h1>
          <div className="bg-[#379392] px-12 py-3 rounded-lg cursor-pointer">
            <h1 className="text-white text-center font-bold lg:text-xl">Create a Team</h1>
          </div>
        </div>

        <div className="flex flex-col bg-white px-10 py-7 lg:py-14 gap-8 lg:gap-12 rounded-lg mt-8 max-w-sm">
          <h1 className="text-center text-lg lg:text-xl">
            Already have a team or you are a team member?
          </h1>
          <div className="bg-[#F8A22D] py-3 rounded-lg cursor-pointer">
            <h1 className="text-white text-center font-bold lg:text-xl">
              Join a Team with Token
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}