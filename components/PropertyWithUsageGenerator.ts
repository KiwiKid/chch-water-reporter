import Property from "./Property";
import PropertyWithUsages from "./PropertyWithUsage";
import Usage from "./Usage";

class PropertyWithUsageGenerator {
  allProperties:Property[]
  allUsages:Usage[]

  allPropertiesWithUsages?:PropertyWithUsages[];

  constructor(allProperties: Property[], allUsages: Usage[]) {
    this.allProperties = allProperties;
    this.allUsages = allUsages;
  }

  /*#removeDuplicates = (all:PropertyWithUsages[]):PropertyWithUsages[] =>{
    let seen = new Set();
    return all.filter(item => {
        let k = `${item.averageUsage}${item.property.lat}${item.property.lng}`
        return seen.has(k) ? false : seen.add(k);
    });
  }*/

  getPropertyUsages = ():PropertyWithUsages[] => {
    return this.allProperties.map((p) => {
      
      const propertiesWithUsages = new PropertyWithUsages(p, this.allUsages.filter((u) => u.property_id === p.RatingUnitID) || [])

      propertiesWithUsages.numberGreaterThan = this.getPropertyMedian(propertiesWithUsages.averageUsage)

      return propertiesWithUsages;
    })
  }

  getPropertyMedian = (usage:number):number => {
    return this.allPropertiesWithUsages ? this.allPropertiesWithUsages.filter((ap) => ap.averageUsage < usage).length : 0
  }
}

export default PropertyWithUsageGenerator
