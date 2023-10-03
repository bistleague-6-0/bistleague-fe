"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      username,
      password,
      re_password: confirmPassword,
      full_name: fullname,
    };

    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_STAGE != "staging"
          ? "https://be-production-b6utdt2kwa-et.a.run.app"
          : "https://be-staging-b6utdt2kwa-et.a.run.app";
      const response = await axios.post(BASE_URL + "/register", data);

      if (response.status === 200) {
        // Successful login logic
        // console.log("Register successful!");
        router.push("/login");
      } else {
        // Handle login error
        // console.log("Register failed.");
        toast.error("Register failed, Make sure to input data correctly!");
      }
    } catch (error) {
      // console.error("Error Register:", error);
      toast.error("Make sure to input data correctly!");
    }
  };

  return (
    <div className="flex flex-col lg:w-1/2 self-center px-12 lg:px-4 pt-8 pb-4 lg:max-h-screen">
      <div className="flex flex-row gap-2 items-center mb-10 justify-between">
        <div className="flex flex-col gap-4 lg:gap-1">
          <h1 className="font-bold lg:hidden">Register</h1>
          <h1 className="text-3xl hidden lg:block font-extrabold">
            Registration
          </h1>
          <p className="font-semibold hidden lg:block">
            Already have a team account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
          <h2 className="text-base font-bold lg:hidden">
            Hello, Welcome to BIST League 6.0!
          </h2>
        </div>

        <Image
          src="/images/register/bist-register.svg"
          width={70}
          height={80}
          alt="BIST League 6.0"
          className="w-auto h-auto lg:hidden"
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-2 lg:w-1/2">
          <h3 className="font-bold">Fullname</h3>
          <input
            type="text"
            placeholder="Please enter your fullname"
            className="border-2 border-gray-300 rounded-lg w-full px-3 py-2 lg:px-6 lg:py-4"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-2 lg:w-1/2">
          <h3 className="font-bold">Username</h3>
          <input
            type="text"
            placeholder="Please enter your username"
            className="border-2 border-gray-300 rounded-lg w-full px-3 py-2 lg:px-6 lg:py-4 lg:max-w-xs"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          {username.length < 8 ? (
            <p className="text-red-500 text-sm">
              Username must be {">="} 8 characters
            </p>
          ) : (
            <div className="h-5"></div>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:mt-6 lg:hidden">
          <h3 className="font-bold">Email</h3>
          <input
            type="text"
            placeholder="Please enter your email"
            className="border-2 border-gray-300 rounded-lg w-full lg:w-80 px-3 py-2 lg:px-6 lg:py-4 lg:max-w-xs"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 lg:mt-6 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-2 lg:w-1/2">
          <h3 className="font-bold">Password</h3>
          <input
            type="password"
            placeholder="Please enter your password"
            className="border-2 border-gray-300 rounded-lg w-full px-3 py-2 lg:px-6 lg:py-4"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-2 lg:w-1/2">
          <h3 className="font-bold">Confirm Password</h3>
          <input
            type="password"
            placeholder="Please re-enter your password"
            className="border-2 border-gray-300 rounded-lg w-full px-3 py-2 lg:px-6 lg:py-4 lg:max-w-xs"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          {password != confirmPassword ? (
            <p className="text-red-500 text-sm">Password must match</p>
          ) : (
            <div className="h-5"></div>
          )}
        </div>
      </div>

      <div className="lg:flex flex-col gap-2 lg:w-1/2 hidden">
        <h3 className="font-bold">Email</h3>
        <input
          type="text"
          placeholder="Please enter your email"
          className="border-2 border-gray-300 rounded-lg w-full px-3 py-2 lg:px-6 lg:py-4 "
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="flex-row hidden lg:flex items-center justify-center lg:gap-2 w-full mt-3">
        <input type="checkbox" className="w-10 h-5 rounded-md cursor-pointer" />
        <p>
          I have read and aggree to the Terms, Conditions, & Policy Agreements
          from BIST League 6.0
        </p>
      </div>

      <div className="mt-6 lg:mt-2 flex justify-center">
        <div
          className="cursor-pointer px-6 py-2 bg-[#F8A22D] rounded-xl lg:rounded-lg w-[119px] lg:w-[150px] max-w-sm"
          onClick={handleSubmit}
        >
          <h1 className="text-white text-center font-bold">Register</h1>
        </div>
      </div>

      <p className="font-light text-sm lg:hidden text-center block">
        Already have a team account?{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
