import PropertyWithUsages from "./PropertyWithUsage";import { CircleMarker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import getColorClass from "./lib/getColor";

type PropertyCircleMarkerProps = {
    p:PropertyWithUsages
}

export default function PropertyCircleMarker({p}:PropertyCircleMarkerProps) {
  
  const [circleSize, setCircleSize] = useState(5);

  const getCircleSize = (p:PropertyWithUsages) => {
    return p.averageUsage*0.0005*mapEvents.getZoom()
  }

  const mapEvents = useMapEvents({
      zoomend: () => {
        setCircleSize(getCircleSize(p))
      },
  });

  useEffect(() => {
    setCircleSize(getCircleSize(p))
  }, [p.averageUsage])

  const propertyColor =  useMemo(() => getColorClass(p.averageUsage), [p.averageUsage])

  return (<CircleMarker pathOptions={{color: propertyColor.colorCode }} className={propertyColor.colorClass} radius={circleSize} key={p.property.id} center={p.property.point}>
              <Popup>
                <div className={propertyColor.colorClass}>
                  Total Property Average: {p.averageUsage.toFixed(2)}
                </div>
                <table> {p.usages.map((u) => {
                        
                    const usageColor = useMemo(() => getColorClass(u.avg_per_day_ltr_num), [u.avg_per_day_ltr_num])

                  return(
                    <tr key={u.id} className={usageColor.colorClass} style={{backgroundColor: usageColor.colorCode}}>
                      <td>{u.date_for}</td>
                      <td>{u.avg_per_day_ltr}</td>
                      <td>{u.level}</td>
                      <td>{u.days_for}</td>
                      <td>{usageColor.colorClass}</td>
                      <td>{u.avg_per_day_ltr_num}</td>
                    </tr>
                    )
                  })}
                </table>
              </Popup>
          </CircleMarker>)
}