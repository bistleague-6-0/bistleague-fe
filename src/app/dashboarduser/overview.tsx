"use client";
import Cookies from "universal-cookie";
import EventUser from "./component/event";
import NavUser from "./component/nav";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "./component/loadingPage";
import { useRouter } from "next/navigation";

export default function OverviewUser() {
  const router = useRouter();
  const [teamId, setTeamId] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const cookie = new Cookies();
  const token = cookie.get("jwt_token");
  const user_id = cookie.get("user_id");
  useEffect(() => {
    if (token === undefined) {
      router.push('/login');
    }
  }, [token, router]);

  const url =
    process.env.NEXT_PUBLIC_STAGE != "staging"
      ? "https://be-production-b6utdt2kwa-et.a.run.app/"
      : "https://be-staging-b6utdt2kwa-et.a.run.app/";

  const getProfileData = async () => {
    try {
      const response = await axios.get(url + "profile/" + user_id);
      console.log(response.data.data.team_id);
      setTeamId(response.data.data.team_id);
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <LoadingPage isLoad={isLoading} />
      <div className="w-full flex flex-col lg:flex-row bg-[#F3EEE7]">
        <NavUser active={0} />
        <div className="w-full px-6 py-6 lg:px-16 lg:py-10 flex flex-col gap-4">
          <p className="text-[36px] font-extrabold text-center lg:text-start">
            Events
          </p>
          <p className="text-[24px] font-bold">
            {teamId == "" ? "Not Registered" : "Registered"}
          </p>
          <div className="w-full flex justify-center lg:justify-start flex-wrap gap-2">
            <EventUser event={"competition"} />
          </div>
          <p className="text-[24px] font-bold">Not Started Yet</p>
          <div className="w-full flex justify-center lg:justify-start flex-wrap gap-2">
            <EventUser event={"bootcamp"} />
            <EventUser event={"webinar"} />
            <EventUser event={"challenge"} />
          </div>
        </div>
      </div>
    </>
  );
}
