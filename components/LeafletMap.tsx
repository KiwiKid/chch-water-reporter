import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useProperties } from './lib/useProperties';
import PropertyTiles from '../components/PropertyTiles'
import { useEffect, useRef, useState } from 'react';



type LeafletMapProps = {
  //children:JSX.Element
  //position:LatLngExpression
}


export default function LeafletMap({}:LeafletMapProps) {
  /*
  useEffect(() => {
    
      const map = useMap()
      setMap(mapInstance)
    }
  }, [map])
*/
  const startZoom = 13

  return <>
    <style>{`
      .leaflet-container{
        height: 95vh;
        width: 100wh;
    `}
      </style><div style={{ "height": "1000px", "width": "500px" }}>
          <MapContainer center={[-43.530975, 172.637780]} zoom={startZoom}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <PropertyTiles />
          </MapContainer>
        </div>
  </>

}
