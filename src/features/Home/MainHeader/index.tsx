import { Search } from "@/components/Search";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const MainHeader = () => {
  return (
    <div className="w-full h-screen bg-[url(/mainBanner.jpg)] bg-cover object-center z-10 relative">
      <div className="absolute -z-10 w-full h-screen top-0 left-0 bg-[#022d84]/40"></div>

      <div className="w-full px-8 py-4 flex justify-between">
        <div className="text-white font-bold text-xl">SKILL LINK</div>
        <div className="text-white font-medium flex items-center gap-x-16">
          <div>About</div>
          <div>How It Works</div>
          <div>Feedback</div>
          <div>Login</div>
        </div>
      </div>

      <Search />

      <div className="mt-36 flex flex-col gap-y-6 items-center">
        <div className="text-5xl font-semibold text-white">Why Skill Link</div>
        <div className="w-2/3 text-2xl text-white text-center">
          Empower your growth with expert instructors and a diverse range of
          skills, all from the comfort of your home. Transform your learning
          journey today
        </div>
      </div>

    </div>
  );
};
