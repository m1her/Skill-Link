import Link from "next/link";
import React from "react";

export const JoinUs = () => {
  return (
    <div id="join-us" className="w-full lg:h-screen lg:grid flex flex-col grid-cols-2 md:px-16 px-10 md:py-4 py-8 gap-x-12 gap-y-8 overflow-hidden">
      
      <div className="flex flex-col items-center lg:gap-y-8 gap-y-6 justify-center relative lg:px-20 lg:order-1 order-2 lg:py-0 py-4">
        <div className="lg:w-full w-[120vw] h-full bg-[#0652e9]/5 lg:rounded-t-full lg:rounded-b-none rounded-l-full absolute lg:top-20 lg:left-1/2 left-2/3 -translate-x-1/2 -z-10"></div>
        <Link
          href="/new-account"
          className="md:order-1 order-2 text-white md:text-lg text-base font-semibold bg-[#0652e9] hover:bg-[#04379d] rounded px-4 py-2 transition-colors duration-300 lg:mt-32"
        >
          Create Account
        </Link>
        <div className="md:order-2 order-1 relative bg-[url(/welcome.svg)] w-full aspect-video bg-cover bg-center"></div>
      </div>

      <div className="flex flex-col items-start gap-y-4 justify-center relative lg:px-20 lg:order-2 order-1 lg:py-0 py-4">
        <div className="lg:w-full w-[120vw] h-full bg-[#0652e9]/5 lg:rounded-b-full lg:rounded-t-none rounded-r-full absolute lg:bottom-20 bottom-0 lg:left-1/2 left-1/3 -translate-x-1/2 -z-10"></div>
        <div className="text-4xl font-bold text-[#0f45b1]">Join Us Now</div>
        <div className="text-black/70">
          Become a part of our vibrant learning community and unlock a world of
          opportunities. Whether you&lsquo;re here to learn, teach, or both.
          <strong> Skill Link </strong>
          offers the perfect environment for growth and success.
        </div>
        <div className="text-black/70 lg:mb-40">
          So <strong>Don&lsquo;t </strong>waste more time and start learning now
          for <strong>Free.</strong>
        </div>
      </div>
    </div>
  );
};
