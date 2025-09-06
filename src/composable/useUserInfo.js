import { reactive } from "vue";

export const userInfo = () => {
  const user = reactive({
    name: "",
    age: 0,
    token: "",
  });
  return {
    user,
  };
};
