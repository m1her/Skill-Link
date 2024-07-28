"use client";
import { PostCard } from "@/components/PostCard";
import { PostSessionBtn } from "@/components/PostSessionBtn";
import { Spinner } from "@/components/Spinner";
import { usePostsContext } from "@/context/PostsContext";
import { useUserData } from "@/context/UserContext";
import { where } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export const PostedSessions = () => {
  const params = useParams();
  const { postsData, setConditions } = usePostsContext();
  const { userData, setUserEmail } = useUserData();

  useEffect(() => {
    setUserEmail(params.userId.toString() + "@gmail.com");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData && userData.email) {
      setConditions("component1", [where("userEmail", "==", userData.email)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className="p-4 flex flex-col gap-y-4 ">
      <div className="text-black text-xl font-semibold flex items-center gap-x-4">
        <div>Posted Sessions</div>
        <PostSessionBtn />
      </div>
      {userData &&
      userData.email &&
      postsData["component1"] &&
      postsData["component1"].length > 0 ? (
        postsData["component1"].map((item, idx) => (
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
      ) : postsData["component1"] && postsData["component1"].length == 0 ? (
        <div className="text-gray-400 font-light">
          This user hasn&lsquo;t made any posts yet...
        </div>
      ) : (
        <div className="w-full flex justify-center h-8">
          <Spinner color="!w-7 !h-7 text-[#0652e9]" />
        </div>
      )}
    </div>
  );
};
