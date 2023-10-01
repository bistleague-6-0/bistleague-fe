import Submission from "./components/Submission";

import axios from "axios";
import { get } from "http";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SubmissionPage() {
  const cookieStore = cookies();
  const jwt_token = cookieStore.get("jwt_token")?.value as string;
  const BASE_URL =
    process.env.NEXT_PUBLIC_STAGE == "production"
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

  const getTeam = async () => {
    try {
      const response = await axios.get(BASE_URL + "/team", {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error("Error getting profile:", error);
    }
  };

  const getLastSubmission = async () => {
    try {
      const response = await axios.get(BASE_URL + "/team/submission/1", {
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
      return null;
    }
  };

  const teamData = await getTeam();
  const submissionData = await getLastSubmission();

  if (!teamData?.is_active) {
    redirect("/competition");
  }

  return (
    <div className="bg-[url('/images/compregister/bg-comp-mobile.svg')] lg:bg-[url('/images/compregister/bg-comp-web.svg')] bg-cover min-h-screen flex flex-col">
      <div className="bg-[url('/images/compregister/right.svg')] lg:bg-[url('/images/compregister/right-web.svg')] bg-no-repeat bg-right-bottom lg:bg-right-top flex-1">
        <Submission
          teamData={teamData}
          jwt_token={jwt_token}
          submissionData={submissionData}
        />
      </div>
    </div>
  );
}
