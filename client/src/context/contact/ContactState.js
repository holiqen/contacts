import React, { useContext, useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  GET_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from "../types";

export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get("/api/contacts");

    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg,
    });
  }
};

export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post("/api/contacts", contact);

    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg,
    });
  }
};

export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`/api/contacts/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg,
    });
  }
};

export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact);

    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg,
    });
  }
};

export const clearContacts = (dispatch) => {
  dispatch({ type: CLEAR_CONTACTS });
};

export const setCurrent = (dispatch, contact) => {
  dispatch({ type: SET_CURRENT, payload: contact });
};

export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

export const filterContacts = (dispatch, text) => {
  dispatch({ type: FILTER_CONTACTS, payload: text });
};

export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return <ContactContext.Provider value={{ state: state, dispatch }}>{props.children}</ContactContext.Provider>;
};

export default ContactState;
