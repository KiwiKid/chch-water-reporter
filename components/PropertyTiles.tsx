import { LeafletEvent } from "leaflet";
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

export default function PropertyTiles({}:PropertyTilesProps) {
  const { status, groupedProperties, properties } = useProperties({exculdeZeroUsage: true});
  const [onlyShowOver, setOnlyShowOver] = useState<number>(5)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [adaptiveZoom, setAdaptiveZoom] = useState<boolean>(true)
  const map = useMapEvents({
      zoomend: () => {
        console.log('loading')
        let zoom = map.getZoom();
        if(zoom < 8){
          setOnlyShowOver(5)
        }else if(zoom == 9){
          setOnlyShowOver(5)
        }else if(zoom == 10){
          setOnlyShowOver(5)
        }else if(zoom == 12){
          setOnlyShowOver(4)
        }else if(zoom == 14){
          setOnlyShowOver(3)
        }else if(zoom > 14){
          setOnlyShowOver(0)
        }
        console.log('loaded')
      },
      moveend: () => {

      }
  }); 

  return <>
    <style>
      {`
        .being-shown-indicator{
          z-index: 1001;
          display: block;
          position: absolute;
          bottom: 10px;
          margin-right: 100px;
          overflow: no-wrap;
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
          <LayersControl.Overlay checked key={`${pKey}`} name={` ${pKey.substring(1, pKey.length)} [${((groupedProperties[pKey].length/properties.length)*100).toFixed(0)}% - ${groupedProperties[pKey].length}/${properties.length}]`}>
            <MapLayer properties={groupedProperties[pKey]} onlyShowOver={onlyShowOver} adaptiveZoom={adaptiveZoom} setIsLoading={setIsLoading}/>
          </LayersControl.Overlay>)
      })}
      </LayersControl>}
      <div className='being-shown-indicator'>
        <div>{isLoading ? 'LOADING ' : null}Showing: {adaptiveZoom ? `${(10-onlyShowOver)*10}%` : '100%'} </div>
        <div><button onClick={() => setAdaptiveZoom(!adaptiveZoom)}>{adaptiveZoom ? 'Show All': 'Show most'}</button><UseMyLocation /></div>
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

