import React from "react";
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";
import Hero from "./components/Hero";
import Description from "./components/Description";

import KotakBottom from "@images/competition/hero/hero-kotak-bottom.svg";
import BulatLima from "@images/minichallenge/BulatLima.svg";

import Image from "next/image";
import Timeline from "./components/Timeline";
import Selection from "./components/Selection";
import Prize from "./components/Prize";

export default function MiniChallenge() {
  return (
    <div className="bg-[#F3EEE7] overflow-hidden">
      <Header page="Mini Challenge" />
      <Hero />
      <Description />
      <Timeline />
      <Selection />
      <Prize />
      <Image
          src={KotakBottom}
          alt="Hero Round"
          className="scale-50 md:scale-100 overflow-hidden absolute top-[440px] -right-14 md:top-[450px] md:right-6 z-0"
        />
      <Image
          src={BulatLima}
          alt="Hero Round"
          className="hidden scale-105 md:block overflow-hidden absolute right-8 top-[1770px] z-0"
        />
      <Footer />
    </div>
  );
};