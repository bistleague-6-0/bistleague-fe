"use client";
import { MdOpenInNew } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default function PaymentVerification() {
  const [popupUrl, setPopupUrl] = useState<string | null>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [isRejected, setIsRejected] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [teamId, setTeamId] = useState("");
  const [trigger, setTrigger] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("token_admin");
  const handleChange = (event: any) => {
    setTextareaValue(event.target.value);
  };

  const url =
    process.env.NODE_ENV === "production"
      ? "https://be-production-b6utdt2kwa-et.a.run.app/"
      : "https://be-staging-b6utdt2kwa-et.a.run.app/";

  const getData = async (page: number) => {
    try {
      const response = await axios.get(url + "admin/payments?page=" + page, {
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

  const updateDocs = async (status: number) => {
    try {
      if (status == -1) {
        const response = await axios.put(
          url + "admin/payments/status/" + teamId,
          {
            status: -1,
            rejection: textareaValue,
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
          url + "admin/payments/status/" + teamId,
          {
            status: 2,
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
        Data Pembayaran Tim
      </h1>
      <div className="w-full h-auto overflow-auto">
        <table className="w-full">
          <thead className="bg-[#379392] text-white">
            <tr>
              <th className="px-4 py-4">No</th>
              <th className="px-12">Nama Tim</th>
              <th className="px-12">Email</th>
              <th className="px-6">Bukti Bayar</th>
              <th className="px-6">Token</th>
              <th className="px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, id: number) => (
              <tr key={id} className="border-b-2 border-[#BDBDBD]">
                <td className="px-4 py-4 text-center">{id + 1}</td>
                <td className="px-12 py-4 text-center">{row.team_name}</td>
                <td className="px-12 py-4 text-center">
                  {row.team_member_mails[0]}
                </td>
                <td className="px-12 py-10 flex justify-center items-center">
                  <button
                    className="bg-[#40A89F] rounded-lg flex items-center gap-1 text-white px-4 py-2"
                    onClick={() => {
                      setPopupUrl(row.payment_url);
                      setTeamId(row.team_id);
                    }}
                  >
                    <p className="text-white">Open</p>
                    <MdOpenInNew />
                  </button>
                </td>
                <td className="px-6 py-4 text-center">{row.code}</td>
                <td className="px-6 py-4 text-center">
                  <p
                    className={`font-bold ${
                      row.payment_status == "accepted"
                        ? "text-[#3AD820]"
                        : row.payment_status == "rejected"
                        ? "text-[#E22727]"
                        : row.payment_status == "under review"
                        ? "text-[#E2B93B]"
                        : "text-[#4F4F4F]"
                    }`}
                  >
                    {row.payment_status == "no file" ? "-" : row.payment_status}
                  </p>
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
            <div className="w-[300px] md:w-[350px] bg-[#F3EEE7] flex flex-col items-center px-4 py-6 gap-6 rounded-lg">
              <div className="w-full flex justify-start text-[#3A9587]">
                <button onClick={() => setIsRejected(false)}>
                  <AiOutlineArrowLeft size={24} />
                </button>
              </div>
              <p className="text-[#379392] text-[32px] lg:text-[28px] font-bold text-center">
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
    </>
  );
}
