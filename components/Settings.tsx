import { LatLng } from 'leaflet';
import Image from 'next/image';
import React from 'react'
import { useMap } from 'react-leaflet';
import { Button } from './Button';
import { UseMyLocation } from './UseMyLocation'
import CSS from 'csstype';

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
    showingPropertyCount:number
  }

const Settings = ({adaptiveZoom, setAdaptiveZoom, onlyShowOver, isShowingFull, setIsShowingFull, isLoading, propertyCount, showingPropertyCount}:SettingsProps) => {

  const map = useMap();

  let resetMap = () => {
    map.flyTo(CHRISTCHURCH_CENTER.latlng, CHRISTCHURCH_CENTER.zoom, FLY_TO_OPTIONS)
    // refereshVisibleProperties()
  }

  const buttonStyle:CSS.Properties = { width: '33%', textAlign: 'center' }

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
    <div style={{zIndex: 1500, position: 'absolute', backgroundColor: 'rgb(71 85 105)', bottom: 50, left: 10, padding: '0.3rem', borderRadius: 14}}>
        {!isShowingFull ? <div onClick={() => setIsShowingFull(true)} style={{ width: '2rem', height: '2rem', animation: isLoading ? `spin 2s linear infinite`: ''}}>
            <Image alt="open settings" src={'/settings.svg'} width={30} height={30} />
          </div> :
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '30rem', height: '4rem', lineHeight: '1rem'}}>
            <div onClick={() => setIsShowingFull(false)} style={{zIndex: 1500, padding: '0.3rem', borderRadius: 14}} >
              <div style={{ fontSize: 'large'}}>
                <div style={{ width: '2rem', height: '2rem', animation: isLoading ? `spin 2s linear infinite`: ''}}>
                 <Image alt="open settings" src={'/settings.svg'} width={30} height={30} />&#9668;&#9668;
                </div>
              </div>
            </div>
            <div style={buttonStyle}><Button onClick={() => setAdaptiveZoom(!adaptiveZoom)}>{adaptiveZoom ? 'Load All (can be slow)' : 'Load most\n(Best Performance)'}{adaptiveZoom && <><br/>({adaptiveZoom ? `${(10-onlyShowOver)*10}%` : '100%'} showing)</>}</Button></div>
                                     {/*<div>{groupedProperties ? Object.keys(groupedProperties).reduce((prev, key) => prev+= groupedProperties[key].length, 0) : 0 } loaded</div>*/}
                {/*<div className="w-1/6"><Button onClick={() => resetMap()}>Reset Map</Button></div>*/}
            <div style={buttonStyle}><UseMyLocation /></div>
            <div style={{ width: '25%', fontSize: 'medium'}} className="text-center">{showingPropertyCount} showing<br/>{propertyCount} total<br/>zoom: {map.getZoom()}</div>          </div>
        }
    </div>
    </>
)
}

export {
    Settings
}