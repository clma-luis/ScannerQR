export interface LoginServiceProps {
  userName: string;
  password: string;
}

export interface LoginServiceResponse {
  data: {
    access_token: string;
    userId: number;
    user: string;
    userName: string;
  };
  ok: boolean;
}

export interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  ok: boolean;
}
