import Property from "./Property";
import PropertyWithUsages from "./PropertyWithUsage";
import Usage, { MonthString } from "./Usage";

class PropertyWithUsageGenerator {
  allProperties:Property[]
  allUsages:Usage[]

//  monthGroups:Map<string,number>

  allPropertiesWithUsages:PropertyWithUsages[];

  constructor(allProperties: Property[], allUsages: Usage[]) {
    this.allProperties = allProperties;
    this.allUsages = allUsages;

    this.allPropertiesWithUsages = this.allProperties.map((p) => {

      return new PropertyWithUsages(p, this.allUsages.filter((u) => u.property_id === p.RatingUnitID) || [])

      // propertiesWithUsages.numberGreaterThan = this.getPropertyMedian(propertiesWithUsages.averageUsage)

    })
/*
    this.monthGroups = new Map<MonthString, number[]>()

    this.allPropertiesWithUsages.forEach((p) => {
      p.usages.forEach((u:Usage) => {

        const existingMonthGroup = 
        if(this.monthGroups.has(u.month)){
          
          let existingAvg = Math.average(this.monthGroups.get(u.month))S

          this.monthGroups.set()
        }
      })
      
    })*/
  }

  /*#removeDuplicates = (all:PropertyWithUsages[]):PropertyWithUsages[] =>{
    let seen = new Set();
    return all.filter(item => {
        let k = `${item.averageUsage}${item.property.lat}${item.property.lng}`
        return seen.has(k) ? false : seen.add(k);
    });
  }*/
}

export { PropertyWithUsageGenerator }
