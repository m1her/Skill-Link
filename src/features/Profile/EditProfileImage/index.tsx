"use client";
import { useAlert } from "@/context/AlertContext";
import { db, storage } from "@/firebase/firebaseConfig";
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
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const maxSize = 1 * 1024 * 1024;

      if (file.size > maxSize) {
        showAlert({
          message: "File size exceeds 1 MB",
          type: "error",
        });
        return;
      }

      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImage(downloadURL);

        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (docSnapshot) => {
            const docRef = doc(db, "users", docSnapshot.id);
            await updateDoc(docRef, {
              profileImg: downloadURL,
            })
              .then(() => {
                showAlert({
                  message: "Image Changed Successfully",
                  type: "success",
                });
              })
              .catch(() => {});
          });
        }
      });
    }
  };

  return (
    <>
      <Image src={image ? image : currentImg} alt={""} fill />
      <div className="absolute w-full h-full bg-black/30 hidden group-hover:flex cursor-pointer items-center justify-center">
        <FontAwesomeIcon icon={faCamera} className="text-gray-700 w-20 h-20" />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </>
  );
};
