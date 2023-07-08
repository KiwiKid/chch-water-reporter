import _ from "lodash";
import React, { useState } from "react";
import { LayersControl, useMapEvents } from "react-leaflet";
import { useProperties } from "./lib/useProperties";
import { MapLayer } from './MapLayer'
import { Settings } from './Settings'
import { LoadingText } from "./LoadingText";
import { useMetaData } from './lib/useMetadata'
//import { LatLng } from 'leaflet'
// position={new LatLng(123,13)}
type PropertyTilesProps = {   
 // properties:PropertyWithUsages[]
  //status:PropertyStatus
}


export default function PropertyTiles({}:PropertyTilesProps) {

  // const [onlyShowOver, setOnlyShowOver] = useState<number>(5)

  const [isShowingFull, setIsShowingFull] = useState<boolean>(false)

  const [adaptiveZoom, setAdaptiveZoom] = useState<boolean>(true)

 // const [isLoading, setIsLoading] = useState<boolean>(true)

  const map = useMapEvents({
    movestart: () => {
   // setIsLoading(true)
  },
  layeradd: () => {
  
    /*setIsLoading(true)
    if(isLoadingTimeout) clearTimeout(isLoadingTimeout)

    console.log('tileload')
    setIsLoadingTimeout(setTimeout(function() {
      console.log('setIsLoading')
      setIsLoading(false)
    }, 300))*/

  }
})

const { groupedProperties, propertyCount, showingPropertyCount, status, isMapLoading, onlyShowOver } = useProperties({
  exculdeZeroUsage: false,
  mapBounds: map.getBounds(),
  mapZoom: map.getZoom(), 
  adaptiveZoom: false,
  nonMap: true
});

/*
  let setLoadingHappened = () => {
    console.log('setIsLoading(true)')
    
    clearTimeout(isLoadingTimeout);
    
    // API CALL
    setIsLoadingTimeout(setTimeout(function() {
      console.log('setIsLoading')
      setIsLoading(false)
    }, 300))
  }
*/


  return <>
    {status === 'fetching' && <div style={{textAlign: 'center', width: '100%', color: 'black'}}><LoadingText/></div>}
    {status === 'idle' && <div style={{textAlign: 'center', width: '100%', color: 'black'}}><LoadingText/></div>}
    {status === 'fetched' && !!groupedProperties && <LayersControl position="topright">
      {Object.keys(groupedProperties).sort((a:string, b:string) => {
        const startingCharA = parseInt(a.substring(0, 1))
        const startingCharB = parseInt(b.substring(0, 1))
        if(startingCharA == startingCharB) return 0
        return startingCharA > startingCharB ? 1 : -1
      }).map((pKey) => {
         return (
          <LayersControl.Overlay checked key={`${pKey}`} name={`${pKey.substring(1, pKey.length)} (${groupedProperties[pKey].length})`}>
            <MapLayer properties={groupedProperties[pKey]} adaptiveZoom={adaptiveZoom} />
          </LayersControl.Overlay>)
      })}
      </LayersControl>}{groupedProperties && Object.keys(groupedProperties)}
      
      <Settings 
        isLoading={isMapLoading}
        adaptiveZoom={adaptiveZoom}
        setAdaptiveZoom={setAdaptiveZoom}
        onlyShowOver={onlyShowOver}
        isShowingFull={isShowingFull}
        setIsShowingFull={setIsShowingFull}
        propertyCount={propertyCount}
        showingPropertyCount={showingPropertyCount}
        />

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

