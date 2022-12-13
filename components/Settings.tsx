import { LatLng } from 'leaflet';
import Image from 'next/image';
import React, { useState } from 'react'
import { useMap, useMapEvent, useMapEvents } from 'react-leaflet';
import { Button } from './Button';
import { UseMyLocation } from './UseMyLocation'

const CHRISTCHURCH_CENTER = {
    latlng: new LatLng(-43.55, -187.370),
    zoom: 12
  }

  interface SettingsProps {
    adaptiveZoom:any
    setAdaptiveZoom:any
    onlyShowOver:number
  }

const Settings = ({adaptiveZoom, setAdaptiveZoom, onlyShowOver}:SettingsProps) => {

const [isLocated, setIsLocated] = useState<boolean>(false)

const [isLoading, setIsLoading] = useState<boolean>(true)
const [isShowingFull, setIsShowingFull] = useState<boolean>(false)

const map = useMap();

    return (
        <div style={{zIndex: 1500, position: 'absolute', backgroundColor: 'rgb(71 85 105)', bottom: 20, left: 10, padding: '0.7rem', borderRadius: 14}}>
            {!isShowingFull ?
            <div onClick={() => setIsShowingFull(true)}>
            <Image alt="open settings" src={'/settings.svg'} width={30} height={30} />
            </div> :
            <div style={{zIndex: 1500, position: 'absolute', backgroundColor: 'rgb(71 85 105)', bottom: 20, left: 10, padding: '0.7rem', borderRadius: 14, width: '600px', margin: 'auto'}} >
            <div>{isLoading ? 'LOADING ' : null}</div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <div className="w-1/4"><Button onClick={() => setAdaptiveZoom(!adaptiveZoom)}>{adaptiveZoom ? 'Show All' : 'Show most'}{adaptiveZoom && onlyShowOver !== 0 ? <><br/>({adaptiveZoom ? `${(10-onlyShowOver)*10}%` : '100%'} showing)</> : null}</Button></div>
                            {/*<div>{groupedProperties ? Object.keys(groupedProperties).reduce((prev, key) => prev+= groupedProperties[key].length, 0) : 0 } loaded</div>*/}
                <div className="w-1/4"><Button onClick={() => map.flyTo(CHRISTCHURCH_CENTER.latlng, CHRISTCHURCH_CENTER.zoom)}>Reset Map</Button></div>
                <div className="w-1/4"><Button onClick={() => setIsShowingFull(false)}>Close</Button></div>
                <div className="w-1/4"><UseMyLocation /></div>
            </div>  
            </div>
            }
      </div>
)
}

export {
    Settings
}