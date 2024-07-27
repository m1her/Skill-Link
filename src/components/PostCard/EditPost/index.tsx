import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/Input";
import Modal from "@/components/Modal";
import { useAlert } from "@/context/AlertContext";
import { db } from "@/firebase/firebaseConfig";
import { object } from "@/util/validation";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

export const EditPost = ({
  title,
  description,
  date,
  time,
  id,
  setOnCrud,
}: {
  id: string;
  setOnCrud: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  date: string;
  time: string;
}) => {
  const { showAlert } = useAlert();
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [postData, setPostData] = useState<{ [k: string]: string }>({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validate = useCallback(() => {
    const userSchema = object({
      title: ["string", "required"],
      description: ["string", "required"],
      date: ["required"],
      time: ["required"],
    });
    const result = userSchema.validate(postData);
    setErrors(result.errors);
    setTimeout(() => {
      setErrors({
        title: "",
        description: "",
        date: "",
        time: "",
      });
    }, 2000);
    return result.valid;
  }, [postData]);

  const dismissHandler = useCallback(() => {
    setIsConfirmed(false);
    setOnCrud(false);
  }, [setOnCrud]);

  const cancelHandler = () => {
    setIsConfirmed(false);
    setPostData({
      title: title,
      description: description,
      date: date,
      time: time,
    });
  };

  const openHandler = () => {
    setIsConfirmed(true);
  };

  const saveAction = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (validate()) {
        setIsLoading(true);
        const collectionRef = collection(db, "posts");

        const q = query(collectionRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (docSnapshot) => {
            const docRef = doc(db, "posts", docSnapshot.id);
            await updateDoc(docRef, postData)
              .then(() => {
                setIsLoading(false);
                dismissHandler();
                showAlert({
                  message: "Edits Saved Successfully",
                  type: "success",
                });
                setOnCrud(false);
              })
              .catch(() => {
                setErrors({
                  title: "Something went wrong",
                  description: "",
                  date: "",
                  time: "",
                });
                setOnCrud(false);
                setIsLoading(false);
              });
          });
        }
      }
    },
    [validate, id, postData, dismissHandler, showAlert, setOnCrud]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setPostData({
      title: title,
      description: description,
      date: date,
      time: time,
    });
  }, [date, description, time, title]);

  return (
    <div>
      <div
        className="text-black hover:text-red-600 transition-colors duration-300 cursor-pointer"
        onClick={openHandler}
      >
        Edit
      </div>
      {isConfirmed && (
        <Modal onDismiss={dismissHandler}>
          <div className="bg-white flex flex-col items-center gap-y-2 w-full">
            <form
              onSubmit={saveAction}
              className="flex flex-col gap-y-4 w-full"
            >
              <TextInput
                id="session-title"
                name="title"
                type="text"
                label="Session Tilte"
                placeholder="Enter Session Title"
                onChange={handleChange}
                value={postData?.title}
                error={errors?.title}
                errorMsg={errors?.title}
              />
              <TextInput
                id="session-description"
                name="description"
                type="text"
                label="Session Description"
                placeholder="Enter Session Description"
                onChange={handleChange}
                value={postData?.description}
                error={errors?.description}
                errorMsg={errors?.description}
              />
              <div className="w-full grid grid-cols-2 gap-x-4">
                <TextInput
                  id="session-date"
                  name="date"
                  type="date"
                  label="Session Date"
                  placeholder="Enter Session Date"
                  onChange={handleChange}
                  value={postData?.date}
                  error={errors?.date}
                  errorMsg={errors?.date}
                />
                <TextInput
                  id="session-time"
                  name="time"
                  type="time"
                  label="Session Time"
                  placeholder="Enter Session Time"
                  onChange={handleChange}
                  value={postData?.time}
                  error={errors?.time}
                  errorMsg={errors?.time}
                />
              </div>
              <div className="flex justify-between items-center gap-x-4">
                <button
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700 transition-colors duration-300"
                  onClick={cancelHandler}
                >
                  Cancel
                </button>
                <Button label="Save" loading={isLoading} />
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};
