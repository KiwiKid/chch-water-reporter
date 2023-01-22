import Property from '../Property'
import PropertyWithUsageGenerator from '../PropertyWithUsageGenerator'
import Usage from '../Usage'
require('isomorphic-fetch')

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
}



export {
  Fetcher
} 