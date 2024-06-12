"use client";
import { BOAT_ID_VARIABLE, PREV_PATH_VARIABLE } from "@/shared/constanst/defaultConsts";
import { URL_DETAILS, URL_HOME } from "@/shared/constanst/routesPaths";
import useQR from "@/shared/hooks/useQR";
import { isJSON } from "@/shared/utils";
import { setLocalStorage } from "@/shared/utils/localStorageUtils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { useToast } from "../ui/Toast/use-toast";
import CloseRoundedIcon from "../ui/icons/CloseRoundedIcon";
import "./QrStyles.css";

interface QrComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QRComponent = (props: QrComponentProps) => {
  const { open, setOpen } = props;
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const { dismiss } = useToast();
  const { setactiveAlert, setAlertInfo } = useQR();

  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    
    const current = {id: true}
    setScannedResult(result.data);

    if (!!current.id) {
      setLocalStorage(BOAT_ID_VARIABLE, `current.id`);
      setLocalStorage(PREV_PATH_VARIABLE, pathname);
      router.push(URL_DETAILS);
      dismiss();
      setOpen(false);
    } else {
      if (open) {
        setAlertInfo({ title: "Error", description: "QR no válido", variant: "destructive" });
        setactiveAlert(true);
      }

      setOpen(false);
      router.push(URL_HOME);
    }
  };

  const onScanFail = (err: string | Error) => {};

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err: any) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert("La cámara está bloqueada o no se puede acceder a ella. Permita los permisos de la cámara en su navegador y vuelva a cargar.");
  }, [qrOn]);

  return (
    <div className="qr-reader">
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <Image src={"/qr-frame.svg"} alt="Qr Frame" width={256} height={256} className="qr-frame" />
      </div>

      <Button
        size="icon"
        className="absolute top-4 right-4 z-50 w-[50px] h-[50px] border-none bg-transparent hover:bg-transparent focus:outline-none focus:border-transparent"
        onClick={() => {
          setOpen(false);
        }}
      >
        <CloseRoundedIcon width={40} height={40} />
      </Button>

      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
};

export default QRComponent;
