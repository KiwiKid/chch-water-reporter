import { useEffect, useState } from "react";
import PropertyWithUsages from "./PropertyWithUsage";

export type PropertyStatus = 'idle'|'fetching'|'fetched'

const NO_CACHE = true
const useProperties = () => {
    const [status, setStatus] = useState<PropertyStatus>('idle');
    const [properties, setProperties] = useState<PropertyWithUsages[]>([]);

    useEffect(() => {
        const cacheValue:string|null = localStorage.getItem('property_cache') 
        if(cacheValue === null || NO_CACHE){
            const fetchData = async () => {
                setStatus('fetching');
                const response = await fetch('/api/property');
                const data = await response.json();
                setProperties(data);
                if(!NO_CACHE) localStorage.setItem('property_cache', JSON.stringify(data))
                setStatus('fetched');
            };

            fetchData();
        }else{
            setProperties(JSON.parse(cacheValue) as PropertyWithUsages[]);
            setStatus('fetched');
        }
    }, []);

    return { status, properties };
};

export {
    useProperties
}
