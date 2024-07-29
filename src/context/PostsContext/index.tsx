"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  collection,
  query,
  onSnapshot,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export interface PostData {
  date: string;
  description: string;
  id: string;
  time: string;
  title: string;
  userEmail: string;
  userName: string;
  followers: string[];
}

interface PostsContextProps {
  postsData: { [key: string]: PostData[] };
  setConditions: (key: string, conditions: QueryConstraint[]) => void;
}

interface PostsProviderProps {
  children: ReactNode;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [postsData, setPostsData] = useState<{ [key: string]: PostData[] }>({});
  const [conditions, setConditions] = useState<{
    [key: string]: QueryConstraint[];
  }>({});

  const setConditionsForKey = (key: string, conditions: QueryConstraint[]) => {
    setConditions((prevConditions) => ({
      ...prevConditions,
      [key]: conditions,
    }));
  };

  useEffect(() => {
    Object.keys(conditions).forEach((key) => {
      const postsCollection = collection(db, "posts");
      const q = query(postsCollection, ...conditions[key]);

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (!querySnapshot.empty) {
            const posts: PostData[] = querySnapshot.docs.map((doc) => ({
              ...(doc.data() as PostData),
            }));
            setPostsData((prevPostsData) => ({
              ...prevPostsData,
              [key]: posts,
            }));
          } else {
            setPostsData((prevPostsData) => ({
              ...prevPostsData,
              [key]: [],
            }));
          }
        },
        (error) => {
          console.error("Error fetching posts: ", error);
        }
      );

      return () => unsubscribe();
    });
  }, [conditions]);

  return (
    <PostsContext.Provider
      value={{ postsData, setConditions: setConditionsForKey }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = (): PostsContextProps => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePostsContext must be used within a PostsProvider");
  }
  return context;
};
