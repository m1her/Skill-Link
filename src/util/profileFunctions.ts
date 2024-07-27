import { AlertTypes } from "@/context/AlertContext";
import { db, storage } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const handleImageUpload = async ({
  event,
  showAlert,
  setImage,
  userEmail,
}: {
  event: React.ChangeEvent<HTMLInputElement>;
  showAlert: ({}: AlertTypes) => void;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
}) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
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

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        showAlert({
          message: `Upload failed: ${error.message}`,
          type: "error",
        });
      },
      async () => {
        // Handle successful uploads on complete
        try {
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
              });
            });

            showAlert({
              message: "Image Changed Successfully",
              type: "success",
            });
          } else {
            showAlert({
              message: "User not found",
              type: "error",
            });
          }
        } catch (err) {
          showAlert({
            message: `Error retrieving download URL`,
            type: "error",
          });
        }
      }
    );
  }
};
