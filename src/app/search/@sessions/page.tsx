import { SessionsFeat } from "@/features/Search/Sessions";
import React from "react";

const SessionsPage = () => {
  return (
    <div className="bg-white rounded p-4 shadow-[0_0_8px_0_rgba(5,19,78,0.2)]">
      <div className="text-lg font-semibold border-b pb-2">Sessions</div>
      <SessionsFeat />
    </div>
  );
};

export default SessionsPage;
