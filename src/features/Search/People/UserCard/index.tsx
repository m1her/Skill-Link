import StarRating from "@/components/StarRating";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const UserCard = ({
  name,
  profileImg,
  specialty,
  email,
  reviewers,
  reviews,
  currentUserEmail,
}: {
  name: string;
  profileImg: string;
  specialty: string;
  email: string;
  currentUserEmail: string;
  reviewers: string[];
  reviews: number;
}) => {
  const encodeEmail = (email: string) => {
    return btoa(email);
  };

  return (
    <Link
      href={`/profile/${encodeEmail(email)}`}
      className="flex items-center gap-x-4 p-2 rounded border shadow-sm hover:shadow transition-all duration-100 cursor-pointer"
    >
      <div className="bg-gray-200 relative w-16 aspect-square rounded-full overflow-hidden">
        <Image src={profileImg} alt={""} fill />
      </div>
      <div>
        <div className="flex md:flex-row flex-col text-base md:items-center items-start gap-x-2 md:mb-0 mb-2">
          <span className="md:font-medium font-normal pr-2 md:border-r-2 border-r-0 border-gray-500 whitespace-nowrap">
            {name}
          </span>
          <StarRating
            userEmail={email}
            currentUser={currentUserEmail}
            reviews={reviews}
            reviewers={reviewers}
          />
        </div>
        <div className="text-sm">{specialty}</div>
      </div>
    </Link>
  );
};
