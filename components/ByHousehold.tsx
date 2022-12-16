import _, { Dictionary } from "lodash";
import React, { useEffect, useState } from "react";
import { useProperties } from "./lib/useProperties";
import PropertyWithUsages from "./PropertyWithUsage";
import { CartesianGrid, Label, YAxis, XAxis, ReferenceLine, Line, Bar, ResponsiveContainer, BarChart } from 'recharts'
import useWindowSize from "./lib/useWindowSize";

interface ByHouseholdProps {
  markerLine?:number
}

export default function ByHousehold({markerLine}:ByHouseholdProps) {
  const { status, properties } = useProperties({ exculdeZeroUsage: true, nonMap: true});
    const [propertyGroups, setPropertyGroups] = useState<Dictionary<PropertyWithUsages[]>>()
    const [data, setData] = useState<unknown[]>()
    const windowSize = useWindowSize()

  useEffect(() => {
    let newPropertyGroups = _.groupBy(properties, (p) => {
        // 100 litre groups
        return (p.averageUsage / 100).toFixed(0).toString()
      })
      setPropertyGroups(newPropertyGroups)

      const res = Object.keys(newPropertyGroups).map((pgk) => {
        return {
          name: `${pgk}`,
          lengthOfEntries: newPropertyGroups[pgk].length
        }
      })

      let filteredRes = res.filter((res) => res.name !== '0' && parseInt(res.name) < 80)

      setData(filteredRes)

  }, [properties])
  
  //const data_eg = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page A', uv: 400, pv: 2400, amt: 2400}]

  return (<>
    <div style={{textAlign: 'center', padding: '10px '}}><h1># of households(y) vs avg hundreds of litres(x)</h1></div>
      {(status === 'fetching' || status === 'idle') && <div style={{textAlign: 'center', width: '100%', color: 'black', backgroundColor: 'white'}}><h1>Loading (this should take approximately 10 seconds)...</h1></div>}
      {status === 'fetched' && propertyGroups && <div style={{textAlign: 'center', width: '100%', backgroundColor: 'white', color: 'black'}}>
        <div>
          This shows the number of households that use a similar amount of water - broken into 100 ltr groups (0-100, 100-200 etc)
        </div>
        <BarChart
          width={!!windowSize && windowSize.width ? windowSize.width*0.95 : 0}
          height={!!windowSize && windowSize.height ? Math.min(windowSize.height*0.95, 400) : 0}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis >
            <Label dx={-30} angle={270} value="Addresses using this amount (in # of households)" position="outside"></Label>
          </YAxis>
          <XAxis  >
            <Label dy={10} style={{padding: '100px', margin: '100px'}} value={`Ltrs used per day (in 100s of ltrs)\n`} position="outside" />
          </XAxis>
          <Bar dataKey="lengthOfEntries" stackId="a" fill="#8884d8" />
          <ReferenceLine x={9}  stroke="red" isFront={true} label={{ position: 'top', value: 'Charges apply (>900 Ltrs)', fill: 'red', fontSize: 14 }}  strokeDasharray="3 3" />
          {markerLine && <ReferenceLine strokeWidth={5} label={{ position: 'top', value: `${markerLine} ltrs per day`}} x={Math.min(+(markerLine/100).toFixed(0), 75)} stroke="black" orientation="left" isFront={true} strokeDasharray="6 6" />}
          <div>
          (Properties with a water usage greater than 7500 ltrs per day are excluded for clarity)
          </div>
        </BarChart>
      </div>}
    </>)
   

}
