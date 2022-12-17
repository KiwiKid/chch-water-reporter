import { LatLng } from "leaflet";
import React, { useCallback, useEffect, useState } from "react";
import { FeatureGroup, LayerGroup, LayersControl, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import PropertyCircleMarker from '../components/PropertyCircleMarker'
import PropertyWithUsages, { CircleSizes } from "./PropertyWithUsage";

type MapLayerProps = {
    properties:PropertyWithUsages[]
   // onlyShowOver:number
    adaptiveZoom:boolean
}

const MapLayer = ({properties, adaptiveZoom}:MapLayerProps) => {

    let [visibleProperties, setVisibleProperties] = useState<PropertyWithUsages[]>()

    let [propTimeout, setPropTimeout] = useState<any>();

    const map = useMap();
    
    
    /* {
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
/*
    useEffect(() => {
        refereshVisibleProperties()
    }, [adaptiveZoom, refereshVisibleProperties])
*/

return (
    <FeatureGroup>
        {!properties ? null : properties
            .map((p) =>     {
                let circleSize = p.circleSizes[(map.getZoom().toString() as keyof CircleSizes)] || 1
                return (<PropertyCircleMarker key={`${p.property.id}`} p={p} circleSize={circleSize}/>)
            })}
    </FeatureGroup>
    )
}

export {
    MapLayer
}