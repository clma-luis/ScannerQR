import { AlertDialogComponent } from "@/components/AlertDialogComponent";
import { Card } from "@/components/ui/Card";
import { DrawerDialog } from "@/modules/PrincipalModule/components/drawer";
import { TOKEN } from "@/shared/constanst/defaultConsts";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { formatDate } from "@/shared/utils";
import { getLocalStorage } from "@/shared/utils/localStorageUtils";
import { useEffect, useState } from "react";
import { embarcacionInfoConfig, socioInfoConfig } from "../../config";
import SkeletonDetails from "../SkeletonDetails";
import BoxComponent from "./components/BoxComponent";
import CallsToActions from "./components/CallsToActions";
import SelectComponent from "./components/SelectComponent";
import SubtitleSection from "./components/SubtitleSection";
import useDataDetails from "./hook";

const DataDetails = () => {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [isLoadPage, setIsLaadPage] = useState(true);
  const token = getLocalStorage(TOKEN);

  const {
    isLoading,
    activeScanner,
    openDialog,
    currentData,
    selectedValue,
    disableBtn,
    dismiss,
    setOpenDialog,
    setActiveScanner,
    handleDisabledUpdateBtn,
    executeUpdateStatus,
    handleOnChangeValue,
  } = useDataDetails();

  useEffect(() => {
    handleIntial();
  }, []);

  const handleIntial = () => {
    if (token) {
      setIsLaadPage(false);
    }
  };

  return (
    <>
      <Card className={`p-4 w-[100%] max-w-screen-sm mx-auto ${isDesktop ? "border" : "border-none shadow-none"} `}>
        {isLoading || isLoadPage ? (
          <SkeletonDetails />
        ) : (
          <div className="w-full grid gap-1 grid-cols-2 justify-start pb-2">
            <SubtitleSection subtitle="Información Socio" />
            <div />
            <BoxComponent config={socioInfoConfig} data={currentData} />
            <SubtitleSection subtitle="Información Embarcación" className="mt-6 col-span-2" />
            <BoxComponent config={embarcacionInfoConfig} data={currentData} />
            <div />
            <div className="p-1 pt-4">
              <p className="font- min-w-[190px] text-[14px] font-semibold text-[#848484] ">Estado</p>
              <p className="font-custom font-semibold text-[14px]">{currentData.estado || "-"}</p>
            </div>
            <div className="p-1 pt-4">
              <p className="font- min-w-[190px] text-[14px] font-semibold text-[#848484] ">Fecha estado</p>
              <p className="font-custom font-semibold text-[14px]">{formatDate(currentData.fechaEstado)}</p>
            </div>
          </div>
        )}

        <SelectComponent
          selectedValue={selectedValue}
          isLoadPage={isLoadPage}
          handleOnChangeValue={handleOnChangeValue}
        />

        <CallsToActions
          executeUpdateStatus={executeUpdateStatus}
          isLoading={isLoading}
          isLoadPage={isLoadPage}
          disableBtn={disableBtn}
          setActiveScanner={setActiveScanner}
          handleDisabledUpdateBtn={handleDisabledUpdateBtn}
          dismiss={dismiss}
        />
      </Card>
      <DrawerDialog hideBtn activeScanner={activeScanner} setActiveScanner={setActiveScanner} />
      <AlertDialogComponent open={openDialog} setOpen={setOpenDialog} />
    </>
  );
};

export default DataDetails;
