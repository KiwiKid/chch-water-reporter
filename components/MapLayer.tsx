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

    let [propTimeout, setPropTimeout] = useState<any>();

    const map = useMapEvents({
        zoomend:() => {
            refereshVisibleProperties()
        },
        moveend:() => {
            refereshVisibleProperties()
        },
        load:() => {
            refereshVisibleProperties()
        },
        locationfound: () => {
            refereshVisibleProperties()
        }
    })


    let refereshVisibleProperties = () => {
        
        // CANCEL API-CALL
        clearTimeout(propTimeout);
        
        // API CALL
        setPropTimeout(setTimeout(function() {

            let start = Date.now()

            setVisibleProperties(properties.filter((p) => p.property.point && p.usages.length > 0)
                .filter((p) => map.getBounds().contains(p.property.point))
                .filter((p) => p.randomGroup >= onlyShowOver || !adaptiveZoom))

                console.log('refereshVisibleProperties3')
                console.log(Math.floor((Date.now() - start) / 1000))

        }, 1000))

    }

    useEffect(() => {
        refereshVisibleProperties()
    }, [adaptiveZoom])


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