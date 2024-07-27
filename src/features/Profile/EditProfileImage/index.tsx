"use client";
import { useAlert } from "@/context/AlertContext";
import { db, storage } from "@/firebase/firebaseConfig";
import { handleImageUpload } from "@/util/profileFunctions";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import React, { useState } from "react";

export const EditProfileImage = ({
  currentImg,
  userEmail,
}: {
  currentImg: string;
  userEmail: string;
}) => {
  const { showAlert } = useAlert();
  const [image, setImage] = useState<string>("");

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload({ event, showAlert, setImage, userEmail });
  };
  return (
    <>
      <Image src={image ? image : currentImg} alt={""} fill />
      <div className="absolute w-full h-full bg-black/30 hidden group-hover:flex cursor-pointer items-center justify-center">
        <FontAwesomeIcon icon={faCamera} className="text-gray-700 w-20 h-20" />
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </>
  );
};
