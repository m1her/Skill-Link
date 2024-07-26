"use client";
import { Search } from "@/components/Search";
import { auth, db } from "@/firebase/firebaseConfig";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import EditHeader from "../EditHeader";
import { EditProfileImage } from "../EditProfileImage";

interface userDataTypes {
  profileImg: string;
  name: string;
  specialty: string;
  goal: string;
}

export const ProfileHeaderFeat = () => {
  const [user] = useAuthState(auth);
  const [onEdit, setOnEdit] = useState(false);
  const [userData, setUserData] = useState<userDataTypes>({
    profileImg: "",
    name: "",
    specialty: "",
    goal: "",
  });

  const openModal = () => {
    setOnEdit(true);
  };

  const closeModal = () => {
    setOnEdit(false);
  };

  useEffect(() => {
    if (user?.email) {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", user.email));

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setUserData({
              profileImg: doc.data().profileImg,
              name: doc.data().name,
              specialty: doc.data().specialty,
              goal: doc.data().goal,
            });
          }
        },
        (error) => {
          console.error("Error fetching user document: ", error);
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="w-full md:h-[510px] h-[550px] bg-white rounded-b shadow-[0_0_6px_0_rgba(5,19,78,0.2)]">
      <div className="bg-[url(/profileBG.jpg)] w-full h-[320px] bg-cover bg-bottom shadow-sm shadow-[#05134e] flex md:flex-row flex-col items-start md:justify-between ">
        <Link
          href="/"
          className="md:px-16 px-10 py-4 text-white font-bold text-xl whitespace-nowrap"
        >
          SKILL LINK
        </Link>
        <Search style="mt-4 " />
      </div>
      <div className="flex md:flex-row flex-col md:items-stretch items-center gap-x-16 md:px-16 px-10 -mt-[120px] relative">
        {user && userData.name && (
          <div
            className="absolute top-36 md:right-16 right-8 flex items-center justify-center w-12 aspect-square rounded-full bg-[#0652e963] hover:bg-[#0547c99b] cursor-pointer transition-colors duration-300"
            onClick={openModal}
          >
            <FontAwesomeIcon
              icon={faPencil}
              className="w-5 h-5 text-[#05134e]"
            />
          </div>
        )}
        <div className="md:w-[280px] w-[200px] aspect-square rounded-full shadow-[0_0_8px_2px_rgba(5,19,78,0.2)] bg-white relative overflow-hidden group">
          {user?.email && user ? (
            <EditProfileImage
              currentImg={userData.profileImg}
              userEmail={user.email}
            />
          ) : (
            <div className="absolute w-full h-full bg-gray-300 animate-pulse"></div>
          )}
        </div>
        <div className="flex flex-col md:items-start items-center gap-y-2 justify-center md:mt-20 mt-6">
          {userData.name ? (
            <>
              <div className="flex items-center gap-x-6">
                <div className="text-xl font-semibold">{userData.name}</div>
                <div className="text-sm">⭐⭐⭐⭐⭐</div>
              </div>
              <div>{userData.specialty}</div>
              <div>&ldquo; {userData.goal} &ldquo;</div>
            </>
          ) : (
            <div className="bg-gray-300 h-28 w-[300px] mt-6 animate-pulse rounded"></div>
          )}
        </div>
      </div>
      <EditHeader
        onEdit={onEdit}
        closeModal={closeModal}
        userEmail={user?.email}
        name={userData.name}
        specialty={userData.specialty}
        goal={userData.goal}
      />
    </div>
  );
};
