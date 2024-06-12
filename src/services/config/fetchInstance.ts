import { BASE_URL_API } from "@/shared/config";
import { TOKEN } from "@/shared/constanst/defaultConsts";
import { getLocalStorage } from "@/shared/utils/localStorageUtils";
import { HEADERS_APPLICATION_JSON } from "./const";

const controllerInstanceAuth = new AbortController();

export const instanceAuthHeaders = () => {
  const token = getLocalStorage(TOKEN);

  if (!token) return "";
  return `Bearer ${token}`;
};

const fetchInstance: FetchInstance = async (props: FetchInstanceProps) => {
  const { url, body, headers = HEADERS_APPLICATION_JSON, options } = props;

  try {
    const response = await fetch(`${BASE_URL_API}${url}`, {
      ...options,
      signal: controllerInstanceAuth.signal,
      headers: { ...headers, Authorization: instanceAuthHeaders() },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    result.ok = response.ok;

    return result;
  } catch (error) {
    throw new Error("Ha ocurrido un error en la petición");
  }
};

export { fetchInstance };

export interface FetchInstanceProps {
  url: string;
  body?: any;
  headers?: HeadersInit | undefined;
  options?: any | {};
}

export type FetchInstance = (props: FetchInstanceProps) => Promise<any>;
