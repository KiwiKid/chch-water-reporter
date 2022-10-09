
import Rainbow from 'rainbowvis.js'

const COLOR_RANGE_BOTTOM = 300
const COLOR_RANGE_TOP = 3000

const colorMap:StyleData[] = [
  {color: 'low-level', colorCode:'green', min: 0, max: 500},
  {color: 'med-level', colorCode: 'blue', min: 500, max: 700},
  {color: 'high-level', colorCode: 'red', min: 700, max: 2000},
  {color: 'vhight-level', colorCode: 'black', min: 2000, max: 9999999},
]

type StyleData = {
  color: 'low-level'|'med-level'|'high-level'|'vhight-level'
  colorCode: string
  min?: number
  max?: number
}

export default function getColorClass(waterUsageRate:number):StyleData {
  /*const rainbow = new Rainbow()
  rainbow.setSpectrum('green', 'black', 'blue', 'red')
  rainbow.setNumberRange(COLOR_RANGE_BOTTOM, COLOR_RANGE_TOP);

  console.log(`${percent} [${COLOR_RANGE_BOTTOM}-${COLOR_RANGE_TOP}`)
  return rainbow.colorAt(percent)*/

  const colorMatch = colorMap.filter((cm) => (cm.min && cm.min < waterUsageRate) && (cm.max && cm.max > waterUsageRate))
  
  if(colorMatch !== null && colorMatch.length > 0){
    console.log(`${waterUsageRate} === ${colorMatch[0].color}`)
    return colorMatch[0]
  }else{
    console.log(`default blue`)
    return { color: 'low-level', colorCode: 'blue'}
  }
  }