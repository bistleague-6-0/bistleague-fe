"use client";
import { useState, useEffect } from "react";
import CountDown from "../component/countdown";
import Dropzone from "../component/dropzone";
import NavUser from "../component/nav";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { PiWarningCircleFill } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { BiUpload } from "react-icons/bi";
import { FileRejection } from "react-dropzone";
import Cookies from "universal-cookie";
import axios from "axios";
import LoadingPage from "../component/loadingPage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

interface SubmittedData {
  doc_type: string;
  document: string;
  document_name: string;
}

export default function CompetitionUser() {
  const router = useRouter();
  const [paymentFile, setPaymentFile] = useState<File>();
  const [studentfile, setStudentFile] = useState<File>();
  const [selfFile, setSelfFile] = useState<File>();
  const [twibbonfile, setTwibbonFile] = useState<File>();
  const [docType, setDocType] = useState("");

  const [data, setData] = useState<any | null>();
  const [isLoading, setisLoading] = useState(true);
  const [isFileLoading, setisFileLoading] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const [date, setDate] = useState("October 22, 2023 00:00:00");
  const [fase, setFase] = useState(1);

  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [isNotice, setIsNotice] = useState(false);
  // const [fullName, setFullName] = useState("");
  // const [isLeader, setIsLeader] = useState(-1);

  const cookie = new Cookies();
  const token = cookie.get("jwt_token");
  useEffect(() => {
    if (token === undefined) {
      router.push("/login");
    }
  }, [token, router]);
  const refresh = cookie.get("refresh");
  const user_id = cookie.get("user_id");
  // console.log(token);
  const url =
    process.env.NEXT_PUBLIC_STAGE != "staging"
      ? "https://be-production-b6utdt2kwa-et.a.run.app/"
      : "https://be-staging-b6utdt2kwa-et.a.run.app/";

  const now = new Date().getTime();
  const target = new Date(date).getTime();

  const handleCopy = (content: any) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  const handleFileSelected = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64Content = reader.result.split(",")[1];
        setBase64(base64Content);
      }
    };

    reader.readAsDataURL(file);
  };

  if (now > target) {
    const temp = fase + 1;
    setFase(temp);
    if (fase == 2) {
      setDate("October 30, 2023 00:00:00");
    } else if (fase == 3) {
      setDate("November 5, 2023 23:59:59");
    } else if (fase == 4) {
      setDate("November 19, 2023 00:00:00");
    } else if (fase == 5) {
      setDate("December 2, 2023 00:00:00");
    } else if (fase == 6){
      setDate("December 3, 2023 23:59:59");
    }
  }

  const getTeamData = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(url + "team", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data.data);
      setData(response.data.data);
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

  const uploadFile = async () => {
    setisFileLoading(true);
    if (paymentFile && paymentFile.type === "application/pdf") {
      toast.error("PDF files are not allowed. Please upload image files only.");
      setTrigger(trigger + 1);
      setisFileLoading(false);
      return;
    } else if (studentfile && studentfile.type === "application/pdf") {
      toast.error("PDF files are not allowed. Please upload image files only.");
      setTrigger(trigger + 1);
      setisFileLoading(false);
      return;
    } else if (selfFile && selfFile.type === "application/pdf") {
      toast.error("PDF files are not allowed. Please upload image files only.");
      setTrigger(trigger + 1);
      setisFileLoading(false);
      return;
    } else if (twibbonfile && twibbonfile.type === "application/pdf") {
      toast.error("PDF files are not allowed. Please upload image files only.");
      setTrigger(trigger + 1);
      setisFileLoading(false);
      return;
    }
    const submittedData: SubmittedData = {
      doc_type: docType,
      document: base64,
      document_name: fileName,
    };
    try {
      const response = await axios.post(url + "team/document", submittedData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      setTrigger(trigger + 1);
      toast.success("Upload data success");
    } catch (error) {
      console.log(error);
      toast.error("Upload data failed. Please try again");
      setTrigger(trigger + 1);
    } finally {
      setisFileLoading(false);
    }
  };

  const handleFileRejected = (fileRejections: FileRejection[]) => {
    const rejectedFiles = fileRejections.map(
      (rejectedFile) => rejectedFile.file
    );

    const pdfFiles = rejectedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    if (pdfFiles.length > 0) {
      toast.error("PDF files are not allowed. Please upload image files only.");
    }
  };

  useEffect(() => {
    getTeamData();
  }, [trigger, token]);

  const downloadpdf = () => {
    const pdfUrl = "/guidebook.pdf"; // Replace with your PDF file URL
    const url = "https://gacor.bistleague.com/guidebook.pdf";
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        // link.target = "_blank";
        link.download = "Guidebook.pdf"; // Desired file name for the downloaded PDF
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  return (
    <>
      <LoadingPage isLoad={isLoading} />
      {isNotice ? (
        <>
          <div className="fixed w-screen h-screen bg-black opacity-60"></div>
          <div className="fixed flex items-center justify-center w-screen h-screen">
            <div className="w-[390px] md:w-[600px] bg-white rounded-lg px-8 py-6">
              <p className="text-[32px] font-bold">Notice</p>
              <p className="text-[16px]">
                By checking this option, you consent that the information will
                be under possession of BIST League 6.0’s committee.
              </p>
              <div className="flex justify-center w-full gap-4 mt-8">
                <button
                  onClick={() => {
                    uploadFile();
                    setIsNotice(false);
                  }}
                  className="w-[128px] md:w-[225px] flex justify-center py-2 bg-[#379392] text-white rounded-lg"
                >
                  Agree
                </button>
                <button
                  onClick={() => setIsNotice(false)}
                  className="w-[128px] md:w-[225px] flex justify-center py-2 text-[#379392] bg-white border-2 border-[#379392] rounded-lg"
                >
                  Disagree
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {data ? (
        <>
          <div className="w-full flex flex-col lg:flex-row bg-[#F3EEE7]">
            <NavUser active={2} />
            <div className="flex flex-col w-full gap-5 px-6 py-6 lg:px-10 lg:py-10">
              <p className="text-[24px] lg:text-[32px] font-extrabold text-center lg:text-start">
                Business IT Case Competition
              </p>
              <div
                className={`w-full bg-white flex flex-col items-center rounded-lg gap-2 py-4 px-5 lg:px-2 ${
                  fase == 4 || fase == 7 ? "hidden" : ""
                }`}
              >
                <p className="text-[16px] lg:text-[24px] text-center mb-2">
                  {fase == 1
                    ? "Competition starts in"
                    : fase == 3
                    ? "Preliminary Submission Starts in"
                    : fase == 4
                    ? "Preliminary Submission Closes in"
                    : fase == 5
                    ? "Finalist Announcement in"
                    : fase == 6
                    ? "Final starts in"
                    : fase == 7 ? "Submission Final close in" : ""}
                </p>
                <CountDown date={date} />
                <div className="flex justify-center w-full gap-4 mt-5">
                  <button
                    className="flex justify-center bg-white border-2 border-[#379392] rounded-lg text-[12px] lg:text-[16px] text-[#379392] font-extrabold px-6 lg:px-12 py-3"
                    onClick={() =>
                      window.open(
                        "https://drive.google.com/file/d/1_ccLEBqGZ1BZo8C6Rf9VclMyBgh-xLGL/view",
                        "_blank"
                      )
                    }
                  >
                    {fase >= 1 && fase <= 4
                      ? "Download Guidebook"
                      : "Download Final Guidebook"}
                  </button>
                  <button
                    className={`${
                      fase == 4 ? "" : "hidden"
                    } flex justify-center bg-[#379392] rounded-lg text-[12px] lg:text-[16px] text-white font-extrabold px-6 lg:px-14 py-3`}
                  >
                    Upload Submission
                  </button>
                  <button
                    className={`${
                      fase == 3 || fase == 4 ? "" : "hidden"
                    } flex justify-center bg-[#379392] rounded-lg text-[12px] lg:text-[16px] text-white font-extrabold px-6 lg:px-14 py-3`}
                    onClick={() => {data && data.payment_status == "accepted" ? window.open(
                      "https://drive.google.com/file/d/1jOqp8mn8a_5nVc_-5JuUkGg5nNpWRtmO/view",
                      "_blank"
                    ): toast.error("Please complete payment first to open case")}
                      
                    }
                  >
                    Download Case
                  </button>
                </div>
              </div>
              <p className="text-[24px] lg:text-[32px] font-extrabold text-center lg:text-start">
                Team Profile
              </p>
              <div className="flex flex-col items-center w-full gap-6 px-6 py-6 bg-white rounded-lg md:py-8 md:px-12">
                <div className="flex items-center justify-between w-full">
                  <p className="text-[20px] lg:text-[24px] font-bold">
                    {data && data.team_name}
                  </p>
                  <button
                    onClick={() => handleCopy(data.team_redeem_code)}
                    className={`
                 flex justify-center items-center bg-white border-2 border-[#379392] rounded-lg text-[12px] lg:text-[16px] text-[#379392] font-extrabold px-1 lg:px-6 py-3 active:bg-slate-100`}
                  >
                    Invitation Token:{" "}
                    <span className="font-normal">
                      {data && data.team_redeem_code}
                    </span>
                  </button>
                </div>
                <div className="flex flex-wrap justify-center w-full gap-6">
                  <div className="w-[150px] lg:w-[250px] flex flex-col bg-[#F3EEE7] rounded-lg gap-1 px-5 py-5">
                    <p className="text-[16px] lg:text-[20px] font-bold">
                      {data && data.members[0].fullname}
                    </p>
                    <div className="w-full flex justify-between items-center text-[#27AE60]">
                      <p className="text-[12px] lg:text-[16px] font-normal text-black">
                        Required Documents
                      </p>
                      {data && data.members[0].is_doc_verified ? (
                        <BsFillCheckCircleFill size={20} />
                      ) : (
                        <div className="text-[#EB5757]">
                          <MdCancel size={24} />
                        </div>
                      )}
                    </div>
                    <div className="w-full flex justify-between items-center text-[#27AE60]">
                      <p className="text-[12px] lg:text-[16px] font-normal text-black">
                        Personal Information
                      </p>
                      {data && data.members[0].is_profile_verified ? (
                        <BsFillCheckCircleFill size={20} />
                      ) : (
                        <div className="text-[#EB5757]">
                          <MdCancel size={24} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-[150px] lg:w-[250px] flex flex-col bg-[#F3EEE7] rounded-lg gap-1 px-5 py-5">
                    {data && data.members.length == 1 ? (
                      <p className="text-[16px] lg:text-[20px] font-bold">
                        Belum Daftar
                      </p>
                    ) : (
                      <>
                        <p className="text-[16px] lg:text-[20px] font-bold">
                          {data && data.members[1].fullname}
                        </p>
                        <div className="w-full flex justify-between items-center text-[#27AE60]">
                          <p className="text-[12px] lg:text-[16px] font-normal text-black">
                            Required Documents
                          </p>
                          {data && data.members[1].is_doc_verified ? (
                            <BsFillCheckCircleFill size={20} />
                          ) : (
                            <div className="text-[#EB5757]">
                              <MdCancel size={24} />
                            </div>
                          )}
                        </div>
                        <div className="w-full flex justify-between items-center text-[#27AE60]">
                          <p className="text-[12px] lg:text-[16px] font-normal text-black">
                            Personal Information
                          </p>
                          {data && data.members[1].is_profile_verified ? (
                            <BsFillCheckCircleFill size={20} />
                          ) : (
                            <div className="text-[#EB5757]">
                              <MdCancel size={24} />
                            </div>
                          )}
                        </div>{" "}
                      </>
                    )}
                  </div>
                  <div className="w-[150px] lg:w-[250px] flex flex-col bg-[#F3EEE7] rounded-lg gap-1 px-5 py-5">
                    {data && data.members.length <= 2 ? (
                      <p className="text-[16px] lg:text-[20px] font-bold">
                        Belum Daftar
                      </p>
                    ) : (
                      <>
                        <p className="text-[16px] lg:text-[20px] font-bold">
                          {data && data.members[2].fullname}
                        </p>
                        <div className="w-full flex justify-between items-center text-[#27AE60]">
                          <p className="text-[12px] lg:text-[16px] font-normal text-black">
                            Required Documents
                          </p>
                          {data && data.members[2].is_doc_verified ? (
                            <BsFillCheckCircleFill size={20} />
                          ) : (
                            <div className="text-[#EB5757]">
                              <MdCancel size={24} />
                            </div>
                          )}
                        </div>
                        <div className="w-full flex justify-between items-center text-[#27AE60]">
                          <p className="text-[12px] lg:text-[16px] font-normal text-black">
                            Personal Information
                          </p>
                          {data && data.members[2].is_profile_verified ? (
                            <BsFillCheckCircleFill size={20} />
                          ) : (
                            <div className="text-[#EB5757]">
                              <MdCancel size={24} />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-[24px] lg:text-[32px] font-extrabold text-center lg:text-start">
                Required Documents
              </p>
              <div className="flex flex-col w-full gap-6 px-6 py-6 bg-white rounded-lg md:py-8 md:px-12">
                {data && (
                  <div className={`flex flex-col gap-1`}>
                    <p className="mt-6">Payment to one of the options:</p>
                    <p>1. 1420018978022 Bank Mandiri an Rania Sasi Kirana</p>
                    <p className="font-bold text-[16px] lg:text-[24px] mt-3">
                      Proof of Payment (Only for Leaders)
                    </p>
                    <div className="flex flex-wrap gap-2 items-center text-[#27AE60]">
                      <Dropzone
                        onFileSelected={(e: File) => {
                          handleFileSelected(e);
                          setPaymentFile(e);
                          setFileName(e.name);
                        }}
                        onFileRejected={handleFileRejected}
                        onFileDeleted={() => setPaymentFile(undefined)}
                        name={data.payment_proof}
                      />
                      <button
                        className="bg-[#379392] px-2 py-2 text-center rounded-lg text-white block"
                        onClick={() => {
                          setDocType("payment");
                          setIsNotice(true);
                        }}
                      >
                        {isFileLoading && docType == 'payment'? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="w-6 h-6 text-white animate-spin dark:text-white fill-[#EB5757]"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <BiUpload size={24} />
                        )}
                      </button>
                      {data && data.payment_status == "under review" ? (
                        <div className="flex items-center gap-2 text-[#E2B93B]">
                          <PiWarningCircleFill size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Under Review
                          </p>
                        </div>
                      ) : data && data.payment_status == "accepted" ? (
                        <div className="flex items-center gap-2 text-[#27AE60]">
                          <BsFillCheckCircleFill size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Accepted
                          </p>
                        </div>
                      ) : data && data.payment_status == "rejected" ? (
                        <div className="flex items-center gap-2 text-[#EB5757]">
                          <MdCancel size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Rejected - Please resubmit <br />
                            Note : {data.payment_status_rejection}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[#4F4F4F]">
                          <MdCancel size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            No File
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {data && (
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-[16px] lg:text-[24px]">
                      Proof of Active Student
                    </p>
                    <div className="flex flex-wrap gap-2 items-center text-[#27AE60]">
                      <Dropzone
                        onFileSelected={(e: File) => {
                          setStudentFile(e);
                          handleFileSelected(e);
                          setFileName(e.name);
                        }}
                        onFileRejected={handleFileRejected}
                        onFileDeleted={() => setStudentFile(undefined)}
                        name={data.student_card}
                      />
                      <button
                        onClick={() => {
                          setDocType("student_card");
                          setIsNotice(true);
                        }}
                        className="bg-[#379392] px-2 py-2 text-center rounded-lg text-white block"
                      >
                        {isFileLoading && docType == "student_card" ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="w-6 h-6 text-white animate-spin dark:text-white fill-[#EB5757]"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <BiUpload size={24} />
                        )}
                      </button>
                      {data && data.student_card_status == "under review" ? (
                        <div className="flex items-center gap-2 text-[#E2B93B]">
                          <PiWarningCircleFill size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Under Review
                          </p>
                        </div>
                      ) : data && data.student_card_status == "accepted" ? (
                        <div className="flex items-center gap-2 text-[#27AE60]">
                          <BsFillCheckCircleFill size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Accepted
                          </p>
                        </div>
                      ) : data && data.student_card_status == "rejected" ? (
                        <div className="flex items-center gap-2 text-[#EB5757]">
                          <MdCancel size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Rejected - Please resubmit <br />
                            Note : {data.student_card_rejection}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[#4F4F4F]">
                          <MdCancel size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            No File
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {data && (
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-[16px] lg:text-[24px]">
                      Self of Portrait
                    </p>
                    <div className="flex flex-wrap gap-2 items-center text-[#27AE60]">
                      <Dropzone
                        onFileSelected={(e: File) => {
                          setSelfFile(e);
                          handleFileSelected(e);
                          setFileName(e.name);
                        }}
                        onFileRejected={handleFileRejected}
                        onFileDeleted={() => setSelfFile(undefined)}
                        name={data.self_portrait}
                      />
                      <button
                        onClick={() => {
                          setDocType("self_portrait");
                          setIsNotice(true);
                        }}
                        className="bg-[#379392] px-2 py-2 text-center rounded-lg text-white block"
                      >
                        {isFileLoading && docType == "self_portrait"? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="w-6 h-6 text-white animate-spin dark:text-white fill-[#EB5757]"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <BiUpload size={24} />
                        )}
                      </button>
                      {data && data.self_portrait_status == "under review" ? (
                        <div className="flex items-center gap-2 text-[#E2B93B]">
                          <PiWarningCircleFill size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Under Review
                          </p>
                        </div>
                      ) : data && data.self_portrait_status == "accepted" ? (
                        <div className="flex items-center gap-2 text-[#27AE60]">
                          <BsFillCheckCircleFill size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Accepted
                          </p>
                        </div>
                      ) : data && data.self_portrait_status == "rejected" ? (
                        <div className="flex items-center gap-2 text-[#EB5757]">
                          <MdCancel size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Rejected - Please resubmit <br />
                            Note : {data.self_portrait_rejection}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[#4F4F4F]">
                          <MdCancel size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            No File
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {data && (
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-[16px] lg:text-[24px]">
                      Proof of Twibbon
                    </p>
                    <div className="flex flex-wrap gap-2 items-center text-[#27AE60]">
                      <Dropzone
                        onFileSelected={(e: File) => {
                          setTwibbonFile(e);
                          handleFileSelected(e);
                          setFileName(e.name);
                        }}
                        onFileRejected={handleFileRejected}
                        onFileDeleted={() => setTwibbonFile(undefined)}
                        name={data.twibbon}
                      />
                      <button
                        onClick={() => {
                          setDocType("twibbon");
                          setIsNotice(true);
                        }}
                        className="bg-[#379392] px-2 py-2 text-center rounded-lg text-white block"
                      >
                        {isFileLoading && docType == "twibbon"? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="w-6 h-6 text-white animate-spin dark:text-white fill-[#EB5757]"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <BiUpload size={24} />
                        )}
                      </button>
                      {data && data.twibbon_status == "under review" ? (
                        <div className="flex items-center gap-2 text-[#E2B93B]">
                          <PiWarningCircleFill size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Under Review
                          </p>
                        </div>
                      ) : data && data.twibbon_status == "accepted" ? (
                        <div className="flex items-center gap-2 text-[#27AE60]">
                          <BsFillCheckCircleFill size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Accepted
                          </p>
                        </div>
                      ) : data && data.twibbon_status == "rejected" ? (
                        <div className="flex items-center gap-2 text-[#EB5757]">
                          <MdCancel size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Rejected - Please resubmit <br />
                            Note : {data.twibbon_rejection}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[#4F4F4F]">
                          <MdCancel size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            No File
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col lg:flex-row bg-[#F3EEE7]">
            <NavUser active={2} />
            <div className="flex flex-col w-full gap-5 px-6 py-6 lg:px-10 lg:py-10">
              <p className="text-[24px] lg:text-[32px] font-extrabold text-center lg:text-start">
                Business IT Case Competition
              </p>
              <div className="flex flex-col items-center justify-center w-full gap-6 px-6 py-6 bg-white rounded-lg md:py-8 md:px-12">
                <p className="text-[16px] lg:text-[24px] text-center mb-2">
                  You have not registered
                </p>
                <button
                  onClick={() => router.push("/compregistration")}
                  className={`
                flex justify-center items-center bg-white border-2 border-[#379392] rounded-lg text-[12px] lg:text-[16px] text-[#379392] font-extrabold px-1 lg:px-6 py-3`}
                >
                  Register now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
