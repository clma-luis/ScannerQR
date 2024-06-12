export interface UpdateDataServiceProps {
  idEmbarcacion: string;
  idEstado: string;
  idUsuario: string;
}

export interface IBoatData {
  codigoEmbarcacion: number;
  embarcacion: string;
  fechaIngreso: string;
  nombreSocio: string;
  numeroSocio: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  estado: string;
  fechaEstado: string;
  nombreCompletoSocio: string;
  idEmbarcacion: string;
}

export interface DataServiceResponse {
  data: IBoatData;
  ok: boolean;
}
