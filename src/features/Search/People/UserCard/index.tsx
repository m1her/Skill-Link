import Image from "next/image";
import Link from "next/link";
import React from "react";

export const UserCard = ({
  name,
  profileImg,
  specialty,
  email,
}: {
  name: string;
  profileImg: string;
  specialty: string;
  email: string;
}) => {
  return (
    <Link
      href={`/profile/${email}`}
      className="flex items-center gap-x-4 p-2 rounded border shadow-sm hover:shadow transition-all duration-100 cursor-pointer"
    >
      <div className="bg-gray-200 relative w-16 aspect-square rounded-full overflow-hidden">
        <Image src={profileImg} alt={""} fill />
      </div>
      <div>
        <div className="flex text-base items-center gap-x-2">
          <span className="font-medium">{name}</span>
          <span className="text-gray-500">|</span>
          <span>⭐⭐⭐⭐⭐</span>
        </div>
        <div className="text-sm">{specialty}</div>
      </div>
    </Link>
  );
};
