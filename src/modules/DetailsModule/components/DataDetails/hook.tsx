import { useToast } from "@/components/ui/Toast/use-toast";
import { getDataService, updateStatusBoatService } from "@/services/boat";
import { DataServiceResponse, IBoatData } from "@/services/boat/boatTypes";
import { ErrorResponse } from "@/services/login/loginTypes";
import { BOAT_ID_VARIABLE, BOAT_VARIABLE, PREV_PATH_VARIABLE, USER_VARIABLE } from "@/shared/constanst/defaultConsts";
import { URL_DETAILS } from "@/shared/constanst/routesPaths";
import { errorMessages, genericErrorMessage } from "@/shared/constanst/statusMessages";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/shared/utils/localStorageUtils";
import { useEffect, useState } from "react";

const useDataDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const idResult = getLocalStorage(BOAT_ID_VARIABLE);
  const dataResult = getLocalStorage(BOAT_VARIABLE);
  const prevPath = getLocalStorage(PREV_PATH_VARIABLE);
  const userData = getLocalStorage(USER_VARIABLE);
  const [activeScanner, setActiveScanner] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast, dismiss } = useToast();
  const [disableBtn, setDisableBtn] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState<IBoatData | {}>({});
  const currentData = data as IBoatData;


  useEffect(() => {

    handleInitData();

    if (idResult) {
      executeService();
    }
  }, []);

  useEffect(() => {
    if (idResult && prevPath === URL_DETAILS) {
      executeService();
    }
  }, [idResult]);

  const executeService = async () => {
    setIsLoading(true);

    try {
      const response = getDataService("this is a test");

      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        handleErrorAlert(errorMessages[errorResponse.statusCode], errorResponse.error);
        return;
      }

      const avalibleResponse = response as DataServiceResponse;
      const { data } = avalibleResponse;
      data.idEmbarcacion = idResult;
      setData(data);
      setSelectedValue("");
      setLocalStorage(BOAT_VARIABLE, JSON.stringify(data));
    } catch (error) {
      handleErrorAlert(errorMessages[500], genericErrorMessage);
    } finally {
      setIsLoading(false);
      removeLocalStorage(BOAT_ID_VARIABLE);
      removeLocalStorage(PREV_PATH_VARIABLE);
    }
  };

  const executeUpdateStatus = async () => {
    if (handleDisabledUpdateBtn() || !selectedValue) return;
    setIsLoading(true);
    try {
      const body = {
        idEmbarcacion: `${dataResult.codigoEmbarcacion}`,
        idEstado: selectedValue,
        idUsuario: userData.userId,
      };

      const response = await updateStatusBoatService(body);
      setData(response);
      setLocalStorage(BOAT_VARIABLE, JSON.stringify(response));
      setOpenDialog(true);
      setSelectedValue("");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitData = async () => {
    if (dataResult) {
      setData(dataResult);
    }
  };

  const handleErrorAlert = (title: string, description: string) => {
    toast({
      title: title,
      description: `* ${description}`,
      variant: "destructive",
    });
  };

  const handleOnChangeValue = (value: string) => {
    setSelectedValue(value);
  };


  const handleDisabledUpdateBtn = () => {
    return isLoading || disableBtn || !dataResult || !selectedValue;
  };

  return {
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
    handleOnChangeValue
  };
};

export default useDataDetails;
