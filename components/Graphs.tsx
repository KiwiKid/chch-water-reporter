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
  const { status, properties } = useProperties({ exculdeZeroUsage: true});
    const [propertyGroups, setPropertyGroups] = useState<Dictionary<PropertyWithUsages[]>>()
    const [data, setData] = useState<unknown[]>()
    const windowSize = useWindowSize()

  useEffect(() => {
    let newPropertyGroups = _.groupBy(properties, (p) => {
        // 200 litre groups
        return (p.averageUsage / 100).toFixed(0).toString()// ? 'charge' : 'no_charge'
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
    <div style={{textAlign: 'center', maxHeight: '600px'}}><h1># of households(y) vs avg hundreds of litres(x)</h1></div>
      {status === 'fetching' &&     <div style={{textAlign: 'center', width: '100%', color: 'white'}}><h1>Loading (this should take ~10 seconds)...</h1></div>}
      {status === 'idle' &&     <div style={{textAlign: 'center', width: '100%', color: 'white'}}><h1>Loading (this should take ~10 seconds)...</h1></div>}
      {status === 'fetched' && propertyGroups && <div style={{textAlign: 'center',  maxHeight: '600px', width: '100%', backgroundColor: 'white', color: 'black'}}>
        <BarChart
          width={!!windowSize && windowSize.width ? windowSize.width*0.95 : 0}
          height={!!windowSize && windowSize.height ? Math.min(windowSize.height*0.95, 600) : 0}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis>
            <Label angle={270} value="# address using this amount (in households)" position="outside"></Label>
          </YAxis>
          <XAxis dataKey="name" >
            <Label value={`Avg Litres used (in hundreds of ltrs)\n`} position="outside" />
          </XAxis>
          <Bar dataKey="lengthOfEntries" stackId="a" fill="#8884d8" />
          <ReferenceLine x={9}  stroke="red" isFront={true} label={{ position: 'top', value: 'Charges apply (>900 Ltrs)', fill: 'red', fontSize: 14 }}  strokeDasharray="3 3" />
          {markerLine && <ReferenceLine strokeWidth={5} label={{ position: 'top', value: 'You are HERE'}} x={Math.min(+(markerLine/100).toFixed(0), 75)} stroke="black" orientation="left" isFront={true} strokeDasharray="6 6" />}
        </BarChart>
      </div>}
    </>)
   

}
