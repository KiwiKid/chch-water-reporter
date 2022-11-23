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
  <div style={{textAlign: 'center'}}><h1>total litres used </h1><h2>(y)total litres uses vs (x) avg litres( in X000s Ltrs)</h2></div>
    {status === 'fetching' &&     <div style={{textAlign: 'center', width: '100%', color: 'white'}}>{status}<h1>Loading (this should take ~10 seconds)...</h1></div>}
    {status === 'idle' &&     <div style={{textAlign: 'center', width: '100%', color: 'white'}}>{status}<h1>Loading (this should take ~10 seconds)...</h1></div>}
    {status === 'fetched' && propertyGroups && <div style={{textAlign: 'center', width: '100%', backgroundColor: 'white', color: 'black'}}>
        <BarChart
          width={!!windowSize && windowSize.width ? windowSize.width*0.95 : 0}
          height={!!windowSize && windowSize.height ? windowSize.height*0.95 : 0}
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
            <Label position="outside" value="Avg Litres used (in hundreds)" />
          </XAxis>
          
          <Bar dataKey="totalAvgLtrs" stackId="a" fill="#8884d8" />
          <ReferenceLine x={9} stroke="red" isFront={true} label={{ position: 'top', value: 'Charges apply (>900 Ltrs)', fill: 'red', fontSize: 14 }}  strokeDasharray="3 3" />
          {markerLine && <ReferenceLine strokeWidth={5} label={{ position: 'top', value: 'You are HERE'}} x={Math.min(+(markerLine/100).toFixed(0), 75)} stroke="black" orientation="left" isFront={true} strokeDasharray="6 6" />}
          <YAxis padding={{top: 10}}>
            <Label angle={270} position="outside" value="total Ltrs used by each group"/>
          </YAxis>
      </BarChart>
        {/*<pre>{Object.keys(propertyGroups).filter((pg) => pg !== '0').map(pgk => `group: ${pgk} size: ${propertyGroups[pgk].length} ${JSON.stringify(propertyGroups[pgk], null, 4) }}}`)}</pre>*/}
        {/*<pre>
          
          {JSON.stringify(propertyGroups, null, 4)}
    {Object.keys(propertyGroups).map((pgk) => {
        return (<><div key={`${pgk}`}>{propertyGroups[pgk].map((p) => <div key={`${pgk} ${p.averageUsage} ${p.property.id}`}>{pgk} {p.averageUsage}</div>)}

            </div>
</>            )

        })}
      </pre>*/}


        
        
        </div>}
        {status}{properties.length}|{propertyGroups ? Object.keys(propertyGroups) : 'NA Groups'}
  </>)
   

}
