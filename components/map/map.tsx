import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
  useLoadScript,
} from "@react-google-maps/api";
import { connect } from "react-redux";
import Styles from "./styles.module.scss";
import { AppProps, GeocodeProps } from "../../interfaces/main";

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 41.881832, lng: -87.623177 },
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 },
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 34.052235, lng: -118.243683 },
  },
  {
    id: 4,
    name: "New York, New York",
    position: { lat: 40.712776, lng: -74.005974 },
  },
];

interface HoMapProps {
  geocode: GeocodeProps;
}

const HoMap = ({ geocode }: HoMapProps) => {
  const [activeMarker, setActiveMarker] = useState(null);

  const { lat, lng } = geocode ?? {};

  const currentPosition = { lat, lng };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  const handleOnLoad = (map: {
    fitBounds: (arg0: google.maps.LatLngBounds) => void;
  }) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY as string, // Add your API key
  });

  if (!isLoaded) {
    return <div>Loading</div>;
  }

  return (
    <div className={Styles.container}>
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={11}
        center={currentPosition.lat ? currentPosition : defaultCenter}
      >
        {lat && (
          <Marker
            position={currentPosition.lat ? currentPosition : defaultCenter}
          />
        )}
      </GoogleMap>
    </div>
  );
};

interface StateProps {
  app: AppProps;
}

export default connect((state: StateProps) => ({
  geocode: state.app.selectedGeoCode as GeocodeProps,
}))(HoMap);
