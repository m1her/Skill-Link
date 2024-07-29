"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

interface UserData {
  profileImg: string;
  name: string;
  email: string;
  specialty: string;
  goal: string;
}

interface UserContextProps {
  userData: UserData | null;
  setUserEmail: (email: string) => void;
  user: User | null | undefined;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (userEmail) {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", userEmail));

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setUserData({
              profileImg: doc.data().profileImg,
              name: doc.data().name,
              email: doc.data().email,
              specialty: doc.data().specialty,
              goal: doc.data().goal,
            });
          }
        },
        (error) => {
          console.error("Error fetching user document: ", error);
        }
      );

      return () => unsubscribe();
    }
  }, [userEmail]);

  return (
    <UserContext.Provider value={{ userData, setUserEmail, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};
