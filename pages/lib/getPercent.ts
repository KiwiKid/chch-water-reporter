export default function getPercent(input:number, min:number, max:number):number{
    return ((input - min) * 100) / (max - min)
}

