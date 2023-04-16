import { signIn, signup } from "../service/api";
import { toast } from "react-toastify";

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const { data } = await signIn(formData);
    dispatch({ type: "LOGIN_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    toast.error(error?.data);
    dispatch({ type: "LOGIN_FAIL" });
  }
};

export const register = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const { data } = await signup(formData);
    dispatch({ type: "LOGIN_SUCCESS", data: data });
  } catch (error) {
    console.log({ error });
    toast.error(error?.data?.message);
    dispatch({ type: "LOGIN_FAIL" });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
