"use client";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/Input";
import { auth } from "@/firebase/firebaseConfig";
import { object } from "@/util/validation";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

export const ResetPasswordFeat = () => {
  const router = useRouter();
  const [resetPassData, setResetPassData] = useState<{ [k: string]: string }>({
    email: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({
    email: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validate = useCallback(() => {
    const userSchema = object({
      email: ["string", "required", "email"],
    });
    const result = userSchema.validate(resetPassData);
    setErrors(result.errors);
    setTimeout(() => {
      setErrors({
        email: "",
      });
    }, 2000);
    return result.valid;
  }, [resetPassData]);

  const resetPassAction = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (validate()) {
        setIsLoading(true);
        sendPasswordResetEmail(auth, resetPassData.email)
          .then(() => {
            setIsLoading(false);
            router.push("/login");
          })
          .catch((err) => {
            setErrors({ email: "Wrong Email" });
            setIsLoading(false);
          });
      }
    },
    [resetPassData.email, router, validate]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setResetPassData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={resetPassAction} className="flex flex-col gap-y-4">
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="absolute top-6 left-6 w-4 h-4 text-blue-950 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="md:text-xl text-lg font-semibold text-center">
        Reset Password
      </div>
      <TextInput
        id="reset-pass-email"
        name="email"
        type="email"
        label="Email"
        placeholder="e.g., name@example.com"
        onChange={handleChange}
        value={resetPassData?.email}
        error={errors?.email}
        errorMsg={errors?.email}
      />
      <div className="w-full mt-2">
        <Button label="Send Email" loading={isLoading} />
      </div>
    </form>
  );
};
