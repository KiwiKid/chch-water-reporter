import React, { useMemo } from 'react';
import { useProperties } from './lib/useProperties'
import { useMap } from 'react-leaflet';
import PropertyWithUsages from './PropertyWithUsage';

// @ts-ignore
import {HeatmapLayer} from 'react-leaflet-heatmap-layer-v3'


interface Props {
  properties:PropertyWithUsages[]
}
const MyHeatmapLayer = () => {
 // console.log('\n\nMyHeatmapLayerMyHeatmapLayer\n\n')
    const map = useMap();
    const { properties, propertyCount, showingPropertyCount, status, isMapLoading, onlyShowOver } = useProperties({
      exculdeZeroUsage: true,
      mapBounds: map.getBounds(),
      mapZoom: map.getZoom(), 
      adaptiveZoom: true,
      nonMap: false
    })
    const rendered = properties.slice(0, 100)
  //  console.log(properties)

    return <HeatmapLayer
    fitBoundsOnLoad
    fitBoundsOnUpdate
    points={rendered}
    longitudeExtractor={(m:PropertyWithUsages) => m.property.lat}
    latitudeExtractor={(m:PropertyWithUsages) => m.property.lng}
    intensityExtractor={(m:PropertyWithUsages) => m.averageUsage}
  />
  return <></>
}

export {
    MyHeatmapLayer
}