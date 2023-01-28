import { NextRouter, useRouter } from "next/router"

class UrlManager {

    zoom:number
    postion:[number,number]
    mapMoveSettledUpdate?:ReturnType<typeof setTimeout>
    query?:string
    router:NextRouter

    constructor(startingZoom:number, startingPosition:[number,number]){
        this.router = useRouter();
        this.zoom = startingZoom;
        this.postion = startingPosition;
    }

    updateZoom(zoom:number){
        
        this.zoom = zoom;
        var self = this;
        clearTimeout(this.mapMoveSettledUpdate)

        this.mapMoveSettledUpdate = setTimeout(function() {
            self.query = `/?zoom=${self.zoom}&lat=${self.postion[0]}&lng=${self.postion[1]}`
            self.router.push(`${self.query}`,undefined, { shallow: true})
        }, 3000)
    }

    updatePosition(postion:[number,number]){
        var self = this;
        self.postion = postion;
        clearTimeout(this.mapMoveSettledUpdate)

        this.mapMoveSettledUpdate = setTimeout(function() {
            self.query = `/?zoom=${self.zoom}&lat=${postion[0]}&lng=${postion[1]}`
            self.router.push(`${self.query}`,undefined, { shallow: true})
        }, 3000)
    }

    getUrl():string{
        if(!!this.query){
            return `https://chch-water-reporter.vercel.app${this.query}`
        }
        return `https://chch-water-reporter.vercel.app`
    }
}

export {
    UrlManager
}