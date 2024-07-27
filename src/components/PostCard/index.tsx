"use client";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEventHandler, useCallback, useRef, useState } from "react";
import { DeletePost } from "./DeletePost";
import { EditPost } from "./EditPost";
import { FollowPost } from "./FollowPost";

export const PostCard = ({
  title,
  description,
  name,
  date,
  time,
  email,
  followers,
  id,
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
  LoggedinUserEmail?: string;
}) => {
  const overlay = useRef(null);
  const [onCrud, setOnCrud] = useState<boolean>(false);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        setOnCrud(false);
      }
    },
    [overlay]
  );

  return (
    <div className="p-4 rounded flex flex-col gap-y-2 shadow-[0_0_6px_0_rgba(0,0,0,0.1)] relative">
      <div className="text-lg font-semibold text-[#0e3f9f]">{title}</div>
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
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-300 w-4 h-4 cursor-pointer"
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
            />
          </div>
          <div
            ref={overlay}
            className="fixed z-40 left-0 right-0 top-0 bottom-0 mx-auto bg-transparent p-10"
            onClick={onClick}
          />
        </>
      )}
      {LoggedinUserEmail !== email && (
        <FollowPost
          id={id}
          email={email}
          followers={followers}
          LoggedinUserEmail={LoggedinUserEmail}
        />
      )}
    </div>
  );
};