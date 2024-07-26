"use client";
import { auth } from "@/firebase/firebaseConfig";
import {
  faBars,
  faCogs,
  faDoorOpen,
  faEnvelope,
  faHandshake,
  faInfoCircle,
  faSignIn,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const NavBar = () => {
  const [user] = useAuthState(auth);
  const [menu, setMenu] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menu]);

  return (
    <div className="w-full md:px-16 px-10 py-4 flex justify-between">
      <div
        className="sm:hidden text-xl font-bold text-white flex gap-x-3 items-center cursor-pointer w-fit"
        onClick={() => setMenu((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faBars} className="sm:hidden block w-4 z-50" />
        <div className="text-white font-bold text-xl z-50">SKILL LINK</div>
      </div>
      <div className="sm:block hidden text-xl font-bold text-white w-fit select-none">
        <div className="text-white font-bold text-xl">SKILL LINK</div>
      </div>

      <div className="text-white font-medium sm:flex hidden items-center lg:gap-x-16 gap-x-10">
        <Link href="#about" className="group cursor-pointer">
          <div>About</div>
          <div className="h-0.5 bg-white w-full scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
        </Link>
        <Link href="#how-it-works" className="group cursor-pointer">
          <div>How It Works</div>
          <div className="h-0.5 bg-white w-full scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
        </Link>
        <Link href="#join-us" className="group cursor-pointer">
          <div>Join Us</div>
          <div className="h-0.5 bg-white w-full scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
        </Link>
        {user ? (
          <div className="relative">
            <div
              className="truncate w-20 select-none cursor-pointer relative group"
              onClick={() => setProfile((prev) => !prev)}
            >
              {user.email}
              <div className="h-0.5 bg-white w-full scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
            </div>
            <div
              className={`flex flex-col gap-y-2 bg-[#485e7f]/70 px-4 rounded justify-center text-base w-[140px] absolute top-8 -right-4
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

      <div
        className={`text-white font-medium bg-gradient-to-br to-[#5981b8] from-[#365785] h-screen sm:hidden absolute top-0 left-0 flex flex-col gap-4 z-10
            ${
              menu ? "w-full" : "w-0"
            } overflow-hidden transition-all duration-500
            `}
      >
        <div className="pl-10 pt-16 flex flex-col gap-y-4 whitespace-nowrap">
          {user ? (
            <>
              <div
                className="select-none cursor-pointer relative group"
                onClick={() => setProfile((prev) => !prev)}
              >
                <div className="flex items-center gap-x-2">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                  <div>{user.email}</div>
                </div>
              </div>
              <Link href="/profile" className="ml-4 -mt-3 text-sm group">
                <FontAwesomeIcon icon={faUser} className="w-3 h-3 mr-2" />
                Profile
                <div className="h-0.5 bg-white w-0 group-hover:w-full transition-all duration-300" />
              </Link>
              <div
                className="text-sm cursor-pointer group ml-4 -mt-3"
                onClick={() => auth.signOut()}
              >
                <FontAwesomeIcon icon={faSignOut} className="w-3 h-3 mr-1" />{" "}
                Logout
                <div className="h-0.5 bg-white w-0 group-hover:w-full transition-all duration-300" />
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-x-2"
              onClick={() => setMenu((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faSignIn} className="w-4 h-4" />
              <div>Login</div>
            </Link>
          )}
          <Link
            href="#about"
            className="flex items-center gap-x-2"
            onClick={() => setMenu((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4" />
            <div>About</div>
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center gap-x-2"
            onClick={() => setMenu((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faCogs} className="w-4 h-4" />
            <div>How It Works</div>
          </Link>
          <Link
            href="#join-us"
            className="flex items-center gap-x-2"
            onClick={() => setMenu((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faHandshake} className="w-4 h-4" />
            <div>Join Us</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
