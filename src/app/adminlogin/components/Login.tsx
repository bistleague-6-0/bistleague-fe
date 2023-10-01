"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_STAGE === "production"
          ? "https://be-production-b6utdt2kwa-et.a.run.app"
          : "https://be-staging-b6utdt2kwa-et.a.run.app";
      const response = await axios.post(BASE_URL + "/admin/login", data);

      if (response.status === 200) {
        // // Successful login logic
        const { jwt_token, user } = response.data.data;

        cookies.set("token_admin", jwt_token, { path: "/" });
        router.push("/adminpage");
      } else {
        // Handle login error
        console.log("Login failed.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-start lg:justify-start gap-48">
      <div className="py-16 px-14 h-screen lg:px-20 lg:py-6">
        <h1 className="font-extrabold text-base lg:text-2xl lg:mt-12">Login</h1>
        <h1 className="font-extrabold text-base mt-4 mb-4 lg:text-3xl">
          Hello, Welcome Back!
        </h1>
        <Image
          src="/images/login/login mobile.svg"
          width={500}
          height={500}
          alt="Login Mobile Thumbnail"
          className="lg:hidden"
        />
        <div className="mt-5 lg:mt-16 text-sm lg:text-xl">
          <h1 className="font-bold">Username</h1>
          <input
            className="border-2 border-gray-300 rounded-lg w-full py-2 px-3 mt-2 mb-2 max-w-xl"
            type="text"
            placeholder="Please enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="mt-5 lg:mt-9 text-sm lg:text-xl">
          <h1 className="font-bold">Password</h1>
          <input
            className="border-2 border-gray-300 rounded-lg w-full py-2 px-3 mt-2 mb-2 max-w-xl"
            type="password"
            placeholder="Please enter your password "
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center max-w-xl">
          <button
            className="px-9 lg:px-28 py-2 lg:py-4 bg-[#F8A22D] text-white rounded-xl text-base lg:text-xl font-extrabold mt-5 lg:mt-14"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>

      {/* src="/images/login/login web.svg" */}

      <div className="h-screen aspect-[498/540] w-auto hidden lg:block fixed top-0 right-0">
        <Image
          src="/images/login/login web.svg"
          fill={true}
          alt="BIST League 6.0"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
