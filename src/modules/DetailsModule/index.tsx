"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProtectRoute from "@/shared/hooks/ProtectRoute";
import DataDetails from "./components/DataDetails";
import SpinnerLoading from "@/components/SpinnerLoading";
import { URL_HOME } from "@/shared/constanst/routesPaths";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/shared/utils/localStorageUtils";
import { useRouter } from "next/navigation";
import { BOAT_ID_VARIABLE, BOAT_VARIABLE } from "@/shared/constanst/defaultConsts";

const DetailsModule = () => {
  const router = useRouter();
  const idResult = getLocalStorage(BOAT_ID_VARIABLE);
  const dataResult = getLocalStorage(BOAT_VARIABLE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleInit();
  }, []);

  const handleInit = () => {
    if (!idResult && !dataResult) {
      router.push(URL_HOME);
      return;
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex flex-col justify-center items-center">
          <SpinnerLoading height="10" width="10" color />
        </div>
      </div>
    );

  return (
    <ProtectRoute>
      <div className="h-screen w-screen flex flex-col justify-between">
        <Navbar showArrowBack />
        <div className="w-full h-full">
          <DataDetails />
        </div>
        <div className="h-[64px] w-full" />
        <Footer />
      </div>
    </ProtectRoute>
  );
};

export default DetailsModule;
