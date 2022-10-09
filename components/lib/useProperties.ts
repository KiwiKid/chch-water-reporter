import localforage from "localforage";
import { useEffect, useState } from "react";
import PropertyWithUsages from "../PropertyWithUsage";

import testData from '../../pages/data/test_data.json'

export type PropertyStatus = 'idle'|'fetching'|'fetched'


export type CacheOptions = 'cache'|'test'|'no-cache'

const useProperties = () => {
    const [status, setStatus] = useState<PropertyStatus>('idle');
    const [properties, setProperties] = useState<PropertyWithUsages[]>([]);
    localforage.config({
     //   driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
        name        : 'chch-water-reporter',
        version     : 1.0,
        size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
        storeName   : 'properties', // Should be alphanumeric, with underscores.
      });
    

    useEffect(() => {
        const cacheSetting:CacheOptions = process.env.REACT_APP_NO_CACHE as CacheOptions || 'test'
        try{
            if(cacheSetting == 'test'){
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
                                const data = await response.json();
                                setProperties(data);
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
    }, []);

    return { status, properties };
};

export {
    useProperties
}