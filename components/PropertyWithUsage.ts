import Property from "./Property";
import Usage, { byDateFor } from "./Usage";
import groupBy  from 'lodash/groupBy'
import getColorClass, { StyleData } from "./lib/getColor";
import { getCircleSize } from './lib/getCircleSize'

export interface CircleSizes {
  "0"?:number,
  "1"?:number,
  "2"?:number,
  "3"?:number,
  "4"?:number,
  "5"?:number,
  "6"?:number,
  "7"?:number,
  "8"?:number,
  "9"?:number,
  "10"?:number,
  "11"?:number,
  "12"?:number,
  "13"?:number,
  "14"?:number,
  "15"?:number,
  "16"?:number,
  "17"?:number,
  "18"?:number,
}


/**
 * NOTE: Run 'yarn run update-data' to apply updates to this object
 */
class PropertyWithUsages {
  property: Property;
  usages:Usage[]
  averageUsage:number

  numberGreaterThan?:number
  styleData:StyleData
  randomGroup:number
  circleSizes:CircleSizes
  
  constructor(property: Property, usages: Usage[]) {
    this.property = property;
    // Remove any duplcates that go through
    const singleUsages = groupBy(usages, (u) => `${u.property_id} ${u.date_for}`)
    this.usages = Object.keys(singleUsages).map((key) => singleUsages[key][0])

    let latestUsage = usages.sort(byDateFor)[usages.length-1]?.avg_per_day_ltr_num || 0
    this.averageUsage = latestUsage //usages.reduce((a, b) => a + b.avg_per_day_ltr_num, 0) / usages.length
    
    this.styleData = getColorClass(this.averageUsage)

    this.randomGroup = parseInt(property.RatingUnitID.substring(property.RatingUnitID.length-1, property.RatingUnitID.length))

    this.circleSizes = {  
      "0": getCircleSize(this.averageUsage, 0),
      "1": getCircleSize(this.averageUsage, 1),
      "2": getCircleSize(this.averageUsage, 2),
      "3": getCircleSize(this.averageUsage, 3),
      "4": getCircleSize(this.averageUsage, 4),
      "5": getCircleSize(this.averageUsage, 5),
      "6": getCircleSize(this.averageUsage, 6),
      "7": getCircleSize(this.averageUsage, 7),
      "8": getCircleSize(this.averageUsage, 8),
      "9": getCircleSize(this.averageUsage, 9),
      "10": getCircleSize(this.averageUsage, 10),
      "11": getCircleSize(this.averageUsage, 11),
      "12": getCircleSize(this.averageUsage, 12),
      "13": getCircleSize(this.averageUsage, 13),
      "14": getCircleSize(this.averageUsage, 14),
      "15": getCircleSize(this.averageUsage, 15),
      "16": getCircleSize(this.averageUsage, 16),
      "17": getCircleSize(this.averageUsage, 17),
      "18": getCircleSize(this.averageUsage, 18),
    }
  }
}


export default PropertyWithUsages
