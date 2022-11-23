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

  getPropertyUsages = ():PropertyWithUsages[] => {
    return this.allProperties.map((p) => {

      
      const propertyWithUsage = new PropertyWithUsages(p, this.allUsages.filter((u) => u.property_id === p.RatingUnitID) || [])

      propertyWithUsage.numberGreaterThan = this.getPropertyMedian(propertyWithUsage.averageUsage)
      return propertyWithUsage;
    })
  }

  getPropertyMedian = (usage:number):number => {
    return this.allPropertiesWithUsages ? this.allPropertiesWithUsages.filter((ap) => ap.averageUsage < usage).length : 0
  }
}

export default PropertyWithUsageGenerator
