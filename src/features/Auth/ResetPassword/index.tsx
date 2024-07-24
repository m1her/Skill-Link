"use client";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/Input";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

export const ResetPasswordFeat = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-4">
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="absolute top-6 left-6 w-4 h-4 text-blue-950 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="md:text-xl text-lg font-semibold text-center">
        Reset Password
      </div>
      <TextInput />
      <div className="w-full -mt-2">
        <Button label="Send Email" />
      </div>
    </div>
  );
};
