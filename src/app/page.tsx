"use client";

import React, { useState, useLayoutEffect, use } from "react";
import { useRouter } from "next/navigation";
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";
import css from "@/app/landing.module.css";
import Countdown from "@/component/Countdown/Countdown";
import axios from "axios";
import Cookies from "universal-cookie";

export default function Home() {
  const cookieStore = new Cookies();
  const user_id = cookieStore.get("user_id");
  const BASE_URL =
    process.env.NEXT_PUBLIC_STAGE != "staging"
      ? "https://be-production-b6utdt2kwa-et.a.run.app"
      : "https://be-staging-b6utdt2kwa-et.a.run.app";

  const [disabled, setDisabled] = useState<boolean>(false);

  const getProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/${user_id}`);

      setDisabled(response.data.data.team_id !== null);
    } catch (error) {
      return null;
    }
  };

  useLayoutEffect(() => {
    getProfile();
  }, []);

  // useLayoutEffect(() => {
  //   console.log("window.innerHeight", window.innerHeight);

  //   // Function to set the CSS custom property for --vh
  //   function setVhProperty() {
  //     // Get the viewport height and convert it to a value for a vh unit
  //     let vh = window.innerHeight * 0.01;
  //     // Set the value of --vh custom property
  //     document.documentElement.style.setProperty("--vh", `${vh}px`);
  //   }

  //   // Set the initial value when the app loads
  //   setVhProperty();

  //   // Event listener to update the value when the viewport size changes
  //   window.addEventListener("resize", setVhProperty);

  //   // Cleanup the event listener on unmount to prevent memory leaks
  //   return () => {
  //     window.removeEventListener("resize", setVhProperty);
  //   };
  // }, []);

  const [activities, setActivities] = useState<string>("competetion"); // Added type annotation

  const changeActivities = (name: string) => {
    // Added type annotation
    setActivities(name);
  };

  // Ubah Registration close in -> Extended Registration
  const earlyBirdRegistrationClose = new Date(
    "October 1, 2023 23:59:59 "
  ).getTime();
  const normalRegistrationClose = new Date(
    "October 29, 2023 23:59:59 "
  ).getTime();
  const lateRegistrationClose = new Date(
    "November 5, 2023 23:59:59 "
  ).getTime();

  const [componentReady, setcomponentReady] = useState<boolean>(false);
  const [registrationStatus, setRegistrationStatus] = useState<String>(
    "Closed Early Bird Registration in"
  );
  const [date, setDate] = useState<String>("1 Oktober 2023");

  useLayoutEffect(() => {
    const now = new Date().getTime();
    if (now > earlyBirdRegistrationClose) {
      setRegistrationStatus("Closed Registration");
      setDate("29 Oktober 2023");
    } else if (now > normalRegistrationClose) {
      setRegistrationStatus("Closed late Registration in");
      setDate("5 November 2023");
    }
    setcomponentReady(true);
  }, []);

  // Fetching Username

  // Route Button
  const router = useRouter();

  const registerHandler = () => {
    router.push("/compregistration");
  };

  return (
    <>
      <div
        className={`flex-col justify-center content-center w-full ${
          componentReady ? "visible" : "invisible"
        }`}
      >
        {/* <Header page="Home" username={username} /> */}
        <Header page="Home" />
        <main className={css.main}>
          {/* Background Image */}
          <div
            className={`${css.backgroundImage} w-full ${
              activities === "competetion" ? "" : css.hideBG
            }`}
          >
            <img
              src="images/landingpage/landingPageBackgroundTrimmed.svg"
              alt="background"
              className={`w-full`}
            />
          </div>
          <div
            className={`${css.backgroundImage} w-full ${
              activities === "bootcamp" ? "" : css.hideBG
            }`}
          >
            <img
              src="images/landingpage/landingPageBackgroundTrimmed2.svg"
              alt="background"
              className={`w-full`}
            />
          </div>
          <div
            className={`${css.backgroundImage} w-full ${
              activities === "miniChallenge" ? "" : css.hideBG
            }`}
          >
            <img
              src="images/landingpage/landingPageBackgroundTrimmed3.svg"
              alt="background"
              className={`w-full`}
            />
          </div>
          <div
            className={`${css.backgroundImage} w-full ${
              activities === "webinar" ? "" : css.hideBG
            }`}
          >
            <img
              src="images/landingpage/landingPageBackgroundTrimmed4.svg"
              alt="background"
              className={`w-full`}
            />
          </div>
          <div className={`${css.backgroundImageMobile} w-full`}>
            <img
              src="images/landingpage/landingPageBackgroundMobileTrimmed.svg"
              alt="background"
              className={`w-full`}
            />
          </div>

          {/* Main Section */}
          <section className={`${css.body} font-extrabold text-white`}>
            <h1 className={`${css.bistLeagueHeader} font-monument `}>
              BIST LEAGUE 6.0
            </h1>
            <p className={`${css.bistLeagueSubHeader}`}>
              Leveraging Technological Opportunities to Achieve <br />
              Sustainable Business Growth
            </p>
            <p className={`${css.openRegistrationText}`}>
              {componentReady && registrationStatus === "Extended Registration"
                ? "Extended Registration"
                : ""}
              {componentReady && registrationStatus === "Closed Registration in"
                ? "Closed Registration in"
                : ""}
            </p>

            {/* Countdown Section */}
            <Countdown />
            <p className={`${css.eventDate}`}>{date}</p>
            <div className={`${css.registerButtonDiv}`}>
              <button
                className={`${css.registerButton} ${
                  disabled ? "text-[white] opacity-75" : ""
                }`}
                onClick={registerHandler}
                disabled={disabled}
              >
                Register
              </button>
            </div>
            <div className={`${css.aboutBistLeagueSection}`}>
              <h1 className={`${css.aboutBistLeagueHeading}`}>
                About BIST League 6.0
              </h1>
              <div className={`${css.aboutBistLeagueContainer}`}>
                <p className={`${css.aboutBistLeagueText}`}>
                  <b>
                    Business Information System and Technology (BIST) League 6.0
                  </b>{" "}
                  is a Business - IT Case competition that aims to hone problem
                  solving skills on business problems related to information
                  technology. BIST League 6.0 theme is{" "}
                  <b>
                    “Achieving Technological Opportunities to Achieve a
                    Sustainable Business Growth”.{" "}
                  </b>
                  In addition to the main competition, we also hold a Business
                  Case Bootcamp which in planned to improve the ability of
                  participants in designing and working on business cases.We
                  also invite the public to attend a national Webinar session
                  that broadens their horizons related to business and
                  technology, especially on technology that supports business
                  growth.Last but not least, we also hold a Mini Video Challenge
                  which is planned to be participated by participant and
                  public.This Mini Video Challenge aims to increase public
                  awareness and insight regarding the topics raised by BIST
                  League 6.0
                </p>
              </div>
            </div>
            <div className={`${css.timelineHorizontalDiv}`}>
              <img
                src="./images/landingpage/timelineHorizontal.svg"
                alt="timeline"
                className={`${css.timelineHorizontal}`}
              />
            </div>
            <div className={`${css.timelineVerticalDiv}`}>
              <h1 className={`${css.timelineHeader}`}>Timeline</h1>
              <img
                src="./images/landingpage/timelineVertical.svg"
                alt="timeline"
                className={`${css.timelineVertical}`}
              />
            </div>

            {/* Activities Section */}
            <h1 className={`${css.activitiesHeader}`}>Activities</h1>

            {/* Activities for Desktop */}
            <div className={`${css.activitiesSectionForDesktop}`}>
              {/* Left Side Activities */}
              <div className={`${css.activitiesLeftSide}`}>
                {/* Competition Component Desktop */}
                <div
                  className={`${css.CompetitionDescription} ${
                    activities == "competetion"
                      ? "h-68 2xl:h-[21rem] transition-[height]"
                      : "2xl:h-[4.5rem] h-16 overflow-hidden transition-[height]"
                  }`}
                >
                  <p
                    className={`${css.activitiesDate} 
                    
                    ${
                      activities == "competetion"
                        ? css.fadeInAnimation
                        : css.fadeOutAnimation
                    } `}
                  >
                    25 september - 3 desember
                  </p>
                  <button
                    className={`${css.activitiesTitle}`}
                    onMouseOver={() => changeActivities("competetion")}
                  >
                    Competition
                  </button>
                  <p className={`${css.activitiesText}`}>
                    Business IT Case Competition is one of the main events of
                    BIST League 6.0 which is a competition to hone the solve a
                    business problems related to information technology by
                    applying problem solving skills in creating creative and
                    effective solutions. This competition is intended for
                    undergraduate/D3 students.
                  </p>
                  <button
                    className={`${css.activitiesButton} bg-[#276766]`}
                    onClick={() => router.push("/competition")}
                  >
                    More About Competition
                  </button>
                </div>

                {/* Bootcamp Component Desktop */}
                <div
                  className={`${css.businessCaseDescription} ${
                    activities == "bootcamp"
                      ? "h-68 2xl:h-[21rem] transition-[height]"
                      : "2xl:h-[4.5rem] h-16 overflow-hidden transition-[height]"
                  }`}
                >
                  <p
                    className={`${css.activitiesDate} 
                    ${
                      activities == "bootcamp"
                        ? css.fadeInAnimation
                        : css.fadeOutAnimation
                    } mt-8`}
                  >
                    Coming Soon
                  </p>
                  <button
                    className={`${css.activitiesTitle}`}
                    onMouseOver={() => changeActivities("bootcamp")}
                  >
                    Business Case Bootcamp
                  </button>
                  <p className={`${css.activitiesText}`}>
                    Business IT bootcamp is an intensive training program that
                    combines business and information technology education,
                    offering practical skills and knowledge for professionals to
                    excel in IT-related roles within the business sector.
                  </p>
                  <button
                    className={`${css.activitiesButton}
                    bg-[#9E1B1B]`}
                    onClick={() => router.push("/bootcamp")}
                  >
                    More About Bootcamp
                  </button>
                </div>

                {/* Mini Challenge Component Desktop */}
                <div
                  className={`${css.miniChallengeDescription} ${
                    activities == "miniChallenge"
                      ? "h-68 2xl:h-[21rem] transition-[height]"
                      : "2xl:h-[4.5rem] h-16 overflow-hidden transition-[height]"
                  }`}
                >
                  <p
                    className={`${css.activitiesDate} 
                    ${
                      activities == "miniChallenge"
                        ? css.fadeInAnimation
                        : css.fadeOutAnimation
                    }
                    mt-8`}
                  >
                    Coming Soon
                  </p>
                  <button
                    className={`${css.activitiesTitle}`}
                    onMouseOver={() => changeActivities("miniChallenge")}
                  >
                    Mini Challenge
                  </button>
                  <p
                    className={`${css.activitiesText}
                    `}
                  >
                    A video challenge that can be joined by participant and
                    public to increase awareness and insight regarding the
                    topics raised by BIST League 6.0
                  </p>
                  <button
                    className={`${css.activitiesButton}
                    bg-[#463461]`}
                    onClick={() => router.push("/minichallenge")}
                  >
                    More About Mini Challenge
                  </button>
                </div>

                {/* Webinar Component Desktop */}
                <div
                  className={`${css.webinarDescription} ${
                    activities == "webinar"
                      ? "h-68 2xl:h-[21rem] transition-[height]"
                      : "2xl:h-[4.5rem] h-16 overflow-hidden transition-[height]"
                  }`}
                >
                  <p
                    className={`${css.activitiesDate}
                    ${
                      activities == "webinar"
                        ? css.fadeInAnimation
                        : css.fadeOutAnimation
                    }
                    mt-8`}
                  >
                    Coming Soon
                  </p>
                  <button
                    className={`${css.activitiesTitle}`}
                    onMouseOver={() => changeActivities("webinar")}
                  >
                    Webinar
                  </button>
                  <p className={`${css.activitiesText}`}>
                    A sharing sessions with incredible speakers from the
                    Technology industry with topics aligning with BIST League
                    6.0 theme.
                  </p>
                  <button
                    className={`${css.activitiesButton}
                     bg-[#AE7120]`}
                    onClick={() => router.push("/webinar")}
                  >
                    More About Webinar
                  </button>
                </div>
              </div>

              {/* Right Side Activites */}
              <div className={`${css.activitiesRightSide}`}>
                <div className={`${css.activitiesImageDiv}`}>
                  <img
                    src="images/landingpage/competitionBistLeague.jpg"
                    alt=""
                    className={`${css.competitionImage} ${
                      activities == "competetion" ? "" : "hidden"
                    } w-full h-full object-cover`}
                    height="57.5vw"
                    width="57.5vw"
                  />
                  <img
                    src="images/landingpage/bootcampBistLeague.jpg"
                    alt=""
                    className={`${css.bootcampImage} ${
                      activities == "bootcamp" ? "" : "hidden"
                    } h-full  w-full object-cover`}
                    height="57.5vw"
                    width="57.5vw"
                  />
                  <img
                    src="images/landingpage/miniChallengeBistLeague.jpg"
                    alt=""
                    className={`${css.miniChallenge} ${
                      activities == "miniChallenge" ? "" : "hidden"
                    } h-full w-full object-fit`}
                    height="57.5vw"
                    width="57.5vw"
                  />
                  <img
                    src="images/landingpage/webinarBistLeague.JPG"
                    alt=""
                    className={`${css.webinarImage} ${
                      activities == "webinar" ? "" : "hidden"
                    } h-full w-full object-fit`}
                    height="57.5vw"
                    width="57.5vw"
                  />
                  <img
                    src="images/landingpage/yellowDecor.svg"
                    alt=""
                    className="absolute -right-[2.5rem] -bottom-8 "
                  />
                  <img
                    src="images/landingpage/greenDecor.svg"
                    alt=""
                    className="absolute right-10 -bottom-[5.5rem] "
                  />
                </div>
              </div>
            </div>

            {/* Activites for Mobile */}
            <div className={`${css.activitiesSectionForMobile}`}>
              {/* Competition Component Mobile */}
              <div className={`${css.competitionImageDiv}`}>
                <img
                  src="/images/landingpage/competitionBistLeague.jpg"
                  alt=""
                  className={`${css.competitionImage} w-full h-full object-cover`}
                  height="57.5vw"
                  width="57.5vw"
                />
              </div>
              <p className={`${css.activitiesDate}`}>
                25 September - 3 Desember
              </p>
              <h1 className={`${css.activitiesTitle}`}>Competition</h1>
              <p className={`${css.activitiesText}`}>
                Business IT Case Competition is one of the main events of BIST
                League 6.0 which is a competition to hone the solve a business
                problems related to information technology by applying problem
                solving skills in creating creative and effective solutions.
                This competition is intended for undergraduate/D3 students.
              </p>
              <button
                className={`${css.activitiesButton} bg-[#276766]`}
                onClick={() => router.push("/competition")}
              >
                More About Competition
              </button>
              {/* Bootcamp Component Mobile */}
              <div className={`${css.bootcampImageDiv}`}>
                <img
                  src="/images/landingpage/bootcampBistLeague.jpg"
                  alt=""
                  className={`${css.bootcampImage} w-full h-full object-cover`}
                  height="57.5vw"
                  width="57.5vw"
                />
              </div>
              <p className={`${css.activitiesDate}`}>Coming Soon</p>
              <h1 className={`${css.activitiesTitle}`}>
                Business Case Bootcamp
              </h1>
              <p className={`${css.activitiesText}`}>
                Business IT bootcamp is an intensive training program that
                combines business and information technology education, offering
                practical skills and knowledge for professionals to excel in
                IT-related roles within the business sector.
              </p>
              <button
                className={`${css.bootcampButton} bg-[#943232]`}
                onClick={() => router.push("/bootcamp")}
              >
                More About Bootcamp
              </button>
              {/* Mini Challenge Component Mobile */}
              <div className={`${css.miniChallengeImageDiv}`}>
                <img
                  src="/images/landingpage/miniChallengeBistLeague.jpg"
                  alt=""
                  className={`${css.miniChallenge} w-full h-full object-fit`}
                  height="57.5vw"
                  width="57.5vw"
                />
              </div>
              <p className={`${css.activitiesDate}`}>Coming Soon</p>
              <h1 className={`${css.activitiesTitle}`}>Mini Challenge</h1>
              <p className={`${css.activitiesText}`}>
                A video challenge that can be joined by participant and public
                to increase awareness and insight regarding the topics raised by
                BIST League 6.0
              </p>
              <button
                className={`${css.miniChallengeButton} bg-[#463461]`}
                onClick={() => router.push("/minichallenge")}
              >
                More About Mini Challenge
              </button>
              {/* Webinar Component Mobile */}
              <div className={`${css.webinarImageDiv}`}>
                <img
                  src="/images/landingpage/webinarBistLeague.jpg"
                  alt=""
                  className={`${css.webinarImage} w-full h-full object-fit`}
                  height="57.5vw"
                  width="57.5vw"
                />
              </div>
              <p className={`${css.activitiesDate}`}>Coming Soon</p>
              <h1 className={`${css.activitiesTitle}`}>Webinar</h1>
              <p className={`${css.activitiesText}`}>
                A sharing sessions with incredible speakers from the Technology
                industry with topics aligning with BIST League 6.0 theme.
              </p>
              <button
                className={`${css.webinarButton} bg-[#AE7120]`}
                onClick={() => router.push("/webinar")}
              >
                More About Webinar
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
