"use client";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/Input";
import { useRouter } from "next/navigation";
import React from "react";

export const SignupFeat = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="md:text-xl text-lg font-semibold text-center">Create Account</div>
      <TextInput />
      <TextInput />
      <TextInput />
      <TextInput />

      <div className="w-full mt-2">
        <Button label="Create" />
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
    </div>
  );
};
