import Submission from "./components/Submission";

import axios from "axios";
import { get } from "http";
import Cookies from "universal-cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SubmissionPage() {
  const cookie = new Cookies();
  const cookieStore = cookies();
  const jwt_token = cookieStore.get("jwt_token")?.value as string;
  const refresh = cookieStore.get("refresh")?.value as string;
  const user_id = cookieStore.get("user_id")?.value as string;

  const BASE_URL =
    process.env.NEXT_PUBLIC_STAGE != "staging"
      ? "https://be-production-b6utdt2kwa-et.a.run.app"
      : "https://be-staging-b6utdt2kwa-et.a.run.app";

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "UTC", // Specify the time zone as UTC
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

  const getLastSubmission = async () => {
    try {
      const response = await axios.get(BASE_URL + "/team/submission/2", {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      });

      const formattedDate = formatDate(
        response.data.data.submission_lastupdate
      );
      response.data.data.submission_lastupdate = formattedDate;
      return response.data.data;
    } catch (error) {
      // const errorResponse = error as {
      //   response: { status: number; data: { message: string } };
      // };
      // if (errorResponse?.response?.status === 401) {
      //   const response2 = await axios.post(BASE_URL + "/refresh", {
      //     refresh_token: refresh,
      //     user_id: user_id,
      //   });
      //   cookie.remove("jwt_token", { path: "/" });
      //   cookie.set("jwt_token", response2.data.data.jwt_token, { path: "/" });
      // }
      // console.log("error2",errorResponse?.response?.status)
    }
  };

  const submissionData = await getLastSubmission();
  return (
    <div className="bg-[url('/images/compregister/bg-comp-mobile.svg')] lg:bg-[url('/images/compregister/bg-comp-web.svg')] bg-cover min-h-screen flex flex-col">
      <div className="bg-[url('/images/compregister/right.svg')] lg:bg-[url('/images/compregister/right-web.svg')] bg-no-repeat bg-right-bottom lg:bg-right-top flex-1">
        <Submission
          jwt_token={jwt_token}
          submissionData={submissionData}
          refresh={refresh}
          user_id={user_id}
        />
      </div>
    </div>
  );
}
