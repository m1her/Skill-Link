import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import { useAlert } from "@/context/AlertContext";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";

export const DeletePost = ({
  id,
  setOnCrud,
}: {
  id: string;
  setOnCrud: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { showAlert } = useAlert();
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const handleDelete = async () => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("id", "==", id));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "posts", docSnap.id))
      );
      showAlert({ message: "Documents deleted successfully", type: "success" });
    } catch (error) {
      showAlert({ message: "Error deleting documents", type: "error" });
    }
    setOnCrud(false);
  };

  const cancelHandler = () => {
    setIsConfirmed(false);
    setOnCrud(false);
  };

  const openHandler = () => {
    setIsConfirmed(true);
  };

  return (
    <div>
      <div
        className="text-black hover:text-red-600 transition-colors duration-300 cursor-pointer"
        onClick={openHandler}
      >
        Delete
      </div>
      {isConfirmed && (
        <Modal onDismiss={cancelHandler}>
          <div className="bg-white flex flex-col items-center gap-y-2">
            <div className="text-lg font-semibold">Confirm Delete ?</div>
            <div className="flex justify-between items-center gap-x-4">
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700 transition-colors duration-300"
                onClick={cancelHandler}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700 transition-colors duration-300"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
