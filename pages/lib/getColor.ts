import hsl_col_perc from "./getColorPercent";

export default function getColor(percent:number):string {

    // console.log(`${percent}`)
    const color = hsl_col_perc(percent, 0 ,120) // red, green
    return color;
  }