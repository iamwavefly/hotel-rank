import { ReactNode } from "react";

export interface ReactNodeProps {
  children?: ReactNode;
}

export interface ActionProps {
  type?: string;
  payload: string | object;
}

export interface ContentEditProps {
  init: boolean;
  id: string;
}

export interface GeocodeProps {
  lat: number;
  lng: number;
}

export interface AppProps {
  drawalOpen?: boolean;
  searchText: string;
  onContentEdit: ContentEditProps;
  selectedGeoCode?: GeocodeProps;
}

export interface PropertyProps {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  date: Date;
  tag: string;
  type: string;
  price: number;
  discount: number;
  rooms: number;
  toilets: number;
  age: number;
  parking: string;
  geocode?: {
    lat: number;
    lng: number;
  };
}
