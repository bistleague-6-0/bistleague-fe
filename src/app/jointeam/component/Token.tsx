"use client";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export default function Token() {
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const cookie = new Cookies();
  const [jwtToken, setJwtToken] = useState(cookie.get("jwt_token")); // Get the JWT token from the cookie
  const [teamName, setTeamName] = useState("");
  const BASE_URL =
    process.env.STAGE === "production"
      ? "https://be-production-b6utdt2kwa-et.a.run.app"
      : "https://be-staging-b6utdt2kwa-et.a.run.app";

  const fetchTeamData = async () => {
    try {
      const response = await axios.get(BASE_URL + "/team", {
        headers: {
          Authorization: `Bearer ${cookie.get("jwt_token")}`,
        },
      });

      setTeamName(response.data.data.team_name);
      // console.log("Team Name:", teamName);
      // You can set the team name to a state if needed
    } catch (error) {
      console.error("Error fetching team data:", error);
      // Handle error here and provide feedback to the user
    }
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        BASE_URL + "/team/redeem",
        {
          redeem_code: tokenInput,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Successfully joined team");

      // Update the JWT token in the state (and cookie
      cookie.remove("jwt_token", { path: "/" });
      cookie.set("jwt_token", response.data.data.jwt_token, { path: "/" });
      // console.log("JWT Token:", response.data.data.jwt_token)
      setJwtToken(response.data.data.jwt_token);

      setJoined(true); // Change 'joined' state to true on successful join
      fetchTeamData();
    } catch (error) {
      // Handle error if the request fails
      toast.error("Failed to join team");
      console.error("Error joining team:", error);
      // You can display an error message or take other actions as needed
    }
  };

  return (
    <div className="px-5 py-10">
      <div className="flex text-[#F3EEE7] gap-3 items-center">
        <AiOutlineArrowLeft
          className="text-2xl absolute lg:relative"
          onClick={() => router.push("/compregistration")}
        />
        <h1 className="font-extrabold text-2xl lg:hidden w-full text-center">
          Join a Team
        </h1>
        <h1 className="font-bold text-base hidden  lg:block">
          Back to register options
        </h1>
      </div>

      <h1 className="text-center text-white text-5xl font-bold mb-16 mt-8 hidden lg:block">
        Join a Team
      </h1>

      {!joined ? (
        <div className="flex justify-center items-center">
          <div className="flex flex-col bg-white px-10 lg:py-14 py-7 gap-4 lg:gap-12 rounded-lg mt-8 w-auto max-w-sm self-center">
            <h1 className="text-center text-lg lg:text-xl">
              Input token code here (ask your team leader)
            </h1>

            <input
              type="text"
              className="px-4 py-2 rounded-lg border border-gray-500 font-bold"
              onChange={(e) => setTokenInput(e.target.value)}
            />

            <div
              className="bg-[#F8A22D] py-3 rounded-lg cursor-pointer"
              onClick={handleSubmit}
            >
              <h1 className="text-white text-center font-bold lg:text-xl">
                Join a Team with Token
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="flex flex-col bg-white px-10 lg:py-14 py-7 gap-8 lg:gap-12 rounded-lg mt-8 max-w-sm">
            <h1 className="text-center text-lg lg:text-xl">
              Congratulations, you have successfully joined{" "}
              <span className="font-bold">{teamName}</span> as a member!
            </h1>
            <div
              className="bg-[#F8A22D] px-12 py-3 rounded-lg cursor-pointer"
              onClick={() => {
                router.push("/dashboarduser");
              }}
            >
              <h1 className="text-white text-center font-bold lg:text-xl">
                Go to Dashboard
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
