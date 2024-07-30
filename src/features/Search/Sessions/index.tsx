"use client";
import { PostCard } from "@/components/PostCard";
import { Spinner } from "@/components/Spinner";
import { PostData, usePostsContext } from "@/context/PostsContext";
import { auth } from "@/firebase/firebaseConfig";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const SessionsFeat = () => {
  const [user] = useAuthState(auth);
  const { postsData, setConditions } = usePostsContext();
  const searchParams = useSearchParams();
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>();

  useEffect(() => {
    setConditions("component3", []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (postsData["component3"] && postsData["component3"].length > 0) {
      const search = searchParams.get("s");
      const filtered = postsData["component3"].filter(
        (item) =>
          item.title
            .toLocaleLowerCase()
            .includes(search?.toLocaleLowerCase() || "") ||
          item.description
            .toLocaleLowerCase()
            .includes(search?.toLocaleLowerCase() || "") ||
          item.userName
            .toLocaleLowerCase()
            .includes(search?.toLocaleLowerCase() || "")
      );
      setFilteredPosts([...filtered]);
    }
  }, [postsData, searchParams]);

  return (
    <div className="flex flex-col gap-y-2 pt-2 h-[85vh] overflow-y-scroll">
      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map((item, idx) => (
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
            link={item.link}
            linkBrand={item.linkBrand}
            LoggedinUserEmail={user?.email}
          />
        ))
      ) : filteredPosts?.length == 0 ? (
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
