import { ReactElement } from "react";
import { ActionProps, PropertyProps } from "../../interfaces/main";
import { SET_PROPERTY, DEL_PROPERTY, UPDATE_PROPERTY } from "../types";

const initialState: PropertyProps[] = [
  {
    id: "",
    name: "",
    city: "",
    country: "",
    address: "",
    date: new Date(),
    tag: "",
    type: "",
    price: 0,
    discount: 0,
    rooms: 0,
    toilets: 0,
    age: 0,
    parking: "",
  },
];

export default function (state = initialState, action: ActionProps) {
  const { payload } = action;
  switch (action.type) {
    case SET_PROPERTY:
      return [payload, ...state];
    case DEL_PROPERTY:
      return payload;
    case UPDATE_PROPERTY:
      return payload;
    default:
      return state;
  }
}
