"use client";
import SpinnerLoading from "@/components/SpinnerLoading";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import useQR from "@/shared/hooks/useQR";

interface CallsToActionsProps {
  executeUpdateStatus: () => void;
  isLoading: boolean;
  isLoadPage: boolean;
  disableBtn: boolean;
  setActiveScanner: (value: boolean) => void;
  handleDisabledUpdateBtn: () => boolean;
  dismiss: () => void;
}

const CallsToActions = (props: CallsToActionsProps) => {
  const { executeUpdateStatus, isLoading, isLoadPage, disableBtn, setActiveScanner, handleDisabledUpdateBtn, dismiss } = props;
  const { setactiveAlert } = useQR();

  const handleQRBtn = () => {
    setActiveScanner(true);
    dismiss();
    setactiveAlert(false);
  };

  if (isLoadPage)
    return (
      <div className="mt-[8px]">
        <Skeleton className="w-full h-12 " />
        <Skeleton className="w-full h-12 mt-[8px] " />
      </div>
    );

  return (
    <div className="mt-[6px] px-[0.5px]">
      <Button onClick={executeUpdateStatus} className="w-full mt-[8px]" disabled={handleDisabledUpdateBtn() || isLoadPage}>
        {isLoading ? <SpinnerLoading width="4" height="4" border="2" /> : "ACTUALIZAR"}
      </Button>
      <Button onClick={handleQRBtn} className="w-full mt-[8px]" disabled={isLoading || disableBtn || isLoadPage}>
        ESCANEAR
      </Button>
      <div className="mt-[64px]"/>
    </div>
  );
};

export default CallsToActions;
