"use client";
import { createContext, useContext, useState } from "react";
import { Alert } from "@/components/Alert";

interface AlertTypes {
  message: string;
  type: "info" | "success" | "error" | "warning";
}

const AlertContext = createContext({
  showAlert: ({}: AlertTypes) => {},
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<AlertTypes | null>(null);

  const showAlert = ({ message, type }: AlertTypes) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
