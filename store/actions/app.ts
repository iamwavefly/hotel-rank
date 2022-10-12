import { store } from "..";
import { ContentEditProps, GeocodeProps } from "../../interfaces/main";
import {
  TOGGLE_DRAWAL,
  EDIT_PROPERTY,
  UPDATE_SEARCH_TERM,
  UPDATE_GEOCODE,
} from "../types";

export const toggleDrawer = () => {
  const { drawalOpen } = store.getState().app;
  return {
    type: TOGGLE_DRAWAL,
    payload: !drawalOpen,
  };
};

export const editProperty = (payload: ContentEditProps) => {
  return {
    type: EDIT_PROPERTY,
    payload,
  };
};

export const updateSearchTerm = (payload: string) => {
  return {
    type: UPDATE_SEARCH_TERM,
    payload,
  };
};

export const updateGeocode = (payload: GeocodeProps) => {
  return {
    type: UPDATE_GEOCODE,
    payload,
  };
};
