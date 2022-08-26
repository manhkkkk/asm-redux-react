import instance from "./instance";

export const getUser = () => {
   const url = `/users`;
   return instance.get(url);
}
