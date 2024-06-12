import { connection } from "../config/connection";
import { ErrorResponse } from "../login/loginTypes";

import { DataServiceResponse, UpdateDataServiceProps } from "./boatTypes";

const API = connection();

export const getDataService = (id: string): DataServiceResponse | ErrorResponse => {
  const response: DataServiceResponse | ErrorResponse = {
    data: {
      codigoEmbarcacion: 123,
      embarcacion: "1",
      fechaIngreso: "2023-05-17T00:00:00.000Z",
      nombreSocio: "Petter",
      numeroSocio: "123",
      apellidoMaterno: "Petter",
      apellidoPaterno: "Petter",
      estado: "activo",
      fechaEstado: "2023-05-17T00:00:00.000Z",
      nombreCompletoSocio: "Petter Petter",
      idEmbarcacion: "345345",
    },
    ok: true,
  };
  return response;
};

export const updateStatusBoatService = (body: UpdateDataServiceProps): DataServiceResponse | ErrorResponse => {
  const data: DataServiceResponse | ErrorResponse = {
    data: {
      codigoEmbarcacion: 123,
      embarcacion: "1",
      fechaIngreso: "2023-05-17T00:00:00.000Z",
      nombreSocio: "Petter",
      numeroSocio: "123",
      apellidoMaterno: "Petter",
      apellidoPaterno: "Petter",
      estado: "activo",
      fechaEstado: "2023-05-17T00:00:00.000Z",
      nombreCompletoSocio: "Petter Petter",
      idEmbarcacion: "345345",
    },
    ok: true,
  };
  return data;
};
