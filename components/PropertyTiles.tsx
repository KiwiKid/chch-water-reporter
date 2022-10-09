import { CircleMarker, Popup } from "react-leaflet";
import getColor from "./lib/getColor";
import { useProperties } from "./lib/useProperties";
import PropertyWithUsages from "./PropertyWithUsage";
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
      const propertyColor = getColor(p.averageUsage)
      return (p.property.point && <>{JSON.stringify(p.property.point)}
        <>[  {p.averageUsage}]</>
        <style>{`
          .low-level{
            backgroundColor: green
          }
          .med-level{
            backgroundColor: blue
            color: white;
          }
          .high-level{
            backgroundColor: red;
            color: white;
          }
          .vhigh-level{
            backgroundColor: black
            color: white;
          }
          `}
        </style>
        {p.usages.length > 0 && <CircleMarker pathOptions={{color: propertyColor.colorCode }} className={propertyColor.color} radius={5} key={p.property.id} center={p.property.point}>
            <Popup>
              <div>
                Total Property Average: {p.averageUsage}
              </div>
              <table> {p.usages.map((u) => {
                      
                  const usageColor = getColor(p.averageUsage)

                return(
                  <tr key={u.id} className={usageColor.color} style={{backgroundColor: usageColor.colorCode}}>
                    <td>{u.date_for}</td>
                    <td>{u.avg_per_day_ltr}</td>
                    <td>{u.level}</td>
                    <td>{u.days_for}</td>
                    <td>{usageColor.color}</td>
                  </tr>
                  )
                })}
              </table>
            </Popup>
        </CircleMarker>
       }

      </>)
    } )}

  </>
   

}
