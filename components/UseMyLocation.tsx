import React, { useState } from 'react'
import { useMapEvent, useMapEvents } from 'react-leaflet';
import { Button } from './Button';

const UseMyLocation = () => {

    const [isLocated, setIsLocated] = useState<boolean>(false)

    const map = useMapEvents({
        locationfound: (e:any) => {
            onLocate(e.latlng);
        }
    })
        
    const useMyLoc = () => {
        map.locate({ watch: false})
    }

    const onLocate = (point:L.LatLng) => {
        map.flyTo(point, 16, { animate: false})
        setIsLocated(true)
    }

    return (
        <div id="use-my-location" className='w-full'>
            {/*<label className="h-4 hidden" htmlFor="ViewAllButton">Request GPS location:</label>
            <HomepageLink 
                homepage={pageState.homepage}
                setHomepagePromptVisible={setHomepagePromptVisible}
            />
            <InternalLink
                id="ViewAllButton"
                    onClick={() => triggerViewAll()}  
                    linkClassName="border-b-4 border-green-800 bg-green-500 w-3/4 h-12 px-6 text-green-100 transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-green-800"
                    widthClass="w-full"
                    >View All</InternalLink>
            <label className="h-4 hidden" htmlFor="NearMeButton">Request GPS location:</label>
            <InternalLink
                id="NearMeButton"
                onClick={() => setLocationPromptVisible(true)}  
                linkClassName="w-full border-b-4 border-green-800 bg-green-500 w-3/4 h-12 px-6 text-green-100 transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-green-800"
                widthClass="w-full"
    >Near Me</InternalLink>*/}
        <Button className='min-w-fit' onClick={useMyLoc}>Use My Location</Button>
    </div>
)
}

export {
    UseMyLocation
}