import { useContext } from "react";
import { QRContext } from "../context/QRContext";

const useQR = () => {
  const { activeAlert, setactiveAlert, setAlertInfo } = useContext(QRContext);

  return { activeAlert, setactiveAlert, setAlertInfo };
};

export default useQR;
