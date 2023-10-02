"use client";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Created() {
  const cookie = new Cookies();
  const team_redeem_token: string | undefined = cookie.get("team_redeem_token"); // Added type annotation
  const router = useRouter();
  toast.success("Team created successfully!");

  useEffect(() => {
    if (team_redeem_token === undefined) {
      router.push('/login');
    }
  }, [team_redeem_token, router]);

  const displayTokenDigits =
    team_redeem_token && team_redeem_token.length >= 6 ? true : false;

  return (
    <div className="px-5 py-10">
      <div className="flex text-[#F3EEE7] gap-3 items-center lg:hidden">
        <AiOutlineArrowLeft className="text-2xl absolute lg:relative" />
        <h1 className="font-extrabold text-2xl lg:hidden w-screen text-center">
          Create a Team
        </h1>
        <h1 className="font-bold text-base hidden lg:block">
          Back to register options
        </h1>
      </div>

      <h1 className="text-center text-white text-5xl font-bold mt-8 hidden lg:block">
        Create a Team
      </h1>

      <div className="flex justify-center items-center mt-8">
        <div className="bg-white px-4 py-6 w-full lg:w-[711px] rounded-lg">
          <h1 className="text-center text-base lg:text-xl mb-4 lg:mb-10">
            Team successfully created. <br />
            Use this token to invite your team members:
          </h1>

          <div className="flex flex-row gap-1 justify-center text-2xl mb-4 lg:mb-10 lg:text-8xl font-extrabold">
            {displayTokenDigits &&
              team_redeem_token &&
              team_redeem_token
                .slice(0, 6)
                .split("")
                .map((digit, index) => (
                  <p key={index} className="bg-[#F3EEE7] py-7 px-3">
                    {digit}
                  </p>
                ))}
          </div>
          <h1 className="text-center lg:text-xl mb-4">
            The token is also sent to the email you registered with.{" "}
            <span className="font-bold">Good luck!</span>
          </h1>

          <div
            className="bg-[#F8A22D] px-12 py-3 rounded-lg cursor-pointer mt-6"
            onClick={() => router.push("/dashboarduser")}
          >
            <h1 className="text-white text-center font-bold lg:text-xl">
              Go to Dashboard
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
