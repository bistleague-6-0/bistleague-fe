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
  const [enrollfile, setEnrollFile] = useState<File>();
  const [studentfile, setStudentFile] = useState<File>();
  const [selfFile, setSelfFile] = useState<File>();
  const [twibbonfile, setTwibbonFile] = useState<File>();
  const [docType, setDocType] = useState("");

  const [data, setData] = useState<any | null>();
  const [isLoading, setisLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);

  const [date, setDate] = useState("October 22, 2023 23:59:59");
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
      setDate("November 5, 2023 23:59:59");
    } else if (fase == 3) {
      setDate("November 19, 2023 00:00:00");
    } else if (fase == 4) {
      setDate("December 2, 2023 17:59:59");
    } else if (fase == 5) {
      setDate("December 3, 2023 06:00:00");
    } else {
      setDate("December 20, 2023 00:00:00");
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
      toast.success("Upload data berhasil");
    } catch (error) {
      console.log(error);
      toast.error("Gagal upload. Silahkan upload ulang");
      setTrigger(trigger + 1);
    }
  };

  const handleFileRejected = (fileRejections: FileRejection[]) => {};

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
                    ? "Preliminary Submission Closes in"
                    : fase == 4
                    ? "Finalist Announcement in"
                    : fase == 5
                    ? "Final starts in"
                    : fase == 6
                    ? "Submission Final close in"
                    : ""}
                </p>
                <CountDown date={date} />
                <div className="flex justify-center w-full gap-4 mt-5">
                  <button
                    className="flex justify-center bg-white border-2 border-[#379392] rounded-lg text-[12px] lg:text-[16px] text-[#379392] font-extrabold px-6 lg:px-12 py-3"
                    onClick={() => downloadpdf()}
                  >
                    {fase >= 1 && fase <= 3
                      ? "Download Guidebook"
                      : "Download Final Guidebook"}
                  </button>
                  <button
                    className={`${
                      fase == 1 || fase == 5 ? "hidden" : ""
                    } flex justify-center bg-[#379392] rounded-lg text-[12px] lg:text-[16px] text-white font-extrabold px-6 lg:px-14 py-3`}
                  >
                    Upload Submission
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
                        <BiUpload size={24} />
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
                      Proof of Enrollment
                    </p>
                    <div className="flex flex-wrap gap-2 items-center text-[#27AE60]">
                      <Dropzone
                        onFileSelected={(e: File) => {
                          setEnrollFile(e);
                          handleFileSelected(e);
                          setFileName(e.name);
                        }}
                        onFileRejected={handleFileRejected}
                        onFileDeleted={() => setEnrollFile(undefined)}
                        name={data.enrollment}
                      />
                      <button
                        onClick={() => {
                          setDocType("enrollment");
                          setIsNotice(true);
                        }}
                        className="bg-[#379392] px-2 py-2 text-center rounded-lg text-white block"
                      >
                        <BiUpload size={24} />
                      </button>
                      {data && data.enrollment_status == "under review" ? (
                        <div className="flex items-center gap-2 text-[#E2B93B]">
                          <PiWarningCircleFill size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Under Review
                          </p>
                        </div>
                      ) : data && data.enrollment_status == "accepted" ? (
                        <div className="flex items-center gap-2 text-[#27AE60]">
                          <BsFillCheckCircleFill size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Accepted
                          </p>
                        </div>
                      ) : data && data.enrollment_status == "rejected" ? (
                        <div className="flex items-center gap-2 text-[#EB5757]">
                          <MdCancel size={24} />
                          <p className="text-[12px] lg:text-[16px] font-normal">
                            Rejected - Please resubmit <br />
                            Note : {data.enrollment_rejection}
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
                      Student Card
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
                        <BiUpload size={24} />
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
                        <BiUpload size={24} />
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
                        <BiUpload size={24} />
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
