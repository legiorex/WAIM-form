import axios from "axios";

export const customAxios = axios.create({
  baseURL: "https://dummyjson.com",
});

export const customInstance = <T>(config: unknown): Promise<T> => {
  return customAxios(config).then(({ data }) => data);
};
