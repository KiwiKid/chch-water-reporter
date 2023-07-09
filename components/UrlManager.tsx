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
    debug: boolean
   // router:NextRouter

    constructor(props:Props){
        super(props)
    //    this.router = useRouter();
        this.zoom = props.zoom;
        this.postion = props.postion;
        this.debug = false;
    }

    updateZoom(zoom:number, next:any){
        
        this.zoom = zoom;
        var self = this;
        clearTimeout(this.mapMoveSettledUpdate)

        self.query = `/?zoom=${self.zoom}&lat=${self.postion[0]}&lng=${self.postion[1]}${self.debug ? '&debug=true' : ''}`

        next()
    }

    updatePosition(postion:[number,number], next:any){
        this.postion = postion;
        clearTimeout(this.mapMoveSettledUpdate)

        this.query = `/?zoom=${this.zoom}&lat=${postion[0]}&lng=${postion[1]}${this.debug ? '&debug=true' : ''}`
        //    self.router.push(`${self.query}`,undefined, { shallow: true})
        next()
    }

    getUrl():string{
        const baseUrl = window.location?.origin != null ? window.location.origin : ''
        if(!!this.query){
            return `${baseUrl}${this.query}`
        }
        return baseUrl
    }

    render(): React.ReactNode {
       return <></>
    }
}

export {
    UrlManager
}