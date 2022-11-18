
import Rainbow from 'rainbowvis.js'

const COLOR_RANGE_BOTTOM = 300
const COLOR_RANGE_TOP = 3000

const colorMap:StyleData[] = [
  {colorClass: 'low-level', colorCode:'#9BA4AA', min: 0, max: 500},
  {colorClass: 'med-level', colorCode: '#8FA6C4', min: 500, max: 700},
  {colorClass: 'high-level', colorCode: '#3D769F', min: 700, max: 2000},
  {colorClass: 'vhigh-level', colorCode: '#0909FF', min: 2000, max: 9999999},
]

type StyleData = {
  colorClass: 'low-level'|'med-level'|'high-level'|'vhigh-level'
  colorCode: string
  min: number
  max: number
}

export default function getColorClass(waterUsageRate:number):StyleData {
  /*const rainbow = new Rainbow()
  rainbow.setSpectrum('green', 'black', 'blue', 'red')
  rainbow.setNumberRange(COLOR_RANGE_BOTTOM, COLOR_RANGE_TOP);

  console.log(`${percent} [${COLOR_RANGE_BOTTOM}-${COLOR_RANGE_TOP}`)
  return rainbow.colorAt(percent)*/

  const colorMatch = colorMap.filter((cm) => {
    const res = cm.min <= waterUsageRate && cm.max >= waterUsageRate;
    return res;
    
  })
  
  if(colorMatch !== null && colorMatch.length > 0){
    return colorMatch[0]
  }else{
    console.error('No COLOR MATCH!!!!')
    console.log(waterUsageRate)
    return { colorClass: 'low-level', colorCode: 'blue', min: 10, max: 10}
  }
  }