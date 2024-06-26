import Cookies from "js-cookie";

const getCookies = (key) => {
  return Cookies.get(key);
};

const setCookies = (key, value, exp) => {
  const expires = new Date(exp * 1000);
  expires.toUTCString();
  return Cookies.set(key, value, { expires });
};

const deleteCookies = (key) => {
  Cookies.remove(key);
};

export { getCookies, setCookies, deleteCookies };
