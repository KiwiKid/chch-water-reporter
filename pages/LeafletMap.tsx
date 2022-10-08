
import { Marker, useMap } from 'react-leaflet'
import { MapContainer, TileLayer, CircleMarker, GeoJSONProps } from 'react-leaflet'
import L, { PointExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { useProperties } from './useProperties';
import PropertyTiles from './PropertyTiles';
import { useEffect, useRef, useState } from 'react';


type LeafletMapProps = {
  //children:JSX.Element
  //position:LatLngExpression
}


export default function LeafletMap({}:LeafletMapProps) {
  

 // const [map, setMap] = useState(null)
/*
  useEffect(() => {
    if(window !== undefined){
      const map = useMap()
      setMap(mapInstance)
    }
  }, [map])
*/
  const startPostiton = new L.LatLng(-43.530975, 172.637780)
  const startZoom = 13

  return <>
    <style>{`
      .leaflet-container{
        height: 95vh;
        width: 100wh;
    `}
    </style>
    <div style={{"height":"1000px", "width":"500px"}}>
      <MapContainer center={startPostiton} zoom={startZoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <PropertyTiles/>
      </MapContainer>
    </div>
  </>

}
