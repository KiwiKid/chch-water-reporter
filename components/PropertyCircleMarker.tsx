import PropertyWithUsages, { CircleSizes } from "./PropertyWithUsage";import { CircleMarker, Marker, Popup, Tooltip, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import React from "react";
import { byDateFor } from "./Usage";
import { CartesianGrid,  Label, Line, LineChart, YAxis } from "recharts";

type PropertyCircleMarkerProps = {
    p:PropertyWithUsages
    circleSize:number
}

export default function PropertyCircleMarker({p, circleSize}:PropertyCircleMarkerProps) {
  
  const usageData = p.usages.length > 1 ? p.usages.map((u) => {
    return {
      "name": `${u.date_for}`,
      "level": u.avg_per_day_ltr_num
    }
  }) : []



  return (
    <CircleMarker key={p.property.id} pathOptions={{color: p.styleData.colorCode }} className={p.styleData.colorClass} radius={circleSize} center={p.property.point}> 
      {p && <Popup>
        {p.averageUsage && <h3 data-rating-unit-id={p.property.RatingUnitID}>
          <div>
            <div style={{textAlign: 'left'}}><span style={{textDecoration:'underline', fontSize: `1.8rem`}}>{p.averageUsage.toFixed(0)}</span> ltrs per day</div>
            <div style={{textAlign: 'left'}}><a target="_blank" rel="noreferrer" href={`/how-does-it-compare?avg=${p.averageUsage.toFixed(0)}`} style={{ textDecorationLine: 'underline'}}>how does it compare?</a>
            </div>
          </div>
          <div>
            {usageData.length > 0 && <LineChart width={200} height={80} data={usageData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis fontSize="0.8rem"><Label dx={-24} angle={270} position="outside" value="lts per day"/></YAxis>
              <Tooltip />
              <Line type="monotone" dataKey="level" stroke="#8884d8" />
            </LineChart>}
          </div>
        </h3>}
        <table width={310}> 
          <thead>
            <tr style={{fontStyle: 'bold', whiteSpace: 'nowrap'}}>
              <th>From</th>
              <th>For</th>
              <th style={{}}>Per day Average</th>
            </tr>
          </thead>
          <tbody style={{fontStyle: 'bold', whiteSpace: 'nowrap'}}>
            {p.usages.sort(byDateFor).map((u) => {
            return(
              <tr key={u.id} className={u.styleData?.colorClass} style={{ borderRadius: 10}}>
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