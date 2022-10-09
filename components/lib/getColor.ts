
import Rainbow from 'rainbowvis.js'

const COLOR_RANGE_BOTTOM = 300
const COLOR_RANGE_TOP = 3000

const colorMap:StyleData[] = [
  {colorClass: 'low-level', colorCode:'green', min: 0, max: 500},
  {colorClass: 'med-level', colorCode: 'blue', min: 500, max: 700},
  {colorClass: 'high-level', colorCode: 'red', min: 700, max: 2000},
  {colorClass: 'vhigh-level', colorCode: 'black', min: 2000, max: 9999999},
]

type StyleData = {
  colorClass: 'low-level'|'med-level'|'high-level'|'vhigh-level'
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
    return colorMatch[0]
  }else{
    return { colorClass: 'low-level', colorCode: 'blue'}
  }
  }