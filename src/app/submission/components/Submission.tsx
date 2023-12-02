"use client";
import { useState } from "react";
import { AiOutlineArrowLeft, AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";

import Image from "next/image";

import BulatKiri from "@images/submission/left.svg";
import Cookies from "universal-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SubmittedData {
  doc_type: string;
  document: string;
  document_name: string;
}

interface SubmissionData {
  team_id: string;
  doc_type: string;
  submission_filename: string;
  submission_url: string;
  submission_lastupdate: string;
}

interface SubmissionProps {
  submissionData: SubmissionData;
  jwt_token: string;
  refresh: string;
  user_id: string;
}

export default function Submission({
  submissionData,
  jwt_token,
  refresh,
  user_id,
}: SubmissionProps) {
  const router = useRouter();
  const cookie = new Cookies();
  const [selectedFile, setSelectedFile] = useState("No file selected");
  const [base64, setBase64] = useState("");
  const BASE_URL =
    process.env.NEXT_PUBLIC_STAGE != "staging"
      ? "https://be-production-b6utdt2kwa-et.a.run.app"
      : "https://be-staging-b6utdt2kwa-et.a.run.app";

  const fileChangedHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const reader = new FileReader();
    setSelectedFile(e.target.files[0].name);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64Content = reader.result.split(",")[1];
        setBase64(base64Content);
      }
    };
  };

  const submitFile = async () => {
    const submittedData: SubmittedData = {
      doc_type: "submission_2",
      document: base64,
      document_name: selectedFile,
    };

    try {
      const submit = await axios.post(
        BASE_URL + "/team/document",
        submittedData,
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );
      console.log(submit);
      router.refresh();
      toast.success("Submit successfull");
      setSelectedFile("No file selected");
    } catch (error) {
      const errorResponse = error as {
        response: { status: number; data: { message: string } };
      };
      if (errorResponse.response.status === 401) {
        const response2 = await axios.post(BASE_URL + "/refresh", {
          refresh_token: refresh,
          user_id: user_id,
        });
        cookie.remove("jwt_token", { path: "/" });
        cookie.set("jwt_token", response2.data.data.jwt_token, { path: "/" });
        router.refresh();
      }
    }
  };
  return (
    <div className="px-5 py-7">
      <div className="flex text-[#F3EEE7] items-center justify-between mt-8 lg:mt-0 relative z-10">
        <Link href="/competition" className="flex items-center gap-3">
          <AiOutlineArrowLeft className="text-2xl lg:text-base" />
          <h1 className="hidden text-base font-bold lg:inline">
            Back to Competition
          </h1>
        </Link>
        <h1 className="self-center w-full text-2xl font-extrabold text-center lg:hidden">
          Submission
        </h1>
      </div>

      <h1 className="hidden mt-8 mb-16 text-5xl font-bold text-center text-white lg:block">
        Submission
      </h1>

      <div className="flex items-center justify-center my-8">
        <div className="bg-white py-6 px-5 rounded-lg max-w-[540px] z-10">
          {!submissionData ? (
            <h1 className="px-3 py-16 text-sm text-center lg:text-xl lg:px-10 lg:py-0 lg:pt-16 lg:pb-28 ">
              Preliminary submission must be submitted in PDF format with a
              maximum size of 10MB.
            </h1>
          ) : (
            <div className="lg:px-12 lg:pt-4 lg:pb-10">
              <h1 className="mb-5 text-sm text-center lg:text-xl">
                You may do another submission until the deadline.
              </h1>
              <h1 className="mb-5 text-sm text-center lg:text-xl">
                Preliminary submission must be submitted in PDF format with a
                maximum size of 10MB.
              </h1>
              <h1 className="text-sm text-center lg:text-xl">
                Last submission:
              </h1>
              <h1 className="mb-6 text-sm font-bold text-center lg:text-xl">
                {submissionData.submission_lastupdate}
              </h1>
            </div>
          )}

          <div className="border border-[#BDBDBD] mb-4 lg:mx-16 p-3.5 rounded text-sm font-medium flex items-center justify-between">
            <Link
              href={submissionData?.submission_url || ""}
              className={!submissionData ? "text-[#BDBDBD]" : "text-[#413687]"}
            >
              {submissionData ? submissionData.submission_filename : "Empty"}
            </Link>
            <AiFillCheckCircle
              className={
                !submissionData
                  ? "hidden"
                  : "inline-block ml-2 text-[#27ae60] w-6 h-6"
              }
            />
          </div>
          <div className="flex flex-row items-center border lg:mx-16 mb-6 border-[#BDBDBD] stroke-1 rounded justify-between pr-1 pl-2.5 py-1.5">
            <label className="text-sm text-[#4F4F4F] font-medium">
              {selectedFile}
            </label>
            <input
              type="file"
              id="custom-input"
              onChange={fileChangedHandler}
              hidden
            />
            <label
              htmlFor="custom-input"
              className="block text-white ml-4 py-2.5 px-5 rounded-md border-0 text-sm font-semibold bg-[#413687] cursor-pointer"
            >
              {!submissionData ? "Upload" : "Reupload"}
            </label>
          </div>
          <div className="flex items-center mb-4 text-sm font-bold rounded lg:mx-16">
            <button
              type="submit"
              className="bg-[#413687] px-12 py-3 lg:px-24 rounded-lg cursor-pointer w-full"
            >
              <h1
                className="font-bold text-center text-white lg:text-xl"
                onClick={submitFile}
              >
                Submit
              </h1>
            </button>
          </div>
        </div>
      </div>
      <Image
        src={BulatKiri}
        alt="Hero Round"
        className="absolute z-0 scale-75 lg:scale-100 bottom-14 -left-20 lg:bottom-0 lg:left-0"
      />
    </div>
  );
}
