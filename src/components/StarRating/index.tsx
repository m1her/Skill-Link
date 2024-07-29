// components/StarRating.tsx
import { db } from "@/firebase/firebaseConfig";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FormEvent, useCallback, useEffect, useState } from "react";

interface StarRatingProps {
  totalStars?: number;
  value?: number;
  readOnly?: boolean;
  userEmail: string;
  currentUser: string | null | undefined;
  reviews: number;
  reviewers: string[];
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  value = 0,
  readOnly = false,
  userEmail,
  currentUser,
  reviews,
  reviewers,
}) => {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setRating(reviews / reviewers.length);
  }, [reviews, reviewers]);

  const sendRating = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (rating > 0) {
        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (docSnapshot) => {
            const docRef = doc(db, "users", docSnapshot.id);
            await updateDoc(docRef, {
              reviewers: arrayUnion(currentUser),
              reviews: increment(rating),
            })
              .then(() => {
                cancelHandler();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      }
    },
    [currentUser, rating, userEmail]
  );

  const openHandler = () => {
    setIsActive(true);
  };
  const cancelHandler = () => {
    setIsActive(false);
  };
  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
              starValue <= (hover || rating)
                ? "text-yellow-400"
                : "text-gray-300"
            } ${readOnly || !isActive ? "cursor-default" : "cursor-pointer"}`}
            onClick={() => !readOnly && isActive && setRating(starValue)}
            onMouseEnter={() => !readOnly && isActive && setHover(starValue)}
            onMouseLeave={() => !readOnly && isActive && setHover(0)}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.925 1.428 8.269L12 18.902l-7.364 4.598 1.428-8.269L0 9.306l8.332-1.151z" />
          </svg>
        );
      })}
      {currentUser &&
      userEmail !== currentUser &&
      !reviewers.includes(currentUser) ? (
        !isActive ? (
          <div
            className="ml-2 text-xs text-white rounded px-2 py-1 bg-[#0652e9] hover:bg-[#0342c1] cursor-pointer transition-colors duration-300"
            onClick={openHandler}
          >
            Rate
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <div
              className="text-xs text-white rounded px-2 py-1 bg-[#0652e9] hover:bg-[#0342c1] cursor-pointer transition-colors duration-300"
              onClick={sendRating}
            >
              Send
            </div>
            <div
              className="text-xs text-white rounded px-2 py-1 bg-red-500 hover:bg-red-700 cursor-pointer transition-colors duration-300"
              onClick={cancelHandler}
            >
              Cancel
            </div>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default StarRating;
