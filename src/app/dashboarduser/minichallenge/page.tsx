"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import NavUser from "../component/nav";
import LoadingPage from "../component/loadingPage";

export default function ChallengeUser() {
  const router = useRouter();
  const [data, setData] = useState<any | null>();
  const [isLoading, setisLoading] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [name, setName] = useState("");
  const cookie = new Cookies();
  const token = cookie.get("jwt_token");
  const refresh = cookie.get("refresh");
  useEffect(() => {
    if (token === undefined) {
      router.push("/login");
    }
  }, [token, router]);
  const user_id = cookie.get("user_id");
  const url =
    process.env.NEXT_PUBLIC_STAGE != "staging"
      ? "https://be-production-b6utdt2kwa-et.a.run.app/"
      : "https://be-staging-b6utdt2kwa-et.a.run.app/";

  const getData = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(url + "challenge/" + user_id);
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const addData = async () => {
    if (token) {
      try {
        const response = await axios.put(
          url + "challenge",
          {
            ig_username: data.ig_username,
            ig_content_url: data.ig_content_url,
            tiktok_username: data.tiktok_username,
            tiktok_content_url: data.tiktok_content_url,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        setTrigger(trigger + 1);
        toast.success("Profile edited");
      } catch (error) {
        toast.error("Please fill all fields");
        const response2 = await axios.post(url + "refresh", {
          refresh_token: refresh,
          user_id: user_id,
        });
        if (response2.status == 404) {
          router.push("/login");
        } else {
          cookie.set("jwt_token", response2.data.data.jwt_token, { path: "/" });
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, [trigger]);

  return (
    <>
      <LoadingPage isLoad={isLoading} />
      <div className="w-full flex flex-col lg:flex-row bg-[#F3EEE7]">
        <NavUser active={5} />
        <div className="w-full px-6 py-6 lg:px-16 lg:py-10 flex flex-col items-center lg:items-start gap-4">
          <p className="text-[24px] lg:text-[32px] font-extrabold">
            Personal Information
          </p>
          <div className="w-full bg-white flex flex-col items-center rounded-lg gap-8 px-5 lg:px-9 py-4 lg:py-8 mb-8">
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="fullname" className="font-extrabold">
                  Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Please enter your fullname"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={name}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="username tiktok" className="font-extrabold">
                  Username Tiktok
                </label>
                <input
                  type="text"
                  id="username tiktok"
                  placeholder="Please enter your username tiktok"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.tiktok_username}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      tiktok_username: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="username ig" className="font-extrabold">
                  Username Instagram
                </label>
                <input
                  type="text"
                  id="username ig"
                  placeholder="Please enter your username ig"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.ig_username}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      ig_username: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="konten tiktok" className="font-extrabold">
                  Link Konten Tiktok
                </label>
                <input
                  type="text"
                  id="konten tiktok"
                  placeholder="Please enter your konten tiktok"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.tiktok_content_url}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      tiktok_content_url: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="konten instagram" className="font-extrabold">
                  Link Konten Instagram
                </label>
                <input
                  type="text"
                  id="konten instagram"
                  placeholder="Please enter your konten instagram"
                  className="w-full lg:w-72 xl:w-96 border-2 border-[#BDBDBD] rounded-sm px-2 lg:px-5 py-3"
                  value={data && data.ig_content_url}
                  onChange={(e) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      ig_content_url: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="flex justify-center items-center text-white bg-[#F8A22D] rounded-lg px-20 py-3"
              onClick={addData}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
