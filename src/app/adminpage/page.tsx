"use client";
import Image from "next/image";
import { FaWallet } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuArrowUpRightFromCircle } from "react-icons/lu";
import PaymentVerification from "./component/payment";
import { useState } from "react";
import UserVerification from "./component/user";
import MiniChallenge from "./component/challenge";

export default function AdnminPage() {
  const [index, setIndex] = useState(0);
  const [hamburger, setHamburger] = useState(false);
  const changeHamburger = () => {
    {
      hamburger ? setHamburger(false) : setHamburger(true);
    }
  };
  return (
    <>
      <div className="w-auto h-screen bg-[#F3EEE7] flex flex-col lg:flex-row">
        <div className="hidden w-1/6 h-screen lg:flex lg:flex-col lg:items-center bg-[#379392] py-8 px-4">
          <Image
            src="/images/adminpage/bist.svg"
            width={100}
            height={100}
            alt=""
          />
          <div
            className={`${
              index == 0 ? "bg-[#F3EEE7] text-[#379392]" : "text-white"
            } w-full text-[20px] rounded-lg px-2 py-3 mt-16 flex items-center justify-center gap-5 cursor-pointer`}
            onClick={() => setIndex(0)}
          >
            <FaWallet size={28} />
            <p className="font-extrabold">
              Payment
              <br />
              Verification
            </p>
          </div>
          <div
            className={`${
              index == 1 ? "bg-[#F3EEE7] text-[#379392]" : "text-white"
            } w-full text-[20px] rounded-lg px-2 py-3 mt-2 flex items-center justify-center gap-5 cursor-pointer`}
            onClick={() => setIndex(1)}
          >
            <CgProfile size={28} />
            <p className="font-extrabold">
              User
              <br />
              Verification
            </p>
          </div>
          <div
            className={`${
              index == 2 ? "bg-[#F3EEE7] text-[#379392]" : "text-white"
            } w-full text-[20px] rounded-lg px-2 py-3 mt-2 flex items-center justify-center gap-5 cursor-pointer`}
            onClick={() => setIndex(2)}
          >
            <LuArrowUpRightFromCircle size={28} />
            <p className="font-extrabold">
              Mini
              <br />
              Challenge
            </p>
          </div>
        </div>
        <div className="w-full h-16 bg-[#379392] flex items-center justify-between lg:hidden px-5 py-4 text-[#F3EEE7]">
          <div className="flex items-center gap-2 text-[18px] font-bold">
            {index == 0 ? (
              <>
                {" "}
                <FaWallet size={24} />
                <p>Payment Verification</p>
              </>
            ) : index == 1 ? (
              <>
                <CgProfile size={28} />
                <p>User Verification</p>
              </>
            ) : (
              <>
                <LuArrowUpRightFromCircle size={28} />
                <p>Mini Challenge</p>
              </>
            )}
          </div>
          <button
            className={`${
              hamburger ? "text-white " : ""
            }cursor-pointer hover:scale-105 z-50`}
            onClick={changeHamburger}
          >
            {hamburger ? <MdClose size={24} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
        {hamburger && (
          <>
            <div className="fixed w-full h-full bg-[#379392] flex flex-col items-center justify-between py-20 z-20">
              <div className="w-full flex flex-col items-center justify-center">
                <Image
                  src="/images/adminpage/bist.svg"
                  width={60}
                  height={60}
                  alt=""
                />
                <div
                  onClick={() => {
                    setIndex(0);
                    changeHamburger();
                  }}
                  className={`w-full gap-2 text-center ${
                    index == 0
                      ? "bg-[#F3EEE7] text-[#379392]"
                      : "bg-transparent text-white"
                  } text-[18px] font-bold cursor-pointer py-2 hover:bg-[#F3EEE7] hover:text-[#379392] mt-8`}
                >
                  Payment Verification
                </div>
                <div
                  onClick={() => {
                    setIndex(1);
                    changeHamburger();
                  }}
                  className={`w-full gap-2 text-center ${
                    index == 1
                      ? "bg-[#F3EEE7] text-[#379392]"
                      : "bg-transparent text-white"
                  } text-[18px] font-bold cursor-pointer py-2 hover:bg-[#F3EEE7] hover:text-[#379392]`}
                >
                  User Verification
                </div>
                <div
                  onClick={() => {
                    setIndex(2);
                    changeHamburger();
                  }}
                  className={`w-full gap-2 text-center ${
                    index == 1
                      ? "bg-[#F3EEE7] text-[#379392]"
                      : "bg-transparent text-white"
                  } text-[18px] font-bold cursor-pointer py-2 hover:bg-[#F3EEE7] hover:text-[#379392]`}
                >
                  Mini Challenge
                </div>
              </div>
            </div>
          </>
        )}
        <div className="w-full lg:w-5/6 px-4 lg:px-14 py-9 flex flex-col overflow-y-auto">
          <div className="flex justify-end text-[#379392] items-center gap-1 mb-1">
            <p className="text-[#379392] text-[24px]">
              Hi, <span className="font-bold">Admin!</span>
            </p>
            <CgProfile size={32} />
          </div>
          <div className="w-full">
            {index == 0 ? (
              <PaymentVerification />
            ) : index == 1 ? (
              <UserVerification />
            ) : (
              <MiniChallenge />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
