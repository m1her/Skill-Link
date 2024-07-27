import React from "react";

export const About = () => {
  return (
    <div id="about" className="w-full min-h-screen lg:grid flex flex-col gap-y-28 lg:pb-0 pb-28 grid-cols-2 md:px-16 px-10 py-4 gap-x-12 overflow-hidden">
      <div className="flex flex-col items-start gap-y-4 justify-center relative">
        <div className="w-[480px] aspect-square bg-[#0652e9]/5 rounded-r-full absolute top-1/2 -left-1/3 -translate-y-1/2 -z-10"></div>
        <div className="md:text-4xl text-xl font-bold text-[#0f45b1]">
          About Skill Link
        </div>
        <div className="text-black/70">
          <strong>Skill Link </strong>
          is a dynamic platform designed to connect learners and instructors
          from all over the world. Our mission is to make learning accessible,
          engaging, and personalized for everyone. Whether you&apos;re looking
          to acquire new skills, enhance your knowledge, or share your
          expertise, <strong>Skill Skill </strong> provides the perfect
          environment to achieve your goals.
          <br />
          <br />
          <strong>Key Features</strong>
          <br />
          &#x2022; Flexible Scheduling <br /> &#x2022; Interactive Learning{" "}
          <br /> &#x2022; Unlimited Instructors <br /> &#x2022; Free Learning{" "}
          <br /> &#x2022; and more...
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="relative bg-[url(/about.jpg)] w-[450px] aspect-square bg-cover bg-center rounded shadow-[0_0_10px_3px_rgba(0,0,0,0.1)]">
          <div className="absolute w-full h-full top-0 left-0 bg-[#0652e9]/10 rounded"></div>
          <div className="w-[180px] aspect-square bg-[#0652e9] rounded-l-full absolute -top-20 -left-24 -z-10"></div>
          <div className="w-[180px] aspect-square bg-[#62e1e9] rounded-r-full absolute -bottom-20 -right-24 -z-10"></div>
        </div>
      </div>
    </div>
  );
};
