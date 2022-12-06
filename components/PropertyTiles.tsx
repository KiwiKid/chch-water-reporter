import { LatLng, LeafletEvent } from "leaflet";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { FeatureGroup, LayerGroup, LayersControl, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import getColor from "./lib/getColor";
import { useProperties } from "./lib/useProperties";
import PropertyCircleMarker from "./PropertyCircleMarker";
import { CircleSizes } from "./PropertyWithUsage";
import { MapLayer } from './MapLayer'
import { UseMyLocation } from './UseMyLocation'

//import { LatLng } from 'leaflet'
// position={new LatLng(123,13)}
type PropertyTilesProps = {   
 // properties:PropertyWithUsages[]
  //status:PropertyStatus
}

const CHRISTCHURCH_CENTER = {
  latlng: new LatLng(-43.55, -187.370),
  zoom: 12
}

export default function PropertyTiles({}:PropertyTilesProps) {
  const { status, groupedProperties, properties } = useProperties({exculdeZeroUsage: true});
  const [onlyShowOver, setOnlyShowOver] = useState<number>(5)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [adaptiveZoom, setAdaptiveZoom] = useState<boolean>(true)
  const map = useMapEvents({
      zoomend: () => {
        let zoom = map.getZoom();
        if(zoom < 8){
          setOnlyShowOver(7)
        }else if(zoom == 9){
          setOnlyShowOver(6)
        }else if(zoom == 10){
          setOnlyShowOver(5)
        }else if(zoom == 12){
          setOnlyShowOver(5)
        }else if(zoom == 14){
          setOnlyShowOver(3)
        }else if(zoom > 14){
          setOnlyShowOver(0)
        }
      }
  }); 

  return <>
    <style>
      {`
        .being-shown-indicator{
          z-index: 1001;
          display: block;
          position: absolute;
          bottom: 50px;
          margin-right: 100px;
          margin: 0rem; 
          background-color: #FF5F1F;
          color: black;
          font-weight: bold;
          padding: 5px;
        }
      `}
    </style>

    {status === 'fetching' && <div style={{textAlign: 'center', width: '100%', color: 'black'}}><h1>Loading (this should take approximately 10 seconds)...</h1></div>}
    {status === 'idle' && <div style={{textAlign: 'center', width: '100%', color: 'black'}}><h1>Loading (this should take approximately 10 seconds)...</h1></div>}
    {status === 'fetched' && !!groupedProperties && <LayersControl position="topright">
      {Object.keys(groupedProperties).sort((a:string, b:string) => {
        const startingCharA = parseInt(a.substring(0, 1))
        const startingCharB = parseInt(b.substring(0, 1))
        if(startingCharA == startingCharB) return 0
        return startingCharA > startingCharB ? 1 : -1
      }).map((pKey) => {
         return (
          <LayersControl.Overlay checked key={`${pKey}`} name={`${pKey.substring(1, pKey.length)} (${groupedProperties[pKey].length})`}>
            <MapLayer properties={groupedProperties[pKey]} onlyShowOver={onlyShowOver} adaptiveZoom={adaptiveZoom} setIsLoading={setIsLoading}/>
          </LayersControl.Overlay>)
      })}
      </LayersControl>}
      <div className='being-shown-indicator'>
        <div>{isLoading ? 'LOADING ' : null}</div>
        <div><button onClick={() => setAdaptiveZoom(!adaptiveZoom)}>{adaptiveZoom ? 'Show All' : 'Show most'}{adaptiveZoom && onlyShowOver !== 0 ? <><br/>({adaptiveZoom ? `${(10-onlyShowOver)*10}%` : '100%'} showing)</> : null}</button></div>
        {/*<div>{groupedProperties ? Object.keys(groupedProperties).reduce((prev, key) => prev+= groupedProperties[key].length, 0) : 0 } loaded</div>*/}
        <div><button onClick={() => map.flyTo(CHRISTCHURCH_CENTER.latlng, CHRISTCHURCH_CENTER.zoom)}>Reset Map</button></div> 
        <div><UseMyLocation /></div>
      </div>
      

{/*}
      <div id="use-my-location"  style={{ backgroundColor: 'blue', zIndex: 99999, top: 0, right: 0}}>
      <label hidden={true} htmlFor="NearMeButton">Request GPS location:</label>
      <div
          id="NearMeButton"
          onClick={() => {
            map.locate({watch: false})
            // Provides warning on Share URL
          }}
          
          //linkClassName="w-full border-b-4 border-green-800 bg-green-500 w-3/4 h-12 px-6 text-green-100 transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-green-800"
         // widthClass="w-full"
        >Near Me</div>
    </div>*/}
  </>
}

