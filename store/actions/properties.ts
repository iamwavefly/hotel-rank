import { store } from "..";
import { PropertyProps } from "../../interfaces/main";
import { SET_PROPERTY, DEL_PROPERTY, UPDATE_PROPERTY } from "../types";

export const setProperty = (payload: PropertyProps) => ({
  type: SET_PROPERTY,
  payload,
});

export const updateProperty = (payload: PropertyProps) => ({
  type: UPDATE_PROPERTY,
  payload,
});

export const deleteProperty = (id: string) => {
  const properties = store.getState().properties as PropertyProps[];
  const newProperties = properties.filter((property) => property.id !== id);
  return {
    type: DEL_PROPERTY,
    payload: newProperties,
  };
};
