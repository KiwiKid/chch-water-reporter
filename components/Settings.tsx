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

  const FLY_TO_OPTIONS = {
    animate: false
  }

  interface SettingsProps {
    adaptiveZoom:any
    setAdaptiveZoom:any
    onlyShowOver:number
    isShowingFull:boolean
    setIsShowingFull:(opt:boolean) => void
    isLoading:boolean
    propertyCount:number
  }

const Settings = ({adaptiveZoom, setAdaptiveZoom, onlyShowOver, isShowingFull, setIsShowingFull, isLoading, propertyCount}:SettingsProps) => {

  const map = useMap();

  let resetMap = () => {
    map.flyTo(CHRISTCHURCH_CENTER.latlng, CHRISTCHURCH_CENTER.zoom, FLY_TO_OPTIONS)
    setAdaptiveZoom(CHRISTCHURCH_CENTER.zoom)
    // refereshVisibleProperties()
  }

  return (
    <>
    <style>
      {`
      @keyframes spin {
        from {transform:rotate(0deg);}
        to {transform:rotate(360deg);}
      }
      `}
    </style>
    <div style={{zIndex: 1500, position: 'absolute', backgroundColor: 'rgb(71 85 105)', bottom: 50, left: 10, padding: '0.7rem', borderRadius: 14}}>
        {!isShowingFull ? <div onClick={() => setIsShowingFull(true)} style={{ width: '2rem', height: '2rem', animation: isLoading ? `spin 2s linear infinite`: ''}}>
            <Image alt="open settings" src={'/settings.svg'} width={30} height={30} />
          </div> :
          <div style={{zIndex: 1500, backgroundColor: 'rgb(71 85 105)', padding: '0.7rem', borderRadius: 14, width: '40rem', height: '4rem', margin: 'auto'}} >
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              <div className="w-1/6" style={{ fontSize: 'large'}}>
                <div style={{ width: '2rem', height: '2rem', animation: isLoading ? `spin 2s linear infinite`: ''}}>
                  <Image alt="open settings" src={'/settings.svg'} width={30} height={30} />
                </div>
              </div>
              <div className="w-1/6"><Button onClick={() => setIsShowingFull(false)}>Close</Button></div>
              <div className="w-1/6"><Button onClick={() => setAdaptiveZoom(!adaptiveZoom)}>{adaptiveZoom ? 'Show All' : 'Show most\n(Best Performance)'}{adaptiveZoom && onlyShowOver !== 0 ? <><br/>({adaptiveZoom ? `${(10-onlyShowOver)*10}%` : '100%'} showing)</> : null}</Button></div>
                                     {/*<div>{groupedProperties ? Object.keys(groupedProperties).reduce((prev, key) => prev+= groupedProperties[key].length, 0) : 0 } loaded</div>*/}
              <div className="w-1/6"><Button onClick={() => resetMap()}>Reset Map</Button></div>
              <div className="w-1/6"><UseMyLocation /></div>

              <div className="w-1/6">{propertyCount} showing (zoom: {map.getZoom()}) onlyShowOver: {onlyShowOver}</div>

            </div>
          </div>
        }
    </div>
    </>
)
}

export {
    Settings
}