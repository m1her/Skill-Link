"use client";
import { PostCard } from "@/components/PostCard";
import { Spinner } from "@/components/Spinner";
import { usePostsContext } from "@/context/PostsContext";
import { auth } from "@/firebase/firebaseConfig";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const SessionsFeat = () => {
  const [user] = useAuthState(auth);
  const params = useParams();
  const { postsData, setConditions } = usePostsContext();

  useEffect(() => {
    setConditions("component3", []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(postsData);
  }, [postsData]);
  return (
    <div className="flex flex-col gap-y-2 pt-2">
      {user &&
      user.email &&
      postsData["component3"] &&
      postsData["component3"].length > 0 ? (
        postsData["component3"].map((item, idx) => (
          <PostCard
            key={idx}
            title={item.title}
            description={item.description}
            name={item.userName}
            date={item.date}
            time={item.time}
            email={item.userEmail}
            followers={item.followers}
            id={item.id}
            LoggedinUserEmail={user.email}
          />
        ))
      ) : postsData["component2"] && postsData["component2"].length == 0 ? (
        <div className="text-gray-400 font-light">
          No session have been found...
        </div>
      ) : (
        <div className="w-full flex justify-center h-8">
          <Spinner color="!w-7 !h-7 text-[#0652e9]" />
        </div>
      )}
    </div>
  );
};
