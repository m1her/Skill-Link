"use client";
import Link from "next/link";
import React, { MouseEventHandler, useCallback, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const SubNavBar = ({children}: {children: React.ReactNode}) => {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState<boolean>(false);
  const overlay = useRef(null);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        setProfile(false);
      }
    },
    [overlay]
  );
  return (
    <div>
      <div className="md:px-16 px-10 py-4 flex items-start justify-between w-full">
        <Link
          href="/"
          className=" text-[#061048] font-bold text-xl whitespace-nowrap"
        >
          SKILL LINK
        </Link>
        {user ? (
          <div className="relative">
            <div
              className=" select-none cursor-pointer relative group"
              onClick={() => setProfile((prev) => !prev)}
            >
              <div className="flex items-center gap-x-2">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />{" "}
                {user.email}
              </div>
              <div className="h-0.5 bg-white w-full scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
            </div>
            {profile && (
              <div
                ref={overlay}
                className="fixed z-40 left-0 right-0 top-0 bottom-0 mx-auto bg-transparent p-10"
                onClick={onClick}
              />
            )}
            <div
              className={`flex flex-col gap-y-2 bg-[#485e7f]/70 px-4 rounded justify-center text-base w-[140px] absolute z-50 top-8 -right-4
          ${
            profile ? "h-[80px]" : "h-0"
          } transition-all duration-300 overflow-hidden
          `}
            >
              <Link href="/profile" className="text-sm group">
                Profile
                <div className="h-0.5 bg-white w-0 group-hover:w-full transition-all duration-300" />
              </Link>
              <div
                className="text-sm cursor-pointer group"
                onClick={() => auth.signOut()}
              >
                Logout
                <div className="h-0.5 bg-white w-0 group-hover:w-full transition-all duration-300" />
              </div>
            </div>
          </div>
        ) : (
          <Link href="/login" className="group cursor-pointer">
            <div>Login</div>
            <div className="h-0.5 bg-white w-full scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
          </Link>
        )}
      </div>

      {children}

    </div>
  );
};