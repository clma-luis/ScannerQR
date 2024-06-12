import { Dispatch } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "../ui/AlertDialog/alert-dialog";

interface AlertComponentProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function AlertDialogComponent(props: AlertComponentProps) {
  const { open, setOpen } = props;
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estado Actualizado</AlertDialogTitle>
          <AlertDialogDescription>Se ha actualizado el estado de la embarcacion de forma exitosa</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setOpen(false)}>ACEPTAR</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
