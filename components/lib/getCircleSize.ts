const MIN_CIRCLE_SIZE = 100;
const MAX_CIRCLE_SIZE = 5000;
/**
 * Run update-data to see changes to this function
 */
const getCircleSize = (averageUsage:number, zoom:number) => {
    let scaleFactor = 0.000
    if(zoom === 18){
        scaleFactor = 0.0010
    }else if(zoom >= 16){
        scaleFactor = 0.0010
    }else if(zoom >= 14){
        scaleFactor = 0.0010
    }else if(zoom >= 10){
        scaleFactor = 0.0008
    }else if(zoom >= 8){ 
        scaleFactor = 0.0005
    }else if(zoom >= 6){
        scaleFactor = 0.0007
    }else{
        scaleFactor = 0.0001
    }
    return Math.min(Math.max((averageUsage/2), MIN_CIRCLE_SIZE), MAX_CIRCLE_SIZE)*(scaleFactor*zoom)
}


export {
    getCircleSize
}