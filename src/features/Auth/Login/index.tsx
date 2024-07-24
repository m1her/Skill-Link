"use client";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/Input";
import { useRouter } from "next/navigation";
import React from "react";

export const LoginFeat = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="md:text-xl text-lg font-semibold text-center">Login</div>
      <TextInput />
      <TextInput />
      <div className="w-full flex justify-end -mt-2">
        <span
          className="w-fit text-sm text-blue-500 hover:text-blue-700 transition-colors duration-300 cursor-pointer"
          onClick={() => router.push("/reset-password")}
        >
          Frogot Password?
        </span>
      </div>
      <div className="w-full -mt-2">
        <Button label="Login" />
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
    </div>
  );
};
