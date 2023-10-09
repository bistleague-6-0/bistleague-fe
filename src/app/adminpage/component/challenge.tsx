"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import Cookies from "universal-cookie";

export default function MiniChallenge() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cookie = new Cookies();
  const token = cookie.get("token_admin");
  const router = useRouter();

  const url =
    process.env.NEXT_PUBLIC_STAGE != "staging"
      ? "https://be-production-b6utdt2kwa-et.a.run.app/"
      : "https://be-staging-b6utdt2kwa-et.a.run.app/";

  const getData = async (page: number) => {
    try {
      const response = await axios.get(
        url + "admin/challenge/mini?page=" + page,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      let total = Math.ceil(response.data?.data.length / 10);
      setTotalPages(total);
      setData(response.data?.data);
      console.log(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, []);

  useEffect(() => {
    if (token === undefined) {
      router.push("/adminlogin");
    }
  }, [token, router]);

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
            ? "text-center bg-[#379392] px-4 py-2 rounded-lg text-white text-[14px] font-bold cursor-pointer"
            : "text-center bg-transparent px-4 py-2 rounded-lg border-2 border-[#828282] text-[#828282] text-[14px] font-bold cursor-pointer"
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
        Data Pengumpulan Mini Challenge
      </h1>
      <div className="w-full h-auto overflow-auto">
        <table className="w-full">
          <thead className="bg-[#379392] text-white">
            <tr>
              <th className="px-4 py-4">No</th>
              <th className="px-12">Username</th>
              <th className="px-12">Nama</th>
              <th className="px-6">Username IG</th>
              <th className="px-6">Link Konten IG</th>
              <th className="px-6">Username Tiktok</th>
              <th className="px-6">Link Konten Tiktok</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, id: number) => (
              <tr key={id} className="border-b-2 border-[#BDBDBD]">
                <td className="px-4 py-4 text-center">{id + 1}</td>
                <td className="px-12 py-4 text-center">{row.username}</td>
                <td className="px-12 py-4 text-center">{row.full_name}</td>
                <td className="px-12 py-4 text-center">
                  {row.ig_username ? row.ig_username : "-"}
                </td>
                <td className="px-12 py-10 flex justify-center items-center">
                  <button
                    className={`rounded-lg flex items-center gap-1 text-white px-4 py-2 ${row.ig_content_url? "bg-[#40A89F]" : "bg-[#BDBDBD]"}`}
                    onClick={() =>
                      window.open(row.ig_content_url)
                    }
                  >
                    <p className="text-white">Open</p>
                    <MdOpenInNew />
                  </button>
                </td>
                <td className="px-12 py-4 text-center">
                  {row.tiktok_username ? row.tiktok_username : "-"}
                </td>
                <td className="px-12 py-10 flex justify-center items-center">
                  <button
                    className={`rounded-lg flex items-center gap-1 text-white px-4 py-2 ${row.tiktok_content_url? "bg-[#40A89F]" : "bg-[#BDBDBD]"}`}
                    onClick={() =>
                      window.open(row.tiktok_content_url)
                    }
                  >
                    <p className="text-white">Open</p>
                    <MdOpenInNew />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end mt-4">
        <div className="flex items-center gap-3">{renderPage()}</div>
      </div>
    </>
  );
}
