import React, { useState } from 'react'
import { useMapEvent, useMapEvents } from 'react-leaflet';
import { Button } from './Button';

interface CopyButtonProps {
    text:string
}

const CopyButton = ({text}:CopyButtonProps) => {


    const [linkCopied, setLinkCopied] = useState<boolean>(false)
    /*const [isLocated, setIsLocated] = useState<boolean>(false)

    const map = useMapEvents({
        locationfound: (e:any) => {
            onLocate(e.latlng);
        }
    })*/
        
    const copyLink = () => {
        navigator.clipboard.writeText(text)
        setLinkCopied(true)

        setTimeout(() => {
            setLinkCopied(false)
        }, 3000)
    }

   /* const onLocate = (point:L.LatLng) => {
        map.flyTo(point, 16, { animate: false})
        setIsLocated(true)
    }*/

    return (
        <div id="use-my-location" className='w-full'>
         <Button className='min-w-fit' onClick={copyLink}>{!linkCopied ? 'Copy Link' : 'Link Copied!'}</Button>
        </div>
)
}

export {
    CopyButton
}