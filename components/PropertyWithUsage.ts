import Property from "./Property";
import Usage from "./Usage";
import groupBy  from 'lodash/groupBy'

class PropertyWithUsages {
  property: Property;
  usages:Usage[]

  averageUsage:number
  
  constructor(property: Property, usages: Usage[]) {
    this.property = property;
    // Remove any duplcates that go through
    const singleUsages = groupBy(usages, (u) => `${u.property_id} ${u.status}`)
    this.usages = Object.keys(singleUsages).map((key) => singleUsages[key][0])

    if(usages.length == 0){
      console.error(`Usage has length of 0 ================ `)
      console.error(property)
      console.error(usages)
    }

   //  console.log(`total: ${usages.reduce((a, b) => a + b.avg_per_day_ltr_num, 0)}/${usages.length} ${usages.map((u) => `${u.avg_per_day_ltr_num}`)}`)
    this.averageUsage = usages.reduce((a, b) => a + b.avg_per_day_ltr_num, 0) / usages.length
  }
}


export default PropertyWithUsages
