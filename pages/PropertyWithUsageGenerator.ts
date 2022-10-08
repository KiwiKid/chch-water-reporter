import Property from "./Property";
import PropertyWithUsages from "./PropertyWithUsage";
import Usage from "./Usage";

class PropertyWithUsageGenerator {
  allProperties:Property[]
  allUsages:Usage[]

  constructor(allProperties: Property[], allUsages: Usage[]) {
    this.allProperties = allProperties;
    this.allUsages = allUsages;
  }

  getPropertyUsages = ():PropertyWithUsages[] => {
    return this.allProperties.map((p) => {
      return new PropertyWithUsages(p, this.allUsages.filter((u) => u.property_id === p.RatingUnitID) || [])
    })
  }
}

export default PropertyWithUsageGenerator
