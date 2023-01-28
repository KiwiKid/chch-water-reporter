import localforage from "localforage";
import { useEffect, useState } from "react";
import PropertyWithUsages from "../PropertyWithUsage";

import testData from '../../pages/data/property_data.json'
import _, { debounce, Dictionary, map } from "lodash";
import { LatLng, LatLngBounds } from "leaflet";

export type PropertyStatus = 'idle'|'fetching'|'fetched'


export type CacheOptions = 'cache'|'file'|'no-cache'

interface UsePropertiesProps {
    exculdeZeroUsage?:boolean
    adaptiveZoom?:boolean
    mapZoom?:number
    mapBounds?:LatLngBounds
    nonMap:boolean
}

const getOnlyShowOver = (mapZoom?:number) => {
    switch(mapZoom) {
        // high zoom
        case 13: 
            return 9;
        case 14: 
            return 9;
        case 15:
            return 7;
        case 16:
            return 0;
        case 17:
            return 0;
        case 18:
            return 0;
        default:
            return 8;
        }
}


const useProperties = ({exculdeZeroUsage, adaptiveZoom, mapZoom, mapBounds, nonMap}:UsePropertiesProps) => {
    const [status, setStatus] = useState<PropertyStatus>('idle');
    const [properties, setProperties] = useState<PropertyWithUsages[]>([]);
    const [groupedProperties, setGroupedProperties] = useState<Dictionary<PropertyWithUsages[]>>()
    const [groupingAmount, setGroupingAmount] = useState<number>(0)
    
    
    const [isMapLoading, setIsMapLoading] = useState<boolean>(true)
    const [onlyShowOver, setOnlyShowOver] = useState<number>(7)
    const [showingPropertyCount, setShowingPropertyCount] = useState<number>(0)

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
    }, [exculdeZeroUsage]);

    useEffect(() => {
      //  debounce(() => {
        setIsMapLoading(true)

            let onlyShowOver = getOnlyShowOver(mapZoom)
            const groupingAmount = 500;
            
            let filteredProperties = properties
                .filter((p) => nonMap || (mapBounds && mapBounds.contains(p.property.point)))
                .filter((p) => nonMap || (p.randomGroup >= onlyShowOver || !adaptiveZoom))
                .filter((p) => nonMap || (p.property.point && p.usages.length > 0 || !exculdeZeroUsage))


            const allGroupedProperties = _.groupBy(filteredProperties, (p) => {
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
                    default: 
                        console.error('no match?', p)
                }

                /*if(p.averageUsage < 1000){ 
                    const groupNumber:number = +(p.averageUsage / groupingAmount).toFixed(0)
                    return `${(groupNumber*groupingAmount).toString()}-${((groupNumber+1)*groupingAmount).toString()} Ltr`
                }else{
                    return '>1000 Ltr'
                }*/
            })

            setGroupedProperties(allGroupedProperties)
            setGroupingAmount(groupingAmount)
            setIsMapLoading(false)
            setOnlyShowOver(onlyShowOver)
            setShowingPropertyCount(filteredProperties.length)
       // }, 1000)


    }, [properties, adaptiveZoom, mapZoom, mapBounds, nonMap, exculdeZeroUsage])

    return { status
        , properties
        , groupedProperties
        , groupingAmount
        , propertyCount: properties.length
        , isMapLoading
        , onlyShowOver
        , showingPropertyCount
    };
};

export {
    useProperties
}
