import Property from '../Property'
import { PropertyWithUsageGenerator } from '../PropertyWithUsageGenerator'
import Usage from '../Usage'
require('isomorphic-fetch')



  interface MetadataResponse {
    meta: AverageRaw[]
  }
  interface AverageRaw {
    year:string
    month:string
    average:number
    count:number
  }

  class Average {
    year:string
    month:string
    average:number
    count:number
    date:Date
    constructor({
        year,
        month,
        average,
        count
    }:AverageRaw){
        this.year = year
        this.month = month
        this.average = average
        this.count = count
        this.date = new Date(`03 ${month} ${year}`)
    }
  }

class Fetcher {
    serverUrl:string

    constructor(serverUrl:string){
        this.serverUrl = serverUrl;
    }


    async get(){

        const propertiesResponse = await fetch(`${this.serverUrl}/chch-water-property/all`)
        const propertyRaw = await propertiesResponse.json()

        console.log(`got ${propertyRaw.length} properties`)
            
        const properties = propertyRaw.property.map((p:Property) => new Property(p))

        const usagesResponse = await fetch(`${this.serverUrl}/chch-water-usage/all`)
        const usagesRaw = await usagesResponse.json();
        const usages = usagesRaw.usages.map((p:Usage) => new Usage(p));


        console.log(`got ${usages.length} usages`)

        const joiner = new PropertyWithUsageGenerator(properties, usages)
        // const propsWithUsage = joiner.getPropertyUsages()

        
        const propertiesToReturn = joiner.allPropertiesWithUsages

        return propertiesToReturn
    }



    async getMeta():Promise<any>{
        const metaResponse = await fetch(`${this.serverUrl}/chch-water-usage/averages`)
        const metaRaw:MetadataResponse = await metaResponse.json()

        return metaRaw.meta..map((mr) => new Average(mr))
    }
}



export {
  Fetcher,
  Average
} 