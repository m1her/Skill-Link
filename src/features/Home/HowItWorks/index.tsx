import React from "react";

export const HowItWorks = () => {
  return (
    <div id="how-it-works" className="w-full md:h-screen bg-gradient-to-bl from-[#022d84] to-[#03379e] md:px-16 px-10 py-16 lg:gap-y-6 gap-y-11 flex flex-col items-center overflow-hidden">
      <div className="w-full text-center md:text-4xl text-xl font-bold text-white relative">
        How It Works
        <div className="w-full bg-white/10 md:h-24 h-14 rounded-l-full absolute top-1/2 lg:left-1/3 left-1/4 -translate-y-1/2"></div>
      </div>
      <div className="w-full h-full lg:grid flex flex-col md:items-center lg:items-stretch grid-cols-5 gap-x-12 gap-y-8">
        <div>
          <div className="bg-black/10 rounded-xl p-2 w-fit">
            <div className="text-white font-semibold">1- Sign Up</div>
            <div className="text-sm text-white">
              Create your free Skill Link account in just a few steps
            </div>
          </div>
        </div>

        <div className="lg:pt-[92px]">
          <div className="bg-white rounded-xl p-2 w-fit text-blue-950">
            <div className="font-semibold">2- Browse Skills</div>
            <div className="text-sm">
              Explore a wide range of skill categories
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-black/10 rounded-xl p-2 w-fit text-white">
            <div className="font-semibold">3- Book a Session</div>
            <div className="text-sm">
              Select an available time slot that fits your schedule
            </div>
          </div>
        </div>

        <div className="lg:pt-[272px]">
          <div className="bg-white rounded-xl p-2 w-fit text-blue-950">
            <div className="font-semibold">4- Learn and Grow</div>
            <div className="text-sm">
              Join live sessions, and learn from an expert
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end text-white">
          <div className="bg-black/10 rounded-xl p-2 w-fit">
            <div className="font-semibold">5- Leave a Review</div>
            <div className="text-sm">
              Share your experience by leaving a review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
