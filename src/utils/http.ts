import type { AxiosError, AxiosRequestConfig } from 'axios';
import Axios from 'axios';
import qs from 'qs';
import { toast } from 'react-toastify';

const axios = Axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
  },
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError<{ code: number; message: string }>) {
    if (error.response?.data != null) {
      toast.error(error.response.data.message);
    }

    return await Promise.reject(error);
  },
);

export const http = {
  async get<Request = any, Response = unknown>(url: string, config?: AxiosRequestConfig<Request>) {
    return await axios.get<Response>(url, config).then((res) => res.data);
  },
};
