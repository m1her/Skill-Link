import { NotificationItem } from "@/components/NotificationItem";
import { SubNavBar } from "@/components/SubNavBar";
import React from "react";

const Notifications = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#293d5a] to-[#3a5278] flex flex-col">
      <SubNavBar titleStyle="text-white" emailStyle="text-white" />
      <div className="md:px-16 px-10 py-4 w-full h-full flex flex-col flex-1 items-center justify-center">
        <div className="bg-white w-full flex flex-col gap-y-2 p-4 flex-1 rounded">
          <div className="text-lg font-medium border-b border-black/40 pb-4">
            Notivications
          </div>
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
