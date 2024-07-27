import { ProfileHeaderFeat } from "@/features/Profile/Header";
import { Sessions } from "@/features/Profile/Sessions";
import React from "react";

const Profile = () => {
  return (
    <div>
      <ProfileHeaderFeat />
      <Sessions />
    </div>
  );
};

export default Profile;
