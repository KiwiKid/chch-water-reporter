import PropertyWithUsages from "./PropertyWithUsage";import { CircleMarker, Popup } from "react-leaflet";
import { useMemo } from "react";
import getColorClass from "./lib/getColor";

type PropertyCircleMarkerProps = {
    p:PropertyWithUsages
}

export default function PropertyCircleMarker({p}:PropertyCircleMarkerProps) {

  const propertyColor =  useMemo(() => getColorClass(p.averageUsage), [p.averageUsage])

  return (<CircleMarker pathOptions={{color: propertyColor.colorCode }} className={propertyColor.colorClass} radius={5} key={p.property.id} center={p.property.point}>
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