import Property from "./Property";
import Usage from "./Usage";
import groupBy  from 'lodash/groupBy'
import getColorClass, { StyleData } from "./lib/getColor";

class PropertyWithUsages {
  property: Property;
  usages:Usage[]
  averageUsage:number

  numberGreaterThan?:number
  styleData:StyleData

  
  constructor(property: Property, usages: Usage[]) {
    this.property = property;
    // Remove any duplcates that go through
    const singleUsages = groupBy(usages, (u) => `${u.property_id} ${u.date_for}`)
    this.usages = Object.keys(singleUsages).map((key) => singleUsages[key][0])

    this.averageUsage = usages.reduce((a, b) => a + b.avg_per_day_ltr_num, 0) / usages.length
    
    this.styleData = getColorClass(this.averageUsage)
  }
}


export default PropertyWithUsages
