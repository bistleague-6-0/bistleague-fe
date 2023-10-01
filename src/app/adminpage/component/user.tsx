"use client";
import { MdOpenInNew } from "react-icons/md";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Cookies from "universal-cookie";

export default function UserVerification() {
  const [popupUrl, setPopupUrl] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState<any>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [isRejected, setIsRejected] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [doc, setDoc] = useState("");
  const [uid, setUid] = useState("");
  const [trigger, setTrigger] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("token_admin");
  const handleChange = (event: any) => {
    setTextareaValue(event.target.value);
  };

  const url =
    process.env.NEXT_PUBLIC_STAGE === "production"
      ? "https://be-production-b6utdt2kwa-et.a.run.app/"
      : "https://be-staging-b6utdt2kwa-et.a.run.app/";

  const getData = async (page: number) => {
    try {
      const response = await axios.get(url + "admin/users?page=" + page, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      setTotalPages(response.data?.data?.total_page);
      setData(response.data?.data?.page_data);
      console.log(response.data?.data?.page_data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileData = async (id: string) => {
    try {
      const response = await axios.get(url + "profile/" + id);
      setShowProfile(response.data?.data);
      console.log(response.data?.data);
    } catch (error) {}
  };

  const updateDocs = async (status: number) => {
    try {
      if (status == -1) {
        const response = await axios.put(
          url + "admin/users/status/" + uid,
          {
            status: -1,
            rejection: textareaValue,
            doc_type: doc,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setTrigger(trigger + 1);
        setPopupUrl(null);
        setIsRejected(false);
      }
      if (status == 2) {
        const response = await axios.put(
          url + "admin/users/status/" + uid,
          {
            status: 2,
            doc_type: doc,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setTrigger(trigger + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(1);
  }, [trigger]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getData(page);
  };

  const pushPage = ({ pageNumbers, i }: { pageNumbers: any; i: number }) => {
    pageNumbers.push(
      <div
        key={i}
        className={
          currentPage === i
            ? "text-center bg-[#379392] px-4 py-2 rounded-lg text-white text-[14px] font-bold"
            : "text-center bg-transparent px-4 py-2 rounded-lg border-2 border-[#828282] text-[#828282] text-[14px] font-bold"
        }
        onClick={() => handlePageChange(i)}
      >
        {i}
      </div>
    );
  };

  const renderPage = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (totalPages < 5) {
        pushPage({ pageNumbers, i });
      } else {
        if (currentPage < totalPages - 3) {
          if (
            (i < currentPage + 3 && i >= currentPage - 1) ||
            i == totalPages
          ) {
            pushPage({ pageNumbers, i });
          } else if (i == currentPage + 3) {
            pageNumbers.push(<li>...</li>);
          }
        } else {
          if (i >= totalPages - 3 || i <= totalPages - currentPage + 1) {
            pushPage({ pageNumbers, i });
          } else if (i == totalPages - 4) {
            pageNumbers.push(<li>...</li>);
          }
        }
      }
    }
    return pageNumbers;
  };
  return (
    <>
      <h1 className="font-bold text-[#379392] text-4xl md:text-5xl mt-14 mb-10">
        Data Registrasi User
      </h1>
      <div className="w-full h-auto overflow-auto">
        <table>
          <thead className="bg-[#379392] text-white">
            <tr>
              <th className="px-4 py-5">No</th>
              <th className="px-12">Nama Tim</th>
              <th className="px-12">Nama User</th>
              <th className="px-6">
                Proof of <br />
                Enrolment
              </th>
              <th className="px-6">Student Card</th>
              <th className="px-6">Self Portrait</th>
              <th className="px-6">Twibbon</th>
              <th className="px-6">Profile</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, id: number) => (
              <tr key={id} className="border-b-2 border-[#BDBDBD]">
                <td className="px-4 py-2 text-center">{id + 1}</td>
                <td className="px-12 py-2 text-center">{row.team_name}</td>
                <td className="px-12 py-2">{row.full_name}</td>

                <td className="px-6 py-2">
                  <button
                    className="bg-[#40A89F] rounded-lg flex items-center gap-1 text-white px-4 py-1 z-20"
                    onClick={() => {
                      setPopupUrl(row.enrollment_url);
                      setUid(row.uid);
                      setDoc("enrollment");
                    }}
                  >
                    <p className="text-white">Open</p>
                    <MdOpenInNew />
                  </button>
                  <div
                    className={`flex items-center ${
                      row.enrollment_status == "accepted"
                        ? "text-[#27AE60]"
                        : row.enrollment_status == "rejected"
                        ? "text-[#EB5757]"
                        : row.enrollment_status == "under review"
                        ? "text-[#E2B93B]"
                        : "text-[#4F4F4F]"
                    }`}
                  >
                    <HiOutlineInformationCircle />
                    <p className="text-[14px]">{row.enrollment_status}</p>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <button
                    className="bg-[#40A89F] rounded-lg flex items-center gap-1 text-white px-4 py-1"
                    onClick={() => {
                      setPopupUrl(row.student_card_url);
                      setUid(row.uid);
                      setDoc("student_card");
                    }}
                  >
                    <p className="text-white">Open</p>
                    <MdOpenInNew />
                  </button>
                  <div
                    className={`flex items-center ${
                      row.student_card_status == "accepted"
                        ? "text-[#27AE60]"
                        : row.student_card_status == "rejected"
                        ? "text-[#EB5757]"
                        : row.student_card_status == "under review"
                        ? "text-[#E2B93B]"
                        : "text-[#4F4F4F]"
                    }`}
                  >
                    <HiOutlineInformationCircle />
                    <p className="text-[14px]">{row.student_card_status}</p>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <button
                    className="bg-[#40A89F] rounded-lg flex items-center gap-1 text-white px-4 py-1"
                    onClick={() => {
                      setPopupUrl(row.self_portrait_url);
                      setUid(row.uid);
                      setDoc("self_portrait");
                    }}
                  >
                    <p className="text-white">Open</p>
                    <MdOpenInNew />
                  </button>
                  <div
                    className={`flex items-center ${
                      row.self_portrait_status == "accepted"
                        ? "text-[#27AE60]"
                        : row.self_portrait_status == "rejected"
                        ? "text-[#EB5757]"
                        : row.self_portrait_status == "under review"
                        ? "text-[#E2B93B]"
                        : "text-[#4F4F4F]"
                    }`}
                  >
                    <HiOutlineInformationCircle />
                    <p className="text-[14px]">{row.self_portrait_status}</p>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <button
                    className="bg-[#40A89F] rounded-lg flex items-center gap-1 text-white px-4 py-1"
                    onClick={() => {
                      setPopupUrl(row.twibbon_url);
                      setUid(row.uid);
                      setDoc("twibbon");
                    }}
                  >
                    <p className="text-white">Open</p>
                    <MdOpenInNew />
                  </button>
                  <div
                    className={`flex items-center ${
                      row.twibbon_status == "accepted"
                        ? "text-[#27AE60]"
                        : row.twibbon_status == "rejected"
                        ? "text-[#EB5757]"
                        : row.twibbon_status == "under review"
                        ? "text-[#E2B93B]"
                        : "text-[#4F4F4F]"
                    }`}
                  >
                    <HiOutlineInformationCircle />
                    <p className="text-[14px]">{row.twibbon_status}</p>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <button
                    className="bg-[#40A89F] rounded-lg flex items-center gap-1 text-white px-4 py-1"
                    onClick={() => getProfileData(row.uid)}
                  >
                    <p className="text-white">Open</p>
                    <MdOpenInNew />
                  </button>
                  <div
                    className={`flex items-center ${
                      row.IsProfileVerified
                        ? "text-[#27AE60]"
                        : "text-[#EB5757]"
                    }`}
                  >
                    <HiOutlineInformationCircle />
                    <p className="text-[14px]">
                      {row.IsProfileVerified ? "Complete" : "Incomplete"}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-end mt-4">
          <div className="flex items-center gap-3">{renderPage()}</div>
        </div>
      </div>
      {popupUrl && (
        <>
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-60"
            onClick={() => setPopupUrl(null)}
          ></div>
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
            <div className="w-[300px] md:w-[360px] bg-[#F3EEE7] flex flex-col items-center px-4 py-6 gap-6 rounded-lg">
              <div className="w-full flex justify-start text-[#3A9587]">
                <button onClick={() => setPopupUrl(null)}>
                  <AiOutlineArrowLeft size={24} />
                </button>
              </div>
              <Image src={popupUrl} width={200} height={200} alt="" />
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="text-white bg-[#3AD820] rounded-lg px-8 py-2"
                  onClick={() => {
                    setPopupUrl(null);
                    updateDocs(2);
                  }}
                >
                  Verify
                </button>
                <button
                  type="submit"
                  className="text-white bg-[#E22727] rounded-lg px-8 py-2"
                  onClick={() => setIsRejected(true)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {isRejected && (
        <>
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-60"
            onClick={() => setPopupUrl(null)}
          ></div>
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
            <div className="w-[300px] md:w-[360px] bg-[#F3EEE7] flex flex-col items-center px-4 py-6 gap-6 rounded-lg">
              <div className="w-full flex justify-start text-[#3A9587]">
                <button onClick={() => setIsRejected(false)}>
                  <AiOutlineArrowLeft size={24} />
                </button>
              </div>
              <p className="text-[#379392] text-[28px] lg:text-[32px] font-bold text-center">
                Alasan Penolakan
              </p>
              <div className="w-full flex justify-center px-4">
                <textarea
                  value={textareaValue}
                  onChange={handleChange}
                  placeholder="Masukkan alasan penolakan"
                  rows={5}
                  cols={40}
                  className="border border-gray-400 rounded p-4 bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-[#379392] rounded-lg px-8 py-2"
                onClick={() => updateDocs(-1)}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
      {showProfile && (
        <>
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-60"
            onClick={() => setShowProfile(null)}
          ></div>
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
            <div className="md:w-1/2 w-full bg-[#F3EEE7] flex flex-col items-center px-6 py-6 gap-2 rounded-lg">
              <div className="w-full flex justify-start">
                <p className="font-bold text-[#379392] text-[32px]">
                  Personal Information
                </p>
              </div>
              <div className="w-full h-1 bg-[#379392] mb-2"></div>
              <div className="w-full flex justify-between mb-3">
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">
                    Full Name
                  </p>
                  <p className="text-black text-[18px]">
                    {showProfile.full_name}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">
                    Username
                  </p>
                  <p className="text-black text-[18px]">
                    {showProfile.username}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between mb-3">
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">Email</p>
                  <p className="text-black text-[18px]">{showProfile.email}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">Age</p>
                  <p className="text-black text-[18px]">{showProfile.age}</p>
                </div>
              </div>
              <div className="w-full flex justify-between mb-3">
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">
                    Address
                  </p>
                  <p className="text-black text-[18px]">
                    {showProfile.address}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">
                    Phone Number
                  </p>
                  <p className="text-black text-[18px]">
                    {showProfile.phone_number}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between mb-3">
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">
                    Institution
                  </p>
                  <p className="text-black text-[18px]">
                    {showProfile.institution}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">
                    LinkedIn
                  </p>
                  <p className="text-black text-[18px]">
                    {showProfile.linkedin_url}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between mb-3">
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">Major</p>
                  <p className="text-black text-[18px]">{showProfile.major}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">
                    ID Line
                  </p>
                  <p className="text-black text-[18px]">
                    {showProfile.line_id}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="flex flex-col">
                  <p className="font-bold text-[#379392] text-[24px]">
                    Entry Year
                  </p>
                  <p className="text-black text-[18px]">
                    {showProfile.entry_year}
                  </p>
                </div>
                <button
                  type="submit"
                  className="text-white bg-[#379392] rounded-lg px-12 py-2"
                  onClick={() => setShowProfile(null)}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
