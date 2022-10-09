export default function getPercent(input:number, min:number, max:number):number{
    if(!input){
        console.error('Null input to getPercent()')
        return 50
    }
    return Math.max(((input - min) * 100) / (max - min), 1)*100
}

