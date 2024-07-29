"use client";
import React, { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Spinner } from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
import { useUserData } from "@/context/UserContext";

interface userType {
  name: string;
  profileImg: string;
  specialty: string;
  email: string;
  reviewers: string[];
  reviews: number;
}

export const PeopleFeat = () => {
  const { user } = useUserData();
  const [users, setUsers] = useState<userType[] | null>();
  const searchParams = useSearchParams();
  const [filteredUsers, setFilteredUsers] = useState<userType[]>();

  useEffect(() => {
    const postsCollection = collection(db, "users");
    const q = query(postsCollection, where("name", "!=", "asd"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const fetchedUsers = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setUsers(fetchedUsers as userType[]);
        } else {
        }
      },
      (error) => {
        console.error("Error fetching posts: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      const search = searchParams.get("s");
      const filtered = users.filter((item) =>
        item.name
          .toLocaleLowerCase()
          .includes(search?.toLocaleLowerCase() || "")
      );
      setFilteredUsers([...filtered]);
    }
  }, [searchParams, users]);



  return (
    <div className="flex flex-col gap-y-2 pt-2 h-[85vh] overflow-y-scroll">
      {filteredUsers && filteredUsers.length > 0 ? (
        filteredUsers.map(
          (user: userType, idx: React.Key | null | undefined) => (
            <UserCard
              key={idx}
              name={user.name}
              profileImg={user.profileImg}
              specialty={user.specialty}
              email={user.email}
              currentUserEmail={user.email}
              reviewers={user.reviewers}
              reviews={user.reviews}
            />
          )
        )
      ) : filteredUsers && filteredUsers.length == 0 ? (
        <div className="text-gray-400 font-light">
          No users have been found...
        </div>
      ) : (
        <div className="w-full flex justify-center h-8">
          <Spinner color="!w-7 !h-7 text-[#0652e9]" />
        </div>
      )}
    </div>
  );
};
