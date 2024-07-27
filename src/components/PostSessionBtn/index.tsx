"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Modal from "../Modal";
import { TextInput } from "../Input";
import { Button } from "../Button";
import { useAlert } from "@/context/AlertContext";
import { object } from "@/util/validation";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useUserData } from "@/context/UserContext";

export const PostSessionBtn = () => {
  const { showAlert } = useAlert();
  const userData = useUserData();
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const postAction = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (validate() && userData) {
        setIsLoading(true);
        addDoc(collection(db, "posts"), {
          ...postData,
          id: Math.random() + userData?.name,
          userName: userData?.name,
          userEmail: userData?.email,
          followers: [],
        })
          .then(() => {
            setIsLoading(false);
            closeModal();
            showAlert({
              message: "Session Posted Successfully",
              type: "success",
            });
            setPostData({
              title: "",
              description: "",
              date: "",
              time: "",
            });
          })
          .catch(() => {
            setErrors({
              title: "",
              description: "",
              date: "",
              time: "",
            });
            setIsLoading(false);
          });
      }
    },
    [postData, showAlert, userData, validate]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div
        className="w-fit text-xs pl-2 pr-3 py-1 rounded-full bg-[#0652e9] hover:bg-[#0542bd] cursor-pointer transition-colors duration-300 text-white flex items-center justify-center gap-x-2"
        onClick={openModal}
      >
        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 " />
        <div>Post Session</div>
      </div>
      {isOpen && (
        <Modal onDismiss={closeModal}>
          <form onSubmit={postAction} className="flex flex-col gap-y-4">
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
            <div className="flex justify-end">
              <div className="w-fit text-sm">
                <Button label={"Post"} loading={isLoading} />
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
