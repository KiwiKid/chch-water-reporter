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

const colorMap = [
  {color: '#00FF00', min: 300, max: 500},
  {color: '#0000FF', min: 500, max: 700},
  {color: '#FF0000', min: 500, max: 700}
]

class Usage {
  property_id:string
  date_for:string
  days_for:string
  avg_per_day_ltr:string
  avg_per_day_price:string
  level:'High'|'Low'
  comments:string
  status:string
  id:number
  color:string

  avg_per_day_ltr_num:number

  constructor({property_id ,date_for ,days_for ,avg_per_day_ltr ,avg_per_day_price ,level ,comments ,status ,id}: UsageProps) {
    this.property_id = property_id;
    this.date_for = date_for;
    this.days_for = days_for;
    this.avg_per_day_ltr = avg_per_day_ltr;
    if(avg_per_day_ltr && avg_per_day_ltr.indexOf('L') > 0){
      this.avg_per_day_ltr_num = parseInt(this.avg_per_day_ltr.replace('L', ''))
    }else{
      console.error(`Weird conversion for avc_per_day_ltr? ${avg_per_day_ltr}`)
    }
    
    this.avg_per_day_price = avg_per_day_price;
    this.level = level;
    this.comments = comments;
    this.status = status;
    this.id = id;

    const colorMatch =  colorMap.filter((c) => c.min > this.avg_per_day_ltr_num && c.max > this.avg_per_day_ltr_num)
    if(colorMatch){
      this.color = colorMap[0].color
    }else{
      this.color = '#00FF00'
    }
  }
}

export default Usage
