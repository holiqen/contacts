import React, { useContext, useEffect, useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

export const loadUser = async (dispatch) => {
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post("/api/users", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    await loadUser(dispatch); // MAYBE
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post("/api/auth", formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    await loadUser(dispatch); // MAYBE
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  setAuthToken(state.token);

  if (state.loading) {
    loadUser(dispatch);
  }

  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return <AuthContext.Provider value={{ state: state, dispatch }}>{props.children}</AuthContext.Provider>;
};

export default AuthState;
