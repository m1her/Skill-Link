import { db } from "@/firebase/firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";

export const FollowPost = ({
  id,
  email,
  LoggedinUserEmail,
  followers,
}: {
  id: string;
  email: string;
  LoggedinUserEmail: string | undefined | null;
  followers: string[];
}) => {
  const followHandler = async () => {
    const collectionRef = collection(db, "posts");

    const q = query(collectionRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(db, "posts", docSnapshot.id);
        await updateDoc(docRef, {
          followers: arrayUnion(LoggedinUserEmail),
        });
      });
    }
  };

  const usFollowHandler = async () => {
    const collectionRef = collection(db, "posts");

    const q = query(collectionRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(db, "posts", docSnapshot.id);
        await updateDoc(docRef, {
          followers: arrayRemove(LoggedinUserEmail),
        });
      });
    }
  };

  return (
    <>
      {followers &&
      LoggedinUserEmail &&
      followers.includes(LoggedinUserEmail) ? (
        <div
          className="text-sm text-[#ffffff] bg-[#0652e9] px-6 py-1 border border-[#0652e9] rounded-full w-fit absolute bottom-4 right-4 cursor-pointer hover:bg-[#0443c2] transition-colors duration-300"
          onClick={usFollowHandler}
        >
          followed
        </div>
      ) : (
        <div
          className="text-sm text-[#0652e9] px-6 py-1 border border-[#0652e9] rounded-full w-fit absolute bottom-4 right-4 cursor-pointer hover:bg-[#0652e9]/5 transition-colors duration-300"
          onClick={followHandler}
        >
          follow
        </div>
      )}
    </>
  );
};
