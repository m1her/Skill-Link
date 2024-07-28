import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Skill Link | Search",
};

const Authlayout = ({
  children,
  people,
  sessions,
}: Readonly<{
  children: React.ReactNode;
  people: React.ReactNode;
  sessions: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="bg-[url(/profileBG.jpg)] w-full bg-cover bg-center">
        {children}
        <div className="md:px-16 px-10 py-4 lg:h-screen h-[120vh] mt-16 grid lg:grid-cols-2 grid-cols-1 gap-4">
          {sessions}
          {people}
        </div>
      </div>
    </div>
  );
};

export default Authlayout;
