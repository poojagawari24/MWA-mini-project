import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
const Map = ({geometry,location}) => {

    // console.log(geometry);
    // console.log(location);
    useEffect(() => {
        const map = L.map('map-container').setView([geometry.coordinates[1],geometry.coordinates[0]], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Add a marker for the listing's location
const marker = L.marker([geometry.coordinates[1],geometry.coordinates[0]]).addTo(map);

// Bind a popup to the marker and open it
marker.bindPopup(location).openPopup();
    
        return () => {
          map.remove();
        };
      }, []);
    
  return (
    <div className='map-container h-[100%] w-100% -mb-5' id="map-container" >
    </div>
  )
}

export default Map