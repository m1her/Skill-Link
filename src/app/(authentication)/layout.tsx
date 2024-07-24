import { Metadata } from "next";
import Image from "next/image";
import React from "react";


export const metadata: Metadata = {
  title: "Skill Link | Auth",
};


const Authlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0652e9] to-[#62e1e9]">
      <div className="md:p-8 p-4 md:pb-6 pb-4 pt-0 bg-white rounded shadow-[0_0_10px_5px_rgba(0,0,0,0.15)] flex flex-col gap-y-4 relative">
        <div className="md:w-[400px] w-[80vw] flex justify-center -mt-4">
          <Image
            src="/skill-link.svg"
            alt={""}
            width={1000}
            height={1000}
            className="md:w-64 w-52 aspect-video"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Authlayout;
