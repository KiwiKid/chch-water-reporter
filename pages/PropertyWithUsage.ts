import Property from "./Property";
import Usage from "./Usage";

const colorMap = [
  {color: '#00FF00', min: 300, max: 500},
  {color: '#0000FF', min: 500, max: 700},
  {color: '#FF0000', min: 500, max: 700},
  {color: '#000000', min: 700, max: 10000}
]

class PropertyWithUsages {
  property: Property;
  usages:Usage[]

  averageUsage:number
  color:string


  
  constructor(property: Property, usages: Usage[]) {
    this.property = property;
    this.usages = usages;

    this.averageUsage = usages.reduce((a, b) => a + b.avg_per_day_ltr_num, 0) / usages.length

    const colorMatch = colorMap.filter((cm) => cm.min < this.averageUsage && cm.max > this.averageUsage)
    if(colorMatch.length > 0){
      this.color = colorMatch[0].color
    }else{
      this.color = '#FFFFFF'
    }
  }
}


export default PropertyWithUsages
