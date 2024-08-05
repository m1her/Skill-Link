"use client";
import Link from "next/link";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { auth } from "@/firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserData } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export const SubNavBar = ({
  children,
  titleStyle,
  emailStyle,
}: {
  children?: React.ReactNode;
  titleStyle?: string;
  emailStyle?: string;
}) => {
  const { user } = useUserData();
  const router = useRouter();
  const [profile, setProfile] = useState<boolean>(false);
  const [encodedEmail, setEncodedEmail] = useState("");
  const overlay = useRef(null);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        setProfile(false);
      }
    },
    [overlay]
  );

  const encodeEmail = (email: string) => {
    return btoa(email);
  };

  useEffect(() => {
    if (user && user.email) {
      setEncodedEmail(encodeEmail(user.email));
    }
  }, [user]);

  return (
    <div>
      <div className="md:px-16 px-10 py-4 flex items-start justify-between w-full">
        <Link
          href="/"
          className={` text-[#061048] ${titleStyle} font-bold text-xl whitespace-nowrap`}
        >
          SKILL LINK
        </Link>
        {user ? (
          <div className="relative">
            <div
              className=" select-none cursor-pointer relative group"
              onClick={() => setProfile((prev) => !prev)}
            >
              <div className={`flex items-center gap-x-2 ${emailStyle}`}>
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
              className={`flex flex-col gap-y-2 bg-[#485e7f]/80 px-4 rounded justify-center text-base w-[140px] absolute z-50 top-8 -right-4
          ${
            profile ? "h-[80px]" : "h-0"
          } transition-all duration-300 overflow-hidden ${emailStyle}
          `}
            >
              <Link href={`/profile/${encodedEmail}`} className="text-sm group">
                Profile
                <div className="h-0.5 bg-white w-0 group-hover:w-full transition-all duration-300" />
              </Link>
              <div
                className="text-sm cursor-pointer group"
                onClick={() => {
                  router.push("/");
                  auth.signOut();
                }}
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
