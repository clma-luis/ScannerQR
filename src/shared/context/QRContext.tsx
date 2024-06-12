"use client";
import { useToast } from "@/components/ui/Toast/use-toast";
import React, { useEffect, useState } from "react";

export interface AlertInfoProps {
  title: string;
  description: string;
  variant?: "default" | "destructive" | "undefined";
}

export interface QRContextProps {
  activeAlert: boolean;
  setactiveAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertInfo: React.Dispatch<React.SetStateAction<AlertInfoProps>>;
}

export const QRContext = React.createContext({} as QRContextProps);

const QRProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeAlert, setactiveAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfoProps>({ title: "", description: "", variant: "default" });
  const { toast } = useToast();


  useEffect(() => {
    if (activeAlert) {
      setTimeout(() => handleOpenAlert(), 300);
    }
  }, [activeAlert]);

  const handleOpenAlert = () => {
    setTimeout(() => setactiveAlert(false), 4000);
    handleErrorAlert();
  };

  const handleErrorAlert = () => {
    toast({
      title: alertInfo.title,
      description: `* ${alertInfo.description}`,
      variant: "destructive",
    });
  };

  const contextValue: QRContextProps = {
    activeAlert,
    setactiveAlert,
    setAlertInfo,
  };

  return <QRContext.Provider value={contextValue}>{children}</QRContext.Provider>;
};

export default QRProvider;
