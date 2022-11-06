import PropertyWithUsages from "./PropertyWithUsage";import { CircleMarker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import getColorClass from "./lib/getColor";
import React from "react";

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

  return (
    <CircleMarker pathOptions={{color: propertyColor.colorCode }} className={propertyColor.colorClass} radius={circleSize} key={p.property.id} center={p.property.point}>
      <Popup minWidth={500}>
        <h1>
          ~{p.averageUsage.toFixed(0)} litres per day
        </h1>
        <table> 
          <thead>
            <tr style={{fontStyle: 'bold'}}>
              <th>date_for</th>
              <th>avg_per_day_ltr</th>
              <th>level</th>
              <th>days_for</th>
              <th>colorClass</th>
              <th>avg_per_day_ltr_num</th> 
            </tr>
          </thead>
          <tbody>
            {p.usages.map((u) => {
              const usageColor = useMemo(() => getColorClass(u.avg_per_day_ltr_num), [u.avg_per_day_ltr_num])
            return(
              <tr key={u.id} className={usageColor.colorClass}>
                <td>{u.date_for}</td>
                <td>{u.avg_per_day_ltr}</td>
                <td>{u.level}</td>
                <td>{u.days_for}</td>
                <td>{usageColor.colorClass}</td>
                <td>{u.avg_per_day_ltr_num}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </Popup>
  </CircleMarker>)
}