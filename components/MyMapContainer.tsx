import dynamic from "next/dynamic"
import React from "react";
import { useEffect, useState } from "react";
import { LoadingText } from './LoadingText'

type MyMapContainerProps = {
  // children:JSX.Element
}

const LeafletMap = dynamic(import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div style={{textAlign: 'center', width: '100%'}}><LoadingText/></div>
  )
})

export default function MyMapContainer({}:MyMapContainerProps) {
  const [isClient, setIsClient] = useState<boolean>(false)

    useEffect(() => {
        setIsClient(typeof window !== 'undefined')
    }, [])

  return <>
  <style>{`
        .leaflet-popup-content {
          font-size: 1.3em;
        }

          .low-level {
            background-color: #EBF4FA;
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
  {isClient && <LeafletMap />
  }</>

}
