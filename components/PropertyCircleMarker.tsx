import PropertyWithUsages from "./PropertyWithUsage";import { CircleMarker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import getColorClass from "./lib/getColor";
import React from "react";

type PropertyCircleMarkerProps = {
    p:PropertyWithUsages
}

export default function PropertyCircleMarker({p}:PropertyCircleMarkerProps) {
  
  const [circleSize, setCircleSize] = useState(5);
  const MIN_CIRCLE_SIZE = 1000;
  const MAX_CIRCLE_SIZE = 10000;
  const getCircleSize = (p:PropertyWithUsages) => {
    let scaleFactor = 0.000
    let zoom = mapEvents.getZoom()
    if(zoom === 18){
      scaleFactor = 0.0008
    }else if(zoom >= 16){
      scaleFactor = 0.0007
    }else if(zoom >= 14){
      scaleFactor = 0.0005
    }else if(zoom >= 10){
      scaleFactor = 0.0004
    }else if(zoom >= 8){ 
      scaleFactor = 0.0005
    }else if(zoom >= 6){
      scaleFactor = 0.0007
    }else{
      scaleFactor = 0.0001
    }
    return Math.min(Math.max(p.averageUsage, MIN_CIRCLE_SIZE), MAX_CIRCLE_SIZE)*(scaleFactor*zoom)
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

  let zoom = mapEvents.getZoom()
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
              <th>For</th>
              <th>lts per day</th>
            </tr>
          </thead>
          <tbody>
            {p.usages.sort((a,b) => {
              const dateA = new Date(a.date_for)
              const dateB = new Date(b.date_for)
              if(dateA === dateB) return 0 
              return dateA > dateB ? 1 : -1;
            }).map((u) => {
              const usageColor = useMemo(() => getColorClass(u.avg_per_day_ltr_num), [u.avg_per_day_ltr_num])
            return(
              <tr key={u.id} className={usageColor.colorClass} style={{padding: '10px'}}>
                <td>{u.date_for}</td>
                <td style={{textAlign: 'right'}}>{u.days_for} days</td>
                <td style={{textAlign: 'right'}}>{u.avg_per_day_ltr}</td>               
              </tr>
              )
            })}
          </tbody>
          
        </table>
        {process.env.REACT_APP_DEBUG === 'true' && <pre>
          {JSON.stringify(p.usages, null ,4)}
          </pre>}
      </Popup>}
  </CircleMarker>)
}