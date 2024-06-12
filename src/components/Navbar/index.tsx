"use client";
import { BOAT_VARIABLE, TOKEN, USER_VARIABLE } from "@/shared/constanst/defaultConsts";
import { URL_HOME, URL_LOGIN } from "@/shared/constanst/routesPaths";
import { getLocalStorage, removeLocalStorage } from "@/shared/utils/localStorageUtils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";
import ArrowLeftIcon from "../ui/icons/ArrowLeftIcon";
import LogoutIcon from "../ui/icons/LogoutIcon";
import Logo from "../ui/icons/Logo";

interface NavbarProps {
  showArrowBack?: boolean;
}

const Navbar = (props: NavbarProps) => {
  const { showArrowBack } = props;
  const token = getLocalStorage(TOKEN);
  const [isLaoding, setIsLaoding] = useState(true);

  const router = useRouter();

  useEffect(() => {
    handleIntial();
  }, []);

  const handleLogout = () => {
    removeLocalStorage(TOKEN);
    removeLocalStorage(BOAT_VARIABLE);
    removeLocalStorage(USER_VARIABLE);
    router.push(URL_LOGIN);
  };

  const handleNavigation = () => {
    router.push(URL_HOME);
  };

  const handleIntial = () => {
    if (token) {
      setIsLaoding(false);
    }
  };

  return (
    <nav className="w-screen  border-gray-200  bg-background dark:bg-background">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="">
          {showArrowBack ? (
            <>
              {isLaoding ? (
                <Skeleton className="w-[50px] h-12 " />
              ) : (
                <Button
                  disabled={isLaoding}
                  size="icon"
                  className=" w-[50px] h-[50px] border-none bg-transparent hover:bg-transparent focus:outline-none focus:border-transparent"
                  onClick={handleNavigation}
                >
                  <ArrowLeftIcon width={30} height={30} />
                </Button>
              )}
            </>
          ) : (
            <>
              {isLaoding ? (
                <Skeleton className="w-[100px] h-12 " />
              ) : (
                <Button onClick={handleLogout}>
                  <LogoutIcon width={25} height={25} /> &nbsp; Cerrar sesión
                </Button>
              )}
            </>
          )}
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {isLaoding ? (
            <Skeleton className="w-[80px] h-[80px] " />
          ) : (
            <Logo width={50} height={50}  />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
