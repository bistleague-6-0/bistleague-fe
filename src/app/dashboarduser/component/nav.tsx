"use client";
import { CgProfile } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import { FaTrophy, FaMicrophone } from "react-icons/fa";
import { IoMdLaptop } from "react-icons/io";
import { LuArrowUpRightFromCircle } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NavUser({ active }: { active?: number }) {
  const [hamburger, setHamburger] = useState(false);
  const changeHamburger = () => {
    {
      hamburger ? setHamburger(false) : setHamburger(true);
    }
  };
  const [fullName, setFullName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const cookie = new Cookies();
  const token = cookie.get("jwt_token");
  const user_id = cookie.get("user_id");
  const refresh = cookie.get("refresh");
  const url =
    process.env.NEXT_PUBLIC_STAGE != "staging"
      ? "https://be-production-b6utdt2kwa-et.a.run.app/"
      : "https://be-staging-b6utdt2kwa-et.a.run.app/";
  const router = useRouter();

  const getProfileData = async () => {
    try {
      const response = await axios.get(url + "profile/" + user_id);
      console.log(response.data.data.full_name);
      setFullName(response.data.data.full_name);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const getTeamData = async () => {
    try {
      const response = await axios.get(url + "team", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data.data);
      setTeamName(response.data.data.team_name);
    } catch (error) {
      const response2 = await axios.post(url + "refresh", {
        refresh_token: refresh,
        user_id: user_id,
      });
      if (response2.status == 404) {
        router.push("/login");
      } else {
        console.log(response2);
        cookie.set("jwt_token", response2.data.data.jwt_token, { path: "/" });
      }
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    if (token === undefined) {
      router.push("/login");
    }
  }, [token, router]);

  useEffect(() => {
    getTeamData();
  }, []);
  return (
    <>
      <div className="hidden lg:w-1/5 lg:bg-gradient-to-b lg:from-red-600 lg:to-orange-500 lg:flex lg:flex-col lg:px-3 lg:py-12">
        <div
          className="w-full flex justify-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/images/adminpage/bist.svg"
            width={100}
            height={100}
            alt=""
            className="text-center"
          />
        </div>
        <div className="w-full rounded-lg bg-[#F3EEE7] px-4 py-4 mb-8 mt-6">
          <p className="text-[20px] font-bold mb-[2px]">{fullName}</p>
          <p className="text-[12px] font-bold">{teamName}</p>
        </div>
        <div
          onClick={() => router.push("/dashboarduser")}
          className={`w-full flex items-center gap-2 rounded-lg ${
            active == 0
              ? "bg-[#F3EEE7] text-[#E22727]"
              : "bg-transparent text-white"
          } px-4 py-2 mb-4 cursor-pointer hover:bg-[#F3EEE7] hover:text-[#E22727]`}
        >
          <GoHomeFill size={24} />
          <p className="text-[18px] font-bold">Overview</p>
        </div>
        <div
          onClick={() => router.push("/dashboarduser/profile")}
          className={`w-full flex items-center gap-2 rounded-lg ${
            active == 1
              ? "bg-[#F3EEE7] text-[#E22727]"
              : "bg-transparent text-white"
          } px-4 py-2 mb-4 cursor-pointer hover:bg-[#F3EEE7] hover:text-[#E22727]`}
        >
          <CgProfile size={24} />
          <p className="text-[18px] font-bold">Profile</p>
        </div>
        <div
          onClick={() => router.push("/dashboarduser/competition")}
          className={`w-full flex items-center gap-2 rounded-lg ${
            active == 2
              ? "bg-[#F3EEE7] text-[#E22727]"
              : "bg-transparent text-white"
          } px-4 py-2 mb-4 cursor-pointer hover:bg-[#F3EEE7] hover:text-[#E22727]`}
        >
          <FaTrophy size={24} />
          <p className="text-[18px] font-bold">Competition</p>
        </div>
        <div
          className={`w-full flex items-center gap-2 rounded-lg ${
            active == 3
              ? "bg-[#F3EEE7] text-[#E22727]"
              : "bg-transparent text-white"
          } px-4 py-2 mb-4 cursor-pointer hover:bg-[#F3EEE7] hover:text-[#E22727]`}
        >
          <IoMdLaptop size={24} />
          <p className="text-[18px] font-bold">Bootcamp</p>
        </div>
        <div
          className={`w-full flex items-center gap-2 rounded-lg ${
            active == 4
              ? "bg-[#F3EEE7] text-[#E22727]"
              : "bg-transparent text-white"
          } px-4 py-2 mb-4 cursor-pointer hover:bg-[#F3EEE7] hover:text-[#E22727]`}
        >
          <FaMicrophone size={24} />
          <p className="text-[18px] font-bold">Webinar</p>
        </div>
        <div
          className={`w-full flex items-center gap-2 rounded-lg ${
            active == 5
              ? "bg-[#F3EEE7] text-[#E22727]"
              : "bg-transparent text-white"
          } px-4 py-2 mb-4 cursor-pointer hover:bg-[#F3EEE7] hover:text-[#E22727]`}
        >
          <LuArrowUpRightFromCircle size={24} />
          <p className="text-[18px] font-bold">Mini Challenge</p>
        </div>
      </div>
      <div className="w-full h-16 bg-[#F3EEE7] flex items-center justify-between lg:hidden px-5 py-3 text-[#E22727]">
        <div className="flex items-center gap-2 text-[18px] font-bold">
          {active == 0 ? (
            <>
              <GoHomeFill size={24} />
              <p>Overview</p>
            </>
          ) : active == 1 ? (
            <>
              <CgProfile size={24} />
              <p>Profile</p>
            </>
          ) : active == 2 ? (
            <>
              <FaTrophy size={24} />
              <p>Competition</p>
            </>
          ) : active == 3 ? (
            <>
              <IoMdLaptop size={24} />
              <p>Bootcamp</p>
            </>
          ) : active == 4 ? (
            <>
              <FaMicrophone size={24} />
              <p>Webinar</p>
            </>
          ) : (
            <>
              <LuArrowUpRightFromCircle size={24} />
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
          <div className="fixed w-full h-full bg-gradient-to-b from-red-600 to-orange-500 flex flex-col items-center justify-between py-20 z-20">
            <div className="w-full flex flex-col items-center justify-center">
            <div
              className="w-full flex justify-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image
                src="/images/adminpage/bist.svg"
                width={100}
                height={100}
                alt=""
                className="text-center"
              />
            </div>
              <div
                onClick={() => router.push("/dashboarduser")}
                className={`w-full gap-2 text-center ${
                  active == 0
                    ? "bg-[#F3EEE7] text-[#E22727]"
                    : "bg-transparent text-white"
                } text-[18px] font-bold cursor-pointer mt-6 py-2 hover:bg-[#F3EEE7] hover:text-[#E22727]`}
              >
                Overview
              </div>
              <div
                onClick={() => router.push("/dashboarduser/profile")}
                className={`w-full gap-2 text-center ${
                  active == 1
                    ? "bg-[#F3EEE7] text-[#E22727]"
                    : "bg-transparent text-white"
                } text-[18px] font-bold cursor-pointer py-2 hover:bg-[#F3EEE7] hover:text-[#E22727]`}
              >
                Profile
              </div>
              <div
                onClick={() => router.push("/dashboarduser/competition")}
                className={`w-full gap-2 text-center ${
                  active == 2
                    ? "bg-[#F3EEE7] text-[#E22727]"
                    : "bg-transparent text-white"
                } text-[18px] font-bold cursor-pointer py-2 hover:bg-[#F3EEE7] hover:text-[#E22727]`}
              >
                Competition
              </div>
              <div
                className={`w-full gap-2 text-center ${
                  active == 3
                    ? "bg-[#F3EEE7] text-[#E22727]"
                    : "bg-transparent text-white"
                } text-[18px] font-bold cursor-pointer py-2 hover:bg-[#F3EEE7] hover:text-[#E22727]`}
              >
                Bootcamp
              </div>
              <div
                className={`w-full gap-2 text-center ${
                  active == 4
                    ? "bg-[#F3EEE7] text-[#E22727]"
                    : "bg-transparent text-white"
                } text-[18px] font-bold cursor-pointer py-2 hover:bg-[#F3EEE7] hover:text-[#E22727]`}
              >
                Webinar
              </div>
              <div
                className={`w-full gap-2 text-center ${
                  active == 5
                    ? "bg-[#F3EEE7] text-[#E22727]"
                    : "bg-transparent text-white"
                } text-[18px] font-bold cursor-pointer py-2 hover:bg-[#F3EEE7] hover:text-[#E22727]`}
              >
                Mini Challenge
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
