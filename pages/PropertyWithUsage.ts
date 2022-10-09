import getColor from "../components/lib/getColor";
import hsl_col_perc from "../components/lib/getColorPercent";
import getPercent from "../components/lib/getPercent";
import Property from "./Property";
import Usage from "./Usage";



const COLOR_RANGE_BOTTOM = 300
const COLOR_RANGE_TOP = 10000
class PropertyWithUsages {
  property: Property;
  usages:Usage[]

  averageUsage:number
  color:string

  color_percent:number




  
  constructor(property: Property, usages: Usage[]) {
    this.property = property;
    this.usages = usages;

    this.averageUsage = usages.reduce((a, b) => a + b.avg_per_day_ltr_num, 0) / usages.length

    this.color_percent = getPercent(this.averageUsage, COLOR_RANGE_BOTTOM, COLOR_RANGE_TOP)
    this.color = getColor(this.color_percent);
  }
}


export default PropertyWithUsages
