import { ReactElement } from "react";
import { ActionProps, AppProps } from "../../interfaces/main";
import {
  EDIT_PROPERTY,
  TOGGLE_DRAWAL,
  UPDATE_GEOCODE,
  UPDATE_SEARCH_TERM,
} from "../types";

const initialState: AppProps = {
  drawalOpen: false,
  searchText: "",
  selectedGeoCode: {
    lat: 0,
    lng: 0,
  },
  onContentEdit: {
    init: false,
    id: "",
  },
};

export default function (state = initialState, action: ActionProps) {
  const { payload } = action;
  switch (action.type) {
    case TOGGLE_DRAWAL:
      return { drawalOpen: payload };
    case EDIT_PROPERTY:
      return { onContentEdit: payload };
    case UPDATE_SEARCH_TERM:
      return { searchText: payload };
    case UPDATE_GEOCODE:
      return { selectedGeoCode: payload };
    default:
      return state;
  }
}
