"use client"
import SpinnerLoading from "@/components/SpinnerLoading";
import { usePathname } from "next/navigation";
import React, { useEffect } from 'react';
import { TOKEN } from "../constanst/defaultConsts";
import { URL_LOGIN } from "../constanst/routesPaths";
import { getLocalStorage } from "../utils/localStorageUtils";

const ValidateUser = ({children}: {children: React.ReactNode}) => {
  const token = getLocalStorage(TOKEN);
  const [isLaoding, setIsLaoding] = React.useState(true);
  const pathname = usePathname();

  useEffect(() => {
    handleIntial();
  }, []);

  const handleIntial = () => {
    if (token) {
      setIsLaoding(false);
    } else if (pathname === URL_LOGIN && !token) {
      setIsLaoding(false);
    }
  };

  if (isLaoding)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
      <SpinnerLoading  height="10" width="10" color/>
    </div>
    );

  return <>{children}</>;

}

export default ValidateUser