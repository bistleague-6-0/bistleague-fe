"use client";
import NavUser from "../component/nav";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import LoadingPage from "../component/loadingPage";

export default function ProfilUser() {
  const [data, setData] = useState<any | null>();
  const [isLoading, setisLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("jwt_token");
  const user_id = cookie.get("user_id");
  const url =
    process.env.NEXT_PUBLIC_STAGE != "staging"
      ? "https://be-production-b6utdt2kwa-et.a.run.app/"
      : "https://be-staging-b6utdt2kwa-et.a.run.app/";
  console.log(token);

  const getProfileData = async () => {
    try {
      const response = await axios.get(url + "profile/" + user_id);
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const editProfile = async () => {
    if (token) {
      try {
        const response = await axios.put(
          url + "profile",
          {
            full_name: data.full_name,
            username: data.username,
            email: data.email,
            age: data.age,
            address: data.address,
            phone_number: data.phone_number,
            institution: data.institution,
            linkedin_url: data.linkedin_url,
            major: data.major,
            entry_year: data.entry_year,
            line_id: data.line_id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        setTrigger(trigger + 1);
        console.log("Profile edited:", response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getProfileData();
  }, [trigger]);

  return (
    <>
      <LoadingPage isLoad={isLoading} />
      <div className="w-full flex flex-col lg:flex-row bg-[#F3EEE7]">
        <NavUser active={1} />
        <div className="w-full px-6 py-6 lg:px-16 lg:py-10 flex flex-col items-center lg:items-start gap-4">
          <p className="text-[24px] lg:text-[32px] font-extrabold">
            Personal Information
          </p>
          <div className="w-full bg-white flex flex-col items-center rounded-lg gap-8 px-5 lg:px-9 py-4 lg:py-8 mb-8">
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="fullname" className="font-extrabold">
                  Fullname
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Please enter your fullname"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.full_name}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      full_name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="username" className="font-extrabold">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Please enter your username"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.username}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="email" className="font-extrabold">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Please enter your email"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3 mb-0"
                  value={data && data.email}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                />
                <p className="font-medium text-[10px] md:text-[12px] text-[#2F80ED]">
                  Please enter an active email address for verification.
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="age" className="font-extrabold">
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  placeholder="Please enter your age"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.age}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      age: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="address" className="font-extrabold">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Please enter your address"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.address}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      address: e.target.value,
                    }))
                  }
                />
                <p className="font-medium text-[10px] md:text-[12px] text-[#2F80ED]">
                  Enter your predicted address at the end of October.
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone number" className="font-extrabold">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone number"
                  placeholder="Please enter your phone number"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.phone_number}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      phone_number: e.target.value,
                    }))
                  }
                />
                <p className="font-medium text-[10px] md:text-[12px] text-[#2F80ED]">
                  {" "}
                  Please enter an active phone number.
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="institution" className="font-extrabold">
                  Institution
                </label>
                <input
                  type="text"
                  id="institution"
                  placeholder="Please enter your institution"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.institution}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      institution: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="linkedin" className="font-extrabold">
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedin"
                  placeholder="Please enter your linkedin"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.linkedin_url}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      linkedin_url: e.target.value,
                    }))
                  }
                />
                <p className="font-medium text-[10px] md:text-[12px] text-[#2F80ED]">
                  Please enter a valid link to your LinkedIn profile.
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="major" className="font-extrabold">
                  Major
                </label>
                <input
                  type="text"
                  id="major"
                  placeholder="Please enter your major"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.major}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      major: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="idline" className="font-extrabold">
                  Id Line
                </label>
                <input
                  type="text"
                  id="idline"
                  placeholder="Please enter your idline"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.line_id}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      line_id: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="entry year" className="font-extrabold">
                  Entry Year
                </label>
                <input
                  type="text"
                  id="entry year"
                  placeholder="Please enter your entry year"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.entry_year}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      entry_year: e.target.value,
                    }))
                  }
                />
                <p className="font-medium text-[10px] md:text-[12px] text-[#2F80ED]">
                  Please enter the year you got admitted at your current
                  institution.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="flex justify-center items-center text-white bg-[#F8A22D] rounded-lg px-10 py-3"
              onClick={editProfile}
            >
              Save Personal Information
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
