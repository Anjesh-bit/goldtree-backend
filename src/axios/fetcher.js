import axiosInstance from "./AxiosInstance";
export const fetcher = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (e) {
    throw e;
  }
};
