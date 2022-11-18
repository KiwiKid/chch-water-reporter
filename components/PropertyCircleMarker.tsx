import PropertyWithUsages from "./PropertyWithUsage";import { CircleMarker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import getColorClass from "./lib/getColor";
import React from "react";

type PropertyCircleMarkerProps = {
    p:PropertyWithUsages
}

export default function PropertyCircleMarker({p}:PropertyCircleMarkerProps) {
  
  const [circleSize, setCircleSize] = useState(5);

  const MIN_CIRCLE_SIZE = 800;
  const MAX_CIRCLE_SIZE = 10000;
  const getCircleSize = (p:PropertyWithUsages) => {
    return Math.min(Math.max(p.averageUsage, MIN_CIRCLE_SIZE), MAX_CIRCLE_SIZE)*0.0003*mapEvents.getZoom()
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
      {p && <Popup>
        {p.averageUsage && <h3 data-rating-unit-id={p.property.RatingUnitID} data-property={p.property.FullPostalAddress}>
          ~{p.averageUsage.toFixed(0)} ltr per day
        </h3>}
        <table> 
          <thead>
            <tr style={{fontStyle: 'bold'}}>
              <th>From</th>
              <th>For (days)</th>
              <th>Used per day</th>
            </tr>
          </thead>
          <tbody>
            {p.usages.map((u) => {
              const usageColor = useMemo(() => getColorClass(u.avg_per_day_ltr_num), [u.avg_per_day_ltr_num])
            return(
              <tr key={u.id} className={usageColor.colorClass}>
                <td>{u.date_for}</td>
                <td style={{textAlign: 'right'}}>{u.days_for}</td>
                <td style={{textAlign: 'right'}}>{u.avg_per_day_ltr}</td>               
              </tr>
              )
            })}
          </tbody>
        </table>
      </Popup>}
  </CircleMarker>)
}