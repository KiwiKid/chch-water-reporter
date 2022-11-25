import { LeafletEvent } from "leaflet";
import _ from "lodash";
import React, { useState } from "react";
import { useMemo } from "react";
import { FeatureGroup, LayerGroup, LayersControl, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import getColor from "./lib/getColor";
import { useProperties } from "./lib/useProperties";
import PropertyCircleMarker from "./PropertyCircleMarker";

//import { LatLng } from 'leaflet'
// position={new LatLng(123,13)}
type PropertyTilesProps = {   
 // properties:PropertyWithUsages[]
  //status:PropertyStatus
}

export default function PropertyTiles({}:PropertyTilesProps) {
  const { status, groupedProperties, properties,  } = useProperties({exculdeZeroUsage: true});
  const [onlyShowOverLtrs, setOnlyShowOverLtrs] = useState<number>(500)

  const map = useMapEvents({
      zoomend: () => { 
        let zoom = map.getZoom();
        let overLtrsDefault = 500

        if(zoom < 12){
          overLtrsDefault = 2000
        }
        if(zoom < 14){
          overLtrsDefault  = 2000
        }
        if(zoom === 14){
          overLtrsDefault  = 1500
        }
        if(zoom >= 14){
          overLtrsDefault = 0
        }

        setOnlyShowOverLtrs(overLtrsDefault)
        console.log(zoom)
        console.log(`onlyShowOverLtrs: ${onlyShowOverLtrs}`)
      },
  });

  

  return <>
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
          <LayersControl.Overlay checked key={`${pKey} ${onlyShowOverLtrs}`} name={` ${pKey.substring(1, pKey.length)} [${((groupedProperties[pKey].length/properties.length)*100).toFixed(0)}% - ${groupedProperties[pKey].length}/${properties.length}]`}>
            <FeatureGroup>
              {groupedProperties[pKey]
                .filter((p) => p.property.point && p.usages.length > 0)
                .filter((p) => p.averageUsage > onlyShowOverLtrs)
                .map((p) => (<PropertyCircleMarker key={p.property.id} p={p}/>))}
            </FeatureGroup>
          </LayersControl.Overlay>)
      })}
      </LayersControl>}
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

