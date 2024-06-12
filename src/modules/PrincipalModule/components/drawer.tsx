import * as React from "react";
import QRComponent from "@/components/QRComponent";
import { Button } from "@/components/ui/Button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/Drawer";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useToast } from "@/components/ui/Toast/use-toast";
import { getLocalStorage } from "@/shared/utils/localStorageUtils";
import { TOKEN } from "@/shared/constanst/defaultConsts";
import { Skeleton } from "@/components/ui/Skeleton";
import useQR from "@/shared/hooks/useQR";

interface DrawerDialogProps {
  hideBtn?: boolean;
  activeScanner?: boolean;
  setActiveScanner?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DrawerDialog(props: DrawerDialogProps) {
  const { hideBtn = false, activeScanner, setActiveScanner } = props;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { dismiss } = useToast();
  const token = getLocalStorage(TOKEN);
  const [isLaoding, setIsLaoding] = React.useState(true);
  const { setactiveAlert } = useQR();

  React.useEffect(() => {
    activeScanner && setOpen(true);
  }, [activeScanner]);

  React.useEffect(() => {
    open === false && setActiveScanner && setActiveScanner(false);
  }, [open]);

  React.useEffect(() => {
    handleIntial();
  }, []);

  const handleIntial = () => {
    if (token) {
      setIsLaoding(false);
    }
  };

  const handleQRBtn = () => {
    setOpen(true);
    dismiss();
    setactiveAlert(false);
  };

  if (isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {isLaoding ? (
            <Skeleton className="h-60 w-60 rounded-full " />
          ) : (
            <>
              {!hideBtn && (
                <Button className="rounded-full h-60 w-60 focus:bg-[#002167] text-[24px] font-bold" onClick={handleQRBtn}>
                  Escanear QR
                </Button>
              )}
            </>
          )}
        </DrawerTrigger>
        <DrawerContent className=" h-full rounded-t-[0px] border-none bg-">
          <QRComponent setOpen={setOpen} open={open} />
          <div className="relative">
            <Button variant="destructive" className="absolute top-4 right-4">
              CERRAR
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {!hideBtn && (
          <>
            {isLaoding ? (
              <Skeleton className="h-60 w-60 rounded-full " />
            ) : (
              <Button className="rounded-full h-60 w-60 focus:bg-[#002167] text-[24px] font-bold" onClick={handleQRBtn}>
                Escanear QR
              </Button>
            )}
          </>
        )}
      </DrawerTrigger>
      <DrawerContent className=" h-full rounded-t-[0px] border-none bg-">
        <QRComponent setOpen={setOpen} open={open} />
        <div className="relative">
          <Button variant="destructive" className="absolute top-4 right-4">
            CERRAR
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
