import React from "react";
import { PostedSessions } from "./PostedSessions";
import { FollowedSessions } from "./FollowedSessions";

export const Sessions = () => {
  return (
    <div className="md:px-16 px-10 py-4">
      <div className="grid grid-cols-2 w-full h-full">
        <PostedSessions />
        <FollowedSessions />
      </div>
    </div>
  );
};
