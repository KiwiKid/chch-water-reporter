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
  
  constructor({property_id ,date_for ,days_for ,avg_per_day_ltr ,avg_per_day_price ,level ,comments ,status ,id}: UsageProps) {
    this.property_id = property_id;
    this.date_for = date_for;
    this.days_for = days_for;
    this.avg_per_day_ltr = avg_per_day_ltr;
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

   }
}

export default Usage
