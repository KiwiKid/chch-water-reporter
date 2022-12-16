import _, { Dictionary } from "lodash";
import React, { useEffect, useState } from "react";
import { useProperties } from "./lib/useProperties";
import PropertyWithUsages from "./PropertyWithUsage";
import { CartesianGrid, Label, YAxis, XAxis, ReferenceLine, Line, Bar, ResponsiveContainer, BarChart } from 'recharts'
import useWindowSize from "./lib/useWindowSize";

interface ByAmountUsedProps {
  markerLine?:number
}

export default function ByAmountUsed({markerLine}:ByAmountUsedProps) {
  const { status, properties } = useProperties({ exculdeZeroUsage: true, nonMap: true});
    const [propertyGroups, setPropertyGroups] = useState<Dictionary<PropertyWithUsages[]>>()
    const [data, setData] = useState<unknown[]>()

    const windowSize = useWindowSize()

  useEffect(() => {
    let newPropertyGroups = _.groupBy(properties, (p) => {
        // 100 litre groups
        return (p.averageUsage / 100).toFixed(0).toString()// ? 'charge' : 'no_charge'
      })
      setPropertyGroups(newPropertyGroups)

      const res = Object.keys(newPropertyGroups).map((pgk) => {
        return {
          name: `${pgk}`,
          lengthOfEntries: newPropertyGroups[pgk],
          totalAvgLtrs: newPropertyGroups[pgk].reduce((prev, curr) => {
            let total = prev += curr.averageUsage;
            return total;
          }, 0)
        }
      })

      let filteredRes = res.filter((res) => res.name !== '0' && parseInt(res.name) < 80)

      setData(filteredRes)

  }, [properties])
  
  //const data_eg = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page A', uv: 400, pv: 2400, amt: 2400}]

  return (<>
  <div style={{textAlign: 'center', padding: '10px'}}>
    <h1>{markerLine} ltrs used per day</h1>
    <h1>total litres used </h1><h2>total litres used (y) vs avg litres - in X000s Ltrs (x)</h2></div>
    {status === 'fetching' &&     <div style={{textAlign: 'center', width: '100%', color: 'white'}}>{status}<h1>Loading (this should take approximately 10 seconds)...</h1></div>}
    {status === 'idle' &&     <div style={{textAlign: 'center', width: '100%', color: 'white'}}>{status}<h1>Loading (this should take approximately 10 seconds)...</h1></div>}
    {status === 'fetched' && propertyGroups && <div style={{textAlign: 'center', width: '100%', backgroundColor: 'white', color: 'black'}}>
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
          <XAxis dataKey="name" >
            <Label dy={13} position="outside" value="Avg Litres used per day (in hundreds)" />
          </XAxis>
          <Bar dataKey="totalAvgLtrs" stackId="a" fill="#8884d8" />
          <ReferenceLine x={9} stroke="red" isFront={true} label={{ position: 'top', value: 'Charges apply (>900 Ltrs)', fill: 'red', fontSize: 14 }}  strokeDasharray="3 3" />
          {markerLine && <ReferenceLine strokeWidth={5} label={{ position: 'top', value: `${markerLine} ltrs per day`}} x={Math.min(+(markerLine/100).toFixed(0), 75)} stroke="black" orientation="left" isFront={true} strokeDasharray="6 6" />}
          <YAxis padding={{top: 10}}>
            <Label dx={-40} angle={270} position="outside" value="Total Ltrs used"/>
          </YAxis>
      </BarChart>
    </div>}
  </>)
   

}
