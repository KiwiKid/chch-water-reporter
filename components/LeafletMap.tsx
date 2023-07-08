import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropertyTiles from './PropertyTiles';
import useWindowSize from './lib/useWindowSize';
import { useRouter } from 'next/router';
import { defaultPosition } from './defaultPosition'
import { MyHeatmapLayer } from './HeatmapLayer'
import { useProperties } from './lib/useProperties';

type LeafletMapProps = {

}



export default  function LeafletMap({}:LeafletMapProps) {
  console.log('\n\nLeafletMap\n\n')
 const router = useRouter()

 const pageQuery = router.query;
 const {width, height} = useWindowSize()

 const startingZoom = typeof pageQuery.zoom === 'string' && parseInt(pageQuery.zoom) ? parseInt(pageQuery.zoom) : 14

 const startingLocation:[number, number] = 
  typeof pageQuery.lat === 'string' && parseFloat(pageQuery.lat) && 
  typeof pageQuery.lng === 'string' && parseFloat(pageQuery.lng) 
    ? [parseFloat(pageQuery.lat), parseFloat(pageQuery.lng)] 
    : defaultPosition.center

  
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
    {width && height && <div style={{ "height": `${height || 800}px`, "width": `${width || 400}px`}}>
        <MapContainer 
          minZoom={13}
          preferCanvas={true}
          center={startingLocation}
          zoom={startingZoom}>
                      <MyHeatmapLayer/>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/*<PropertyTiles />*/}
        </MapContainer>
    </div>}
  </>
}