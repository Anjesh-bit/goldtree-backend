import axiosInstance from "./AxiosInstance";

const uploader = async (url, payload) => {
  try {
    const { data } = await axiosInstance.post(url, payload);
    return data;
  } catch (e) {
    throw e;
  }
};

const putUploader = async (url, payload) => {
  try {
    const { data } = await axiosInstance.put(url, payload);
    return data;
  } catch (e) {
    throw e;
  }
};

export { uploader, putUploader };
