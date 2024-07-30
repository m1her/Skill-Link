"use client";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEventHandler, useCallback, useRef, useState } from "react";
import { DeletePost } from "./DeletePost";
import { EditPost } from "./EditPost";
import { FollowPost } from "./FollowPost";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faYoutube, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { isDisabledHandler } from "@/util/sessionTime";
import { useUserData } from "@/context/UserContext";

const iconMap: { [key: string]: IconProp } = {
  YouTube: faYoutube,
  Discord: faDiscord,
  Zoom: faVideo,
  "Google Meets": faVideo,
};

export const PostCard = ({
  title,
  description,
  name,
  date,
  time,
  email,
  followers,
  id,
  link,
  linkBrand,
  LoggedinUserEmail,
}: {
  title: string;
  description: string;
  name: string;
  date: string;
  time: string;
  email: string;
  followers: string[];
  id: string;
  link: string;
  linkBrand: string;
  LoggedinUserEmail: string | undefined | null;
}) => {
  const overlay = useRef(null);
  const { user } = useUserData();
  const [onCrud, setOnCrud] = useState<boolean>(false);
  const { isDisabled, bgColor } = isDisabledHandler({ date, time });

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        setOnCrud(false);
      }
    },
    [overlay]
  );

  return (
    <div className="relative">
      {!isDisabled && (
        <Link
          className="absolute z-20 top-0 left-0 w-full h-full"
          href={link}
        ></Link>
      )}
      <div
        className={`p-4 rounded flex flex-col gap-y-2 shadow-[0_0_6px_0_rgba(0,0,0,0.1)] relative ${bgColor}`}
      >
        <div className="text-lg font-semibold text-[#0e3f9f] flex items-center gap-x-2">
          {title}
          <div className="flex items-center gap-x-1 text-xs">
            <FontAwesomeIcon icon={iconMap[linkBrand]} />
            <div>{linkBrand}</div>
          </div>
        </div>
        <div className="text-base text-gray-700">{description}</div>
        <div className="flex items-center gap-x-4">
          <div className="text-sm text-gray-600">{name}</div>
          <div className="text-gray-300">|</div>
          <div className="text-sm text-gray-500">
            {date} {time}
          </div>
        </div>
        {LoggedinUserEmail === email && (
          <FontAwesomeIcon
            icon={faEllipsis}
            className="absolute top-4 right-4 z-30 text-gray-600 hover:text-gray-900 transition-colors duration-300 w-4 h-4 cursor-pointer"
            onClick={() => setOnCrud(true)}
          />
        )}
        {onCrud && (
          <>
            <div className="bg-white text-sm z-50 absolute -top-16 right-4 w-fit shadow-[0_0_6px_0_rgba(0,0,0,0.1)] rounded flex flex-col gap-y-2 p-4">
              <DeletePost id={id} setOnCrud={setOnCrud} />
              <EditPost
                id={id}
                setOnCrud={setOnCrud}
                title={title}
                description={description}
                date={date}
                time={time}
                link={link}
                linkBrand={linkBrand}
              />
            </div>
            <div
              ref={overlay}
              className="fixed z-40 left-0 right-0 top-0 bottom-0 mx-auto bg-transparent p-10"
              onClick={onClick}
            />
          </>
        )}
        {LoggedinUserEmail !== email && user && (
          <FollowPost
            id={id}
            email={email}
            followers={followers}
            LoggedinUserEmail={LoggedinUserEmail}
          />
        )}
      </div>
    </div>
  );
};
