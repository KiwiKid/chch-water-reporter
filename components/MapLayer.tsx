import React, { useEffect, useState } from "react";
import { FeatureGroup, LayerGroup, LayersControl, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import PropertyCircleMarker from '../components/PropertyCircleMarker'
import PropertyWithUsages, { CircleSizes } from "./PropertyWithUsage";

type MapLayerProps = {
    properties:PropertyWithUsages[]
    onlyShowOver:number
    adaptiveZoom:boolean
    setIsLoading:any
}

const MapLayer = ({properties, onlyShowOver, adaptiveZoom, setIsLoading}:MapLayerProps) => {

    let [visibleProperties, setVisibleProperties] = useState<PropertyWithUsages[]>()

    let refereshVisibleProperties = () => {
        setIsLoading(true)
        setVisibleProperties(properties.filter((p) => p.property.point && p.usages.length > 0)
            .filter((p) => map.getBounds().contains(p.property.point))
            .filter((p) => p.randomGroup >= onlyShowOver || !adaptiveZoom))
        setIsLoading(false)
    }
        
    useEffect(() => {
        refereshVisibleProperties()
    }, [adaptiveZoom])


    const map = useMapEvents({
        zoomend:() => {
            refereshVisibleProperties()
        },
        moveend:() => {
            refereshVisibleProperties()
        }
    })

return (
    <FeatureGroup>
        {!visibleProperties ? null : visibleProperties
            .map((p) => {
                console.log('loading?')
                let circleSize = p.circleSizes[(map.getZoom().toString() as keyof CircleSizes)] || 300
                console.log('loaded?')
                return (<PropertyCircleMarker key={`${p.property.id}`} p={p} circleSize={circleSize}/>)
            })}
    </FeatureGroup>
    )
}

export {
    MapLayer
}