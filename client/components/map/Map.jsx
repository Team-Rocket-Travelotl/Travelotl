import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { APIProvider } from "@vis.gl/react-google-maps";

const Map = ({ addresses }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };
  const defaultCenter = {
    lat: 53.54992,
    lng: 10.00678,
  };
  // const defaultCenter =
  //   addresses.length > 0 ? addresses[0] : { lat: 0, lng: 0 };

  return (
    <APIProvider googleMapsApiKey="AIzaSyB6WDY2WgBETZLO1H0iAY9xb9s7c1aM9Qk">
      {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}> */}
      <GoogleMap mapContainerStyle={mapStyles} zoom={3} center={defaultCenter}>
        {/* {addresses.map((address, index) => {
          <Marker key={index} position={address}></Marker>;
        })} */}
        {/* <Marker position={addresses}></Marker> */}
      </GoogleMap>
    </APIProvider>
  );
};

export default Map;
