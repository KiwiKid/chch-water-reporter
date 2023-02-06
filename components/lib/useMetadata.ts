import { useEffect, useState } from 'react';
import metadata from '../../pages/data/meta_data.json'

interface MetaData { 
    year:string
    month:string
    average:number
    count:number
    date:Date
  }

type MetaStatus = 'idle'|'loaded'|'fetching'

interface AllMetaData {
    status:MetaStatus
    averages:MetaData[]
}

const useMetaData = ():AllMetaData => {


    const [averages, setAverages] = useState<MetaData[]>([]);
    const [status, setStatus] = useState<MetaStatus>('idle');

    useEffect(() => {
        if(averages.length == 0){
            setStatus('fetching')
            console.info(`Gettting properties from the test data file`)
            setAverages(metadata as unknown as MetaData[]);
            setStatus('loaded');
        }
    }, [])
    


    return { 
        status
        , averages
    };
}

const filterToRelevant = (metaData:MetaData[], dates:string[]):MetaData[] => {
    return metaData.filter((md) => {
        return dates.filter((d) => {
            d.indexOf(md.month) > 0 && d.indexOf(md.year) > 0
        })
    })
}

export {
    useMetaData,
    filterToRelevant
}