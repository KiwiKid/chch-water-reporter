import { Popup, CircleMarker } from 'react-leaflet'
import PropertyWithUsages from "./PropertyWithUsage";
import { PropertyStatus, useProperties } from "./useProperties";
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
      return (p.property.point && <>{JSON.stringify(p.property.point)}
        <>[{p.color}  {p.color_percent}]</>
        {p.usages.length > 0 && <CircleMarker color={p.color} radius={5} key={p.property.id} center={p.property.point}>
            <Popup>
              <div>
                {p.averageUsage}
              </div>
              <table> {p.usages.map((u) => (
              <tr key={u.id} style={{backgroundColor: u.color}}>
                <td>{u.date_for}</td>
                <td>{u.avg_per_day_ltr}</td>
                <td>{u.level}</td>
                <td>{u.comments}</td>
                <td>{u.days_for}</td>
                <td>{u.color_percent}</td>
                <td>{u.color}</td>
              </tr>
              ))}
              
              </table>
            </Popup>
        </CircleMarker>
       }

      </>)
    } )}

  </>
   

}
