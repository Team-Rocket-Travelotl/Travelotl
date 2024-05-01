import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const Map = ({ addresses }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter =
    addresses.length > 0 ? addresses[0] : { lat: 0, lng: 0 };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB6WDY2WgBETZLO1H0iAY9xb9s7c1aM9Qk">
      {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}> */}
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        {addresses.map((address, index) => {
          <Marker key={index} position={address}></Marker>;
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
