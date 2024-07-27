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

interface UserData {
  profileImg: string;
  name: string;
  email: string;
  specialty: string;
  goal: string;
}

interface UserContextProps {
  userData: UserData | null;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (user?.email) {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", user.email));

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
  }, [user]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};

export const useUserData = (): UserData | null => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context.userData;
};
