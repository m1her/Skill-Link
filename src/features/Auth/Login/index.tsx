"use client";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/Input";
import { auth } from "@/firebase/firebaseConfig";
import { object } from "@/util/validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

export const LoginFeat = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<{ [k: string]: string }>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validate = useCallback(() => {
    const userSchema = object({
      email: ["string", "required", "email"],
      password: ["string", "required", "min=8"],
    });
    const result = userSchema.validate(loginData);
    setErrors(result.errors);
    setTimeout(() => {
      setErrors({
        email: "",
        password: "",
      });
    }, 2000);
    return result.valid;
  }, [loginData]);

  const loginAction = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (validate()) {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then(() => {
            setIsLoading(false);
            router.push("/");
          })
          .catch((err) => {
            setErrors({ email: "Wrong email or password", password: "" });
            setIsLoading(false);
          });
      }
    },
    [loginData.email, loginData.password, router, validate]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={loginAction} className="flex flex-col gap-y-4">
      <div className="md:text-xl text-lg font-semibold text-center">Login</div>
      <TextInput
        id="login-email"
        name="email"
        type="email"
        label="Email"
        placeholder="e.g., name@example.com"
        onChange={handleChange}
        value={loginData?.email}
        error={errors?.email}
        errorMsg={errors?.email}
      />
      <TextInput
        id="login-password"
        name="password"
        type="password"
        label="Password"
        placeholder="Password (8+ characters)"
        onChange={handleChange}
        value={loginData?.password}
        error={errors?.password}
        errorMsg={errors?.password}
      />
      <div className="w-full flex justify-end -mt-2">
        <span
          className="w-fit text-sm text-blue-500 hover:text-blue-700 transition-colors duration-300 cursor-pointer"
          onClick={() => router.push("/reset-password")}
        >
          Frogot Password?
        </span>
      </div>
      <div className="w-full -mt-2">
        <Button label="Login" loading={isLoading} />
      </div>
      <div className="text-sm text-gray-500 text-center w-full">
        Don&apos;t have an account?{" "}
        <span
          className="w-fit text-sm text-blue-500 hover:text-blue-700 transition-colors duration-300 cursor-pointer"
          onClick={() => router.push("/new-account")}
        >
          Create new account
        </span>
      </div>
    </form>
  );
};
