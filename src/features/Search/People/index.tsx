"use client";
import React, { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Spinner } from "@/components/Spinner";

interface userType {
  name: string;
  profileImg: string;
  specialty: string;
  email: string;
}

export const PeopleFeat = () => {
  const [users, setUsers] = useState<userType[] | null>();
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

  const encodeEmail = (email: string) => {
    return btoa(email);
  };

  return (
    <div className="flex flex-col gap-y-2 pt-2">
      {users && users.length > 0 ? (
        users.map(
          (
            user: {
              name: string;
              profileImg: string;
              specialty: string;
              email: string;
            },
            idx: React.Key | null | undefined
          ) => (
            <UserCard
              key={idx}
              name={user.name}
              profileImg={user.profileImg}
              specialty={user.specialty}
              email={encodeEmail(user.email)}
            />
          )
        )
      ) : users && users.length == 0 ? (
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
