import localforage from "localforage";
import { useEffect, useState } from "react";
import PropertyWithUsages from "../PropertyWithUsage";

import testData from '../../pages/data/property_data.json'
import _, { Dictionary } from "lodash";

export type PropertyStatus = 'idle'|'fetching'|'fetched'


export type CacheOptions = 'cache'|'file'|'no-cache'

interface UsePropertiesProps {
    exculdeZeroUsage?:boolean
}

const useProperties = ({exculdeZeroUsage}:UsePropertiesProps) => {
    const [status, setStatus] = useState<PropertyStatus>('idle');
    const [properties, setProperties] = useState<PropertyWithUsages[]>([]);
    const [groupedProperties, setGroupedProperties] = useState<Dictionary<PropertyWithUsages[]>>()
    const [groupingAmount, setGroupingAmount] = useState<number>(0)


    localforage.config({
     //   driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
        name        : 'chch-water-reporter',
        version     : 1.0,
        size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
        storeName   : 'properties', // Should be alphanumeric, with underscores.
      });
    

    useEffect(() => {
        const cacheSetting:CacheOptions = process.env.REACT_APP_NO_CACHE as CacheOptions || 'file'
        try{
            if(cacheSetting == 'file'){
                console.info(`Gettting properties from the test data file`)
                setProperties(testData as unknown as PropertyWithUsages[]);
                setStatus('fetched');
                return; 
            }else{
                localforage.getItem('property_cache')
                    .then((cacheValue:unknown) => {
                        if(cacheValue === null || cacheSetting !== 'no-cache'){
                            const fetchData = async () => {
                                setStatus('fetching');
                                console.info(`Fetching NEW properties`)
                                const response = await fetch('/api/property');
                                const data:PropertyWithUsages[] = await response.json();

                                const filteredData = data.filter((d) => {
                                    if(exculdeZeroUsage && d.usages.length === 0){
                                        return false;
                                    }
                                    return true
                                })
                                
                                setProperties(filteredData);
                                if(cacheSetting !== 'no-cache') localforage.setItem('property_cache', data)
                                setStatus('fetched');
                            };

                            return fetchData();
                        }else{
                            const propertyValues:PropertyWithUsages[] = cacheValue as unknown as PropertyWithUsages[]
                            console.info(`Gettting ${propertyValues.length} from the cache`)
                            setProperties(propertyValues);
                            setStatus('fetched');
                        }
                    })
            }
            
        }catch(err){
            console.error('Could not get properties')
            console.error(err)
        }
        //const groupedPropertyCircleMarkers = 
    }, []);

    useEffect(() => {
        const groupingAmount = 500;
        setGroupedProperties(_.groupBy(properties, (p) => {
            switch(p.styleData.colorClass){
                case 'low-level':{
                    return `1<500 Lts`
                }
                case 'med-level':{
                    return `2500-700 Lts`
                }
                case 'high-level':{
                    return `3700-2000 Lts`
                }
                case 'vhigh-level':{
                    return `4>2000 Lts`
                }
            }

            /*if(p.averageUsage < 1000){ 
                const groupNumber:number = +(p.averageUsage / groupingAmount).toFixed(0)
                return `${(groupNumber*groupingAmount).toString()}-${((groupNumber+1)*groupingAmount).toString()} Ltr`
            }else{
                return '>1000 Ltr'
            }*/
        }))
        setGroupingAmount(groupingAmount)
    }, [properties])

    return { status, properties, groupedProperties, groupingAmount };
};

export {
    useProperties
}
