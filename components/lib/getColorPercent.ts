// https://stackoverflow.com/a/17267684
export default function hsl_col_perc(percent:number, start:number, end:number) {
    var a = percent / 100,
        b = (end - start) * a,
        c = b + start;
  
    // Return a CSS HSL string
    return 'hsl('+c+', 100%, 50%)';
  }