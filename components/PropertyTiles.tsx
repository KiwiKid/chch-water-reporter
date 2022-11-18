import React from "react";
import { useMemo } from "react";
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
  const { status, properties } = useProperties();
  //const map = useMap();

 /* useEffect(() => {
    
      L.geoJSON<L.Point>().addTo(map)
      console.log(`added: ${JSON.stringify(p.property.geoJSON)}`)
      return (
        <>fetched</>
      )
    })
  }, [map, status, properties])


     
{status === 'fetched' && properties && properties.map((p) => {
      const geoJSON = p.property.geoJSON
      return ( <CircleMarker key={p.property.id} center={}/>) 

    })}
  */

   //  const latLng = 

  


  return <>
    {status === 'fetching' && <>loading</>}
    {status === 'idle' && <>waiting</>}
    {status === 'fetched' && properties.length && properties.map((p) => {
      
      return (p.property.point && p.usages.length > 0 && <>
        {
          <PropertyCircleMarker p={p}/>
       }

      </>)
    } )}

  </>
   

}
