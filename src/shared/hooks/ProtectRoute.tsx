"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { TOKEN } from "../constanst/defaultConsts";
import { URL_HOME, URL_LOGIN } from "../constanst/routesPaths";
import { getLocalStorage } from "../utils/localStorageUtils";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const token = getLocalStorage(TOKEN);
  const pathname = usePathname();

  useEffect(() => {
    handleProtectRoute();
    handleDisableZoom()
  }, [pathname]);

  const handleDisableZoom = () => {
    document.addEventListener(
      "touchmove",
      function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  };

  const handleProtectRoute = () => {
    if (!token) {
      router.push(URL_LOGIN);
      return;
    }

    if (pathname === URL_LOGIN && token) {
      router.push(URL_HOME);
      return;
    }
  };

  return children;
};

export default ProtectRoute;
