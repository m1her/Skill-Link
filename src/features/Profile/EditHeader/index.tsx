"use client";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/Input";
import Modal from "@/components/Modal";
import { db } from "@/firebase/firebaseConfig";
import { object } from "@/util/validation";
import {
  collection,
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

const EditHeader = ({
  onEdit,
  closeModal,
  userEmail,
  name,
  specialty,
  goal,
}: {
  onEdit: boolean;
  closeModal: () => void;
  userEmail: string | null | undefined;
  name: string;
  specialty: string;
  goal: string;
}) => {
  const [profileData, setProfileData] = useState<{ [k: string]: string }>({
    name: "",
    specialty: "",
    goal: "",
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({
    name: "",
    specialty: "",
    goal: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validate = useCallback(() => {
    const userSchema = object({
      name: ["string", "required", "min=5"],
      specialty: ["string", "required"],
      goal: ["string", "required"],
    });
    const result = userSchema.validate(profileData);
    setErrors(result.errors);
    setTimeout(() => {
      setErrors({
        name: "",
        specialty: "",
        goal: "",
      });
    }, 2000);
    return result.valid;
  }, [profileData]);

  const editAction = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (validate()) {
        setIsLoading(true);
        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (docSnapshot) => {
            const docRef = doc(db, "users", docSnapshot.id);
            await updateDoc(docRef, profileData)
              .then(() => {
                setIsLoading(false);
                closeModal();
              })
              .catch(() => {
                setErrors({
                  name: "Something went wrong",
                  specialty: "",
                  goal: "",
                });
                setIsLoading(false);
              });
          });
        }
      }
    },
    [closeModal, profileData, userEmail, validate]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setProfileData({
      name: name,
      specialty: specialty,
      goal: goal,
    });
  }, [goal, name, specialty]);
  return (
    <>
      {onEdit && (
        <Modal onDismiss={closeModal}>
          <form onSubmit={editAction} className="flex flex-col gap-y-4">
            <TextInput
              id="user-name"
              name="name"
              type="text"
              label="Username"
              placeholder="Enter your username"
              onChange={handleChange}
              value={profileData?.name}
              error={errors?.name}
              errorMsg={errors?.name}
            />
            <TextInput
              id="specialty"
              name="specialty"
              type="text"
              label="Specialty"
              placeholder="e.g., Frontend Developer"
              onChange={handleChange}
              value={profileData?.specialty}
              error={errors?.specialty}
              errorMsg={errors?.specialty}
            />
            <TextInput
              id="user-goal"
              name="goal"
              type="text"
              label="Goal"
              placeholder="Enter your goal"
              onChange={handleChange}
              value={profileData?.goal}
              error={errors?.goal}
              errorMsg={errors?.goal}
            />
            <div className="flex justify-end">
              <div className="w-fit">
                <Button label={"Save"} loading={isLoading} />
              </div>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default EditHeader;
