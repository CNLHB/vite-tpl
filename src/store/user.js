import { defineStore } from "pinia";
import { userInfo } from "../composable/useUserInfo";
export const userStore = defineStore("user", () => {
  const { user } = userInfo();
  function setUserInfo(info) {
    user.name = info.name;
    user.age = info.age;
  }
  function setToken(token) {
    user.token = token;
  }
  return {
    user,
    setUserInfo,
    setToken,
  };
});
