import { ErrorResponse, LoginServiceProps, LoginServiceResponse } from "./loginTypes";

export const loginService = async (body: LoginServiceProps): Promise<LoginServiceResponse | ErrorResponse> => {
  const response = {
    data: {
      access_token: "asdfasdf34534jjk45jk.34kj534k5j345k34jh.3jk4h53kj4534k5h3l4k5j3seksdfgqwer",
      userId: 1,
      user: body.userName,
      userName: body.userName,
    },
    ok: true,
  };
  return response;
};
