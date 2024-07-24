"use client";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/Input";
import { auth, db } from "@/firebase/firebaseConfig";
import { object } from "@/util/validation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

export const SignupFeat = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState<{ [k: string]: string }>({
    email: "",
    password: "",
    name: "",
    specialty: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({
    email: "",
    password: "",
    name: "",
    specialty: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validate = useCallback(() => {
    const userSchema = object({
      email: ["string", "required", "email"],
      password: ["string", "required", "min=8"],
      name: ["string", "required", "min=5"],
      specialty: ["string", "required"],
    });
    const result = userSchema.validate(signupData);
    setErrors(result.errors);
    setTimeout(() => {
      setErrors({
        email: "",
        password: "",
        name: "",
        specialty: "",
      });
    }, 2000);
    return result.valid;
  }, [signupData]);

  const signupAction = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (validate()) {
        setIsLoading(true);
        createUserWithEmailAndPassword(
          auth,
          signupData.email,
          signupData.password
        )
          .then(() => {
            setIsLoading(false);
            addDoc(collection(db, "users"), signupData);
            router.push("/login");
          })
          .catch((err) => {
            setErrors({
              email: "Make sure the email have not been used",
              password: "",
              name: "",
              specialty: "",
            });
            setIsLoading(false);
          });
      }
    },
    [validate, signupData, router]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={signupAction} className="flex flex-col gap-y-4">
      <div className="md:text-xl text-lg font-semibold text-center">
        Create Account
      </div>
      <TextInput
        id="signup-email"
        name="email"
        type="email"
        label="Email"
        placeholder="e.g., name@example.com"
        onChange={handleChange}
        value={signupData?.email}
        error={errors?.email}
        errorMsg={errors?.email}
      />
      <TextInput
        id="user-name"
        name="name"
        type="text"
        label="Username"
        placeholder="Enter your username"
        onChange={handleChange}
        value={signupData?.name}
        error={errors?.name}
        errorMsg={errors?.name}
      />
      <TextInput
        id="login-password"
        name="password"
        type="password"
        label="Password"
        placeholder="Password (8+ characters)"
        onChange={handleChange}
        value={signupData?.password}
        error={errors?.password}
        errorMsg={errors?.password}
      />
      <TextInput
        id="specialty"
        name="specialty"
        type="text"
        label="Specialty"
        placeholder="e.g., Frontend Developer"
        onChange={handleChange}
        value={signupData?.specialty}
        error={errors?.specialty}
        errorMsg={errors?.specialty}
      />
      <div className="w-full mt-2">
        <Button label="Create" loading={isLoading} />
      </div>
      <div className="text-sm text-gray-500 text-center w-full">
        Already have an account?{" "}
        <span
          className="w-fit text-sm text-blue-500 hover:text-blue-700 transition-colors duration-300 cursor-pointer"
          onClick={() => router.replace("/login")}
        >
          Login
        </span>
      </div>
    </form>
  );
};
