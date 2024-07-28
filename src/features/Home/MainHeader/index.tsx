import { NavBar } from "@/components/MainNavBar";
import { Search } from "@/components/Search";
import React from "react";

export const MainHeader = () => {
  return (
    <div className="w-full md:h-screen h-[50vh] bg-[url(/mainBanner.jpg)] bg-cover object-center z-10 relative">
      <div className="absolute -z-10 w-full md:h-screen h-[50vh] top-0 left-0 bg-[#022d84]/40"></div>

      <NavBar />
      <Search />

      <div className="md:mt-36 mt-14 flex flex-col md:gap-y-6 gap-y-4 items-center">
        <div className="md:text-5xl text-3xl font-semibold text-white">
          Why Skill Link
        </div>
        <div className="md:w-2/3 w-full md:px-0 px-8 md:text-2xl text-lg text-white text-center">
          Empower your growth with expert instructors and a diverse range of
          skills, all from the comfort of your home. Transform your learning
          journey today
        </div>
      </div>
    </div>
  );
};
