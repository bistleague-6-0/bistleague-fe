"use client";
import { useState } from "react";
import { AiOutlineArrowLeft, AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";

import Image from "next/image";

import BulatKiri from "@images/submission/left.svg";
import Link from "next/link";

interface TeamMember {
  user_id: string;
  username: string;
  fullname: string;
  is_leader: boolean;
}

interface TeamData {
  team_id: string;
  team_name: string;
  team_redeem_code: string;
  is_active: boolean;
  payment_proof: string;
  payment_proof_url: string;
  payment_status: string;
  payment_status_code: number;
  student_card: string;
  student_card_url: string;
  student_card_status: string;
  student_card_status_code: number;
  self_portrait: string;
  self_portrait_url: string;
  self_portrait_status: string;
  self_portrait_status_code: number;
  twibbon: string;
  twibbon_url: string;
  twibbon_status: string;
  twibbon_status_code: number;
  enrollment: string;
  enrollment_url: string;
  enrollment_status: string;
  enrollment_status_code: number;
  members: TeamMember[];
}

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
  teamData: TeamData;
  submissionData: SubmissionData;
  jwt_token: string;
}

export default function Submission({
  teamData,
  submissionData,
  jwt_token,
}: SubmissionProps) {
  const [selectedFile, setSelectedFile] = useState("No file selected");
  const [base64, setBase64] = useState("");

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
      doc_type: "submission_1",
      document: base64,
      document_name: selectedFile,
    };

    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_STAGE != "staging"
          ? "https://be-production-b6utdt2kwa-et.a.run.app"
          : "https://be-staging-b6utdt2kwa-et.a.run.app";
      const submit = await axios.post(
        BASE_URL + "/team/document",
        submittedData,
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );
      setSelectedFile("No file selected");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="px-5 py-7">
      <div className="flex text-[#F3EEE7] items-center justify-between mt-8 lg:mt-0 relative z-10">
        <div className="flex items-center gap-3">
          <AiOutlineArrowLeft className="text-2xl lg:text-base" />
          <h1 className="hidden lg:inline font-bold text-base">
            Back to Competition
          </h1>
        </div>
        <h1 className="w-full self-center font-extrabold text-2xl text-center lg:hidden">
          Submission
        </h1>
      </div>

      <h1 className="text-center text-white text-5xl font-bold mb-16 mt-8 hidden lg:block">
        Submission
      </h1>

      <div className="flex items-center justify-center my-8">
        <div className="bg-white py-6 px-5 rounded-lg max-w-[540px] z-10">
          {!submissionData ? (
            <h1 className="text-center text-sm lg:text-xl py-16 px-3 lg:px-10 lg:py-0 lg:pt-16 lg:pb-28 ">
              Preliminary submission must be submitted in PDF format with a
              maximum size of 10MB.
            </h1>
          ) : (
            <div className="lg:px-12 lg:pt-4 lg:pb-10">
              <h1 className="text-center text-sm lg:text-xl mb-5">
                You may do another submission until the deadline.
              </h1>
              <h1 className="text-center text-sm lg:text-xl mb-5">
                Preliminary submission must be submitted in PDF format with a
                maximum size of 10MB.
              </h1>
              <h1 className="text-center text-sm lg:text-xl">
                Last submission:
              </h1>
              <h1 className="text-center text-sm font-bold lg:text-xl mb-6">
                {submissionData.submission_lastupdate}
              </h1>
            </div>
          )}

          <form onSubmit={submitFile}>
            <div className="border border-[#BDBDBD] mb-4 lg:mx-16 p-3.5 rounded text-sm font-medium flex items-center justify-between">
              <Link
                href={submissionData.submission_url}
                className={
                  !submissionData ? "text-[#BDBDBD]" : "text-[#413687]"
                }
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
            <div className="mb-4 lg:mx-16 rounded text-sm font-bold flex items-center">
              <button
                type="submit"
                className="bg-[#413687] px-12 py-3 lg:px-24 rounded-lg cursor-pointer w-full"
              >
                <h1 className="text-white text-center font-bold lg:text-xl">
                  Submit
                </h1>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Image
        src={BulatKiri}
        alt="Hero Round"
        className="scale-75 lg:scale-100 absolute bottom-14 -left-20 lg:bottom-0 lg:left-0 z-0"
      />
    </div>
  );
}
