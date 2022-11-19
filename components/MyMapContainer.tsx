import dynamic from "next/dynamic"
import { useEffect, useState } from "react";
import About from "./About";
//import { LatLng } from 'leaflet'
// position={new LatLng(123,13)}
type MyMapContainerProps = {
  // children:JSX.Element
}

const LeafletMap = dynamic(import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div>Loading...</div>
  )
})

export default function MyMapContainer({}:MyMapContainerProps) {



  const [isClient, setIsClient] = useState<boolean>(false)

    useEffect(() => {
        setIsClient(typeof window !== 'undefined')
    })

  return <>
  <style>{`
        .leaflet-popup-content {
          font-size: 1.5em;
        }
          .low-level {
            background-color: #EBF4FA
          } 
          .med-level {
            background-color: #B7CEEC;
          }
          .high-level {
            background-color: #659EC7;
            color: white;
          }
          .vhigh-level {
            background-color: #0909FF;
            color: white;
          }
          `}
        </style>
  {isClient && <><LeafletMap />
  {/*<About/>*/}
  </>}</>

}
