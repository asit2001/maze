import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_PROFILE_THUNK, GET_PROFILE_THUNK, useAppDispatch } from ".";
import { USER_LOGIN_THUNK, USER_REGISTER_THUNK, expireUser } from ".";
import axios, { isAxiosError } from "axios";
import { LoginProps, RegisterProps } from "./props";
import { ResProfile, userProfile } from "../type";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API;
const authAxios = axios.create();

authAxios.interceptors.request.use((config) => {
  if (document.cookie) {
    config.withCredentials = true;
    return config;
  }
  const dispatch = useAppDispatch();
  dispatch(expireUser());
  return Promise.reject(new Error("Cookie not found"));
});

export const logInThunk = createAsyncThunk(
  USER_LOGIN_THUNK,
  async ({ email, password }: LoginProps) => {
    try {
      let response = await axios.post("/api/user/login", {
        email,
        password,
      });
      return {
        data: response.data,
      };
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.error);
      }
      throw error;
    }
  }
);

export const RegisterThunks = createAsyncThunk(
  USER_REGISTER_THUNK,
  async ({ email, name, password }: RegisterProps) => {
    await axios.post("/api/user/signup", {
      email,
      name,
      password,
    });
  }
);

export const addProfile = createAsyncThunk(
  ADD_PROFILE_THUNK,
  async (obj: userProfile) => {
    try {
      const res = await axios.post("/api/profile", obj);
      return res.data as ResProfile;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.error);
      }
      throw error;
    }
  }
);
export const getProfile = createAsyncThunk(GET_PROFILE_THUNK, async () => {
  try {
    const res = await axios.get("/api/profile");
    return res.data as ResProfile[];
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
    throw error;
  }
});
