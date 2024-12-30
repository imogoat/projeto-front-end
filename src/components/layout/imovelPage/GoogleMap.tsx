"use client";

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type MapProps = {
  lat: number;
  lng: number;
};

const Map: React.FC<MapProps> = ({ lat, lng }) => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = { lat, lng };

  return (
    <div className="w-full h-[400px] rounded-lg shadow-lg">
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
