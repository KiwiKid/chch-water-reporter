import { LatLng } from "leaflet";
import React, { useCallback, useEffect, useState } from "react";
import { FeatureGroup, LayerGroup, LayersControl, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import PropertyCircleMarker from '../components/PropertyCircleMarker'
import PropertyWithUsages, { CircleSizes } from "./PropertyWithUsage";

type MapLayerProps = {
    properties:PropertyWithUsages[]
    onlyShowOver:number
    adaptiveZoom:boolean
}

const MapLayer = ({properties, onlyShowOver, adaptiveZoom}:MapLayerProps) => {

    let [visibleProperties, setVisibleProperties] = useState<PropertyWithUsages[]>()
    let [oldMapZoom, setOldMapZoom] = useState<number>();
    let [oldMapBounds, setOldMapBounds] = useState<any>();



    const map = useMapEvents({
        zoomend:() => {
            refereshVisibleProperties()
        },
        moveend:() => {
            refereshVisibleProperties()
        },
        load:() => {
            refereshVisibleProperties()
        }
    })
    //let zoom = map.getZoom()
   // let bounds = map.getBounds()


    let refereshVisibleProperties = () => {
        //let map = useMap();
        //let zoom = map.getZoom()
        //let bounds = map.getBounds()
        //if(zoom !== oldMapZoom || bounds !== oldMapBounds){
            setVisibleProperties(properties.filter((p) => p.property.point && p.usages.length > 0)
                .filter((p) => map.getBounds().contains(p.property.point))
                .filter((p) => p.randomGroup >= onlyShowOver || !adaptiveZoom))
        //}
       // setOldMapZoom(zoom)
        //setOldMapBounds(bounds)
    }
/*
    useEffect(() => {
        refereshVisibleProperties()
    }, [adaptiveZoom, refereshVisibleProperties])
*/

return (
    <FeatureGroup>
        {!visibleProperties ? null : visibleProperties
            .map((p) =>     {
                let circleSize = p.circleSizes[(map.getZoom().toString() as keyof CircleSizes)] || 300
                return (<PropertyCircleMarker key={`${p.property.id}`} p={p} circleSize={circleSize}/>)
            })}
    </FeatureGroup>
    )
}

export {
    MapLayer
}