"use client";
import { TOKEN } from "@/shared/constanst/defaultConsts";
import { URL_LOGIN } from "@/shared/constanst/routesPaths";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { getLocalStorage } from "@/shared/utils/localStorageUtils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import Logo from "../ui/icons/Logo";

const Footer = () => {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const token = getLocalStorage(TOKEN);
  const [isLaoding, setIsLaoding] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    handleIntial();
  }, []);

  const handleIntial = () => {
    if (token) {
      setIsLaoding(false);
    }
  };

  if (isLaoding && pathname !== URL_LOGIN)
    return (
      <div
        className={`flex  ${
          !isDesktop ? "justify-end pr-8" : "pr-0 justify-center"
        } items-center fixed bottom-0 left-0 z-2 w-[100%]  mb-2 bg-popover dark:bg-popover dark:border-secondary`}
      >
        <Skeleton className="w-[100px] h-8 mr-2" />

        <Skeleton className="w-[50px] h-[50px] rounded-full" />
      </div>
    );

  return (
    <footer id="contact" className="bg-background p-4 w-full dark:bg-background">
      <div className="text-center mt-2 text-gray-500 dark:text-white">&copy; {new Date().getFullYear()} Carlos Marín.</div>
    </footer>
  );
};

export default Footer;
