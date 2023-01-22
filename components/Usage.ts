import getColorClass, { StyleData } from "./lib/getColor"

type UsageProps = {
  property_id:string
  date_for:string
  days_for:string
  avg_per_day_ltr:string
  avg_per_day_price:string
  level:'High'|'Low'
  comments:string
  status:string
  id:number
}

export type MonthString = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' | 'Invalid Month';

class Usage {
  property_id:string
  date_for:string
  days_for:string
  avg_per_day_ltr:string
  avg_per_day_price:string
  avg_per_day_ltr_num:number
  level:'High'|'Low'
  comments:string
  status:string
  id:number
  styleData?:StyleData
  month:MonthString
  
  constructor({property_id ,date_for ,days_for ,avg_per_day_ltr ,avg_per_day_price ,level ,comments ,status ,id}: UsageProps) {
    this.property_id = property_id;
    this.date_for = date_for;
    this.days_for = days_for;
    this.avg_per_day_ltr = avg_per_day_ltr;
    this.month = this.#getMonth(date_for)
    if(avg_per_day_ltr && avg_per_day_ltr.indexOf('L') > 0){
      this.avg_per_day_ltr_num = parseInt(this.avg_per_day_ltr.replace('L', ''))
    }else{
      this.avg_per_day_ltr_num = 0
      console.error(`Weird conversion for avc_per_day_ltr? ${avg_per_day_ltr}`)
    }
    
    this.avg_per_day_price = avg_per_day_price;
    this.level = level;
    this.comments = comments;
    this.status = status;
    this.id = id;
    this.styleData = getColorClass(this.avg_per_day_ltr_num)
   }

    #getMonth(text:string):MonthString {
      if(text.indexOf('Jan') > 0) return 'Jan';
      if(text.indexOf('Feb') > 0) return 'Feb';
      if(text.indexOf('Mar') > 0) return 'Mar';
      if(text.indexOf('Apr') > 0) return 'Apr';
      if(text.indexOf('May') > 0) return 'May';
      if(text.indexOf('Jun') > 0) return 'Jun';
      if(text.indexOf('Jul') > 0) return 'Jul';
      if(text.indexOf('Aug') > 0) return 'Aug';
      if(text.indexOf('Sep') > 0) return 'Sep';
      if(text.indexOf('Oct') > 0) return 'Oct';
      if(text.indexOf('Nov') > 0) return 'Nov';
      if(text.indexOf('Dec') > 0) return 'Dec';
      else return 'Invalid Month'
    }
}


export const byDateFor = (a:Usage,b:Usage) => {
  const dateA = new Date(a.date_for)
  const dateB = new Date(b.date_for)
  if(dateA === dateB) return 0 
  return dateA > dateB ? 1 : -1;
}

export default Usage

