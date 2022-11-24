import PropertyWithUsages from "./PropertyWithUsage";import { CircleMarker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import getColorClass from "./lib/getColor";
import React from "react";
import { byDateFor } from "./Usage";

type PropertyCircleMarkerProps = {
    p:PropertyWithUsages
}

export default function PropertyCircleMarker({p}:PropertyCircleMarkerProps) {
  
  const [circleSize, setCircleSize] = useState(0);

  const [zoomTracker, setZoomTracker] = useState(null)

  const MIN_CIRCLE_SIZE = 0;
  const MAX_CIRCLE_SIZE = 5000;
  const getCircleSize = (p:PropertyWithUsages) => {
  let scaleFactor = 0.000
  let zoom = mapEvents.getZoom()
    if(zoom === 18){
      scaleFactor = 0.0014
    }else if(zoom >= 16){
      scaleFactor = 0.0012
    }else if(zoom >= 14){
      scaleFactor = 0.0010
    }else if(zoom >= 10){
      scaleFactor = 0.0008
    }else if(zoom >= 8){ 
      scaleFactor = 0.0005
    }else if(zoom >= 6){
      scaleFactor = 0.0007
    }else{
      scaleFactor = 0.0001
    }
    return Math.min(Math.max((p.averageUsage/2), MIN_CIRCLE_SIZE), MAX_CIRCLE_SIZE)*(scaleFactor*zoom)
  }

  useEffect(() => {
    // hacky check to prevent lots of recalc when the zoom changes
    if(!zoomTracker || zoom != zoomTracker){
      setZoomTracker(zoomTracker)
      setCircleSize(getCircleSize(p))
    }
  }, [])
  
  const mapEvents = useMapEvents({
      zoomend: () => {
        if(!zoomTracker || zoom != zoomTracker){
          setCircleSize(getCircleSize(p))
        }
      },
  });

  let zoom = mapEvents.getZoom()
  return (
    <CircleMarker pathOptions={{color: p.styleData.colorCode }} className={p.styleData.colorClass} radius={circleSize} key={p.property.id} center={p.property.point}> 
      {p && <Popup>
        {p.averageUsage && <h3 data-rating-unit-id={p.property.RatingUnitID} data-property={p.property.FullPostalAddress}>
          <div style={{textAlign: 'center'}}>~{p.averageUsage.toFixed(0)} Ltr per day</div>
          <div style={{fontSize: '0.8rem', textAlign: 'center'}}><a target="_blank" href={`/how-does-it-compare?avg=${p.averageUsage.toFixed(0)}`} style={{ textDecorationLine: 'underline'}}>how does it compare?</a></div>
        </h3>}
        <table> 
          <thead>
            <tr style={{fontStyle: 'bold'}}>
              <th>From</th>
              <th>For</th>
              <th>Per day</th>
            </tr>
          </thead>
          <tbody>
            {p.usages.sort(byDateFor).map((u) => {
            return(
              <tr key={u.id} className={u.styleData?.colorClass} style={{padding: '10px'}}>
                <td>{u.date_for}</td>
                <td style={{textAlign: 'right'}}>{u.days_for} days</td>
                <td style={{textAlign: 'right'}}>{u.avg_per_day_ltr}tr</td>               
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