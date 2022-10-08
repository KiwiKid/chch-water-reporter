import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react";
import PropertyWithUsages from "./PropertyWithUsage";
import { useProperties } from "./useProperties";
//import { LatLng } from 'leaflet'
// position={new LatLng(123,13)}
type MyMapContainerProps = {
  // children:JSX.Element
}

export default function MyMapContainer({}:MyMapContainerProps) {


  const DynamicMap = useMemo(() => dynamic(
    () => import("./LeafletMap")
    , {
       loading: Object.assign(() => <div style={{width: '100%'}}><div style={{width:'80%', margin: 'auto'}}><p>Loading Latest Covid-19 Locations of Interest published by the New Zealand Ministry of Health...</p></div></div>, {displayName: 'Loading'}),
       ssr: false
    })
  ,[]);


  return <><DynamicMap /></>

}
