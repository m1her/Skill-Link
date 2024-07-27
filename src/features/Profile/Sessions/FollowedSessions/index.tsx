"use client";
import { PostCard } from "@/components/PostCard";
import { Spinner } from "@/components/Spinner";
import { usePostsContext } from "@/context/PostsContext";
import { useUserData } from "@/context/UserContext";
import { where } from "firebase/firestore";
import React, { useEffect } from "react";

export const FollowedSessions = () => {
  const userData = useUserData();
  const { postsData, setConditions } = usePostsContext();

  useEffect(() => {
    if (userData && userData.email) {
      console.log(userData.email);

      setConditions("component2", [
        where("followers", "array-contains", userData?.email),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className="p-4 flex flex-col gap-y-4 ">
      <div className="text-black text-xl font-semibold">Followed Sessions</div>
      {postsData["component2"] && postsData["component2"].length > 0 ? (
        postsData["component2"].map((item, idx) => (
          <PostCard
            key={idx}
            title={item.title}
            description={item.description}
            name={item.userName}
            date={item.date}
            time={item.time}
            id={item.id}
            followers={item.followers}
            email={item.userEmail}
            LoggedinUserEmail={userData?.email}
          />
        ))
      ) : postsData["component2"] && postsData["component2"].length == 0 ? (
        <div className="text-gray-400 font-light">
          This user doesn&lsquo;t followed any posts yet...
        </div>
      ) : (
        <div className="w-full flex justify-center h-8">
          <Spinner color="!w-7 !h-7 text-[#0652e9]" />
        </div>
      )}
    </div>
  );
};
