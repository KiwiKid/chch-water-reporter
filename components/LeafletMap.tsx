import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropertyTiles from '../components/PropertyTiles';
import useWindowSize from './lib/useWindowSize';


type LeafletMapProps = {

}

export default  function LeafletMap({}:LeafletMapProps) {
 const startZoom = 13
 const {width, height} = useWindowSize()
return <>
  <style>{`
    .leaflet-container {
      height: 99vh;
      width: 101wh;
    }

    .leaflet-control-layers {
      font-size: 1.6rem;
    }
  `}</style><></>
    {width && height && <div style={{ "height": `${height}px`, "width": `${width}px`}}>
        <MapContainer minZoom={13} preferCanvas={true} center={[-43.530975, 172.637780]} zoom={startZoom} ref={(ref) => { }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <PropertyTiles />

        </MapContainer>
    </div>}
  </>
}