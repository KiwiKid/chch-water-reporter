import { LeafletEvent } from "leaflet";
import _ from "lodash";
import React from "react";
import { useMemo } from "react";
import { FeatureGroup, LayerGroup, LayersControl, useMap, useMapEvent } from "react-leaflet";
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
  const { status, groupedProperties, properties } = useProperties({exculdeZeroUsage: true});

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
          <LayersControl.Overlay checked key={pKey} name={`${pKey.substring(1, pKey.length)} [${((groupedProperties[pKey].length/properties.length)*100).toFixed(0)}% - ${groupedProperties[pKey].length}/${properties.length}]`}>
            <FeatureGroup>
              {groupedProperties[pKey]
                .filter((p) => p.property.point && p.usages.length > 0)
                .map((p) => (<PropertyCircleMarker key={p.property.id} p={p}/>))}
            </FeatureGroup>
          </LayersControl.Overlay>)
      })}
      </LayersControl>}
  </>
}

