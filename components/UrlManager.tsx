import { NextRouter, useRouter } from "next/router"
import React from "react"

interface Props {
    zoom:number,
    postion:[number,number]
}
class UrlManager extends React.Component {

    zoom:number
    postion:[number,number]
    mapMoveSettledUpdate?:ReturnType<typeof setTimeout>
    query?:string
    router:NextRouter

    constructor(props:Props){
        super(props)
        this.router = useRouter();
        this.zoom = props.startingZoom;
        this.postion = props.startingPosition;
    }

    updateZoom(zoom:number, next:any){
        
        this.zoom = zoom;
        var self = this;
        clearTimeout(this.mapMoveSettledUpdate)

        this.mapMoveSettledUpdate = setTimeout(function() {
            self.query = `/?zoom=${self.zoom}&lat=${self.postion[0]}&lng=${self.postion[1]}`
            self.router.push(`${self.query}`,undefined, { shallow: true})
        }, 3000)

        next()
    }

    updatePosition(postion:[number,number], next:any){
        var self = this;
        self.postion = postion;
        clearTimeout(this.mapMoveSettledUpdate)

        this.mapMoveSettledUpdate = setTimeout(function() {
            self.query = `/?zoom=${self.zoom}&lat=${postion[0]}&lng=${postion[1]}`
            self.router.push(`${self.query}`,undefined, { shallow: true})
        }, 3000)
        next()
    }

    getUrl():string{
        if(!!this.query){
            return `https://chch-water-reporter.vercel.app${this.query}`
        }
        return `https://chch-water-reporter.vercel.app`
    }

    render(): React.ReactNode {
       return <></>
    }
}

export {
    UrlManager
}