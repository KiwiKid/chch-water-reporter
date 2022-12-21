import React from 'react'
import { CopyBox } from './utils/CopyBox'

interface ShareUrlProps {
  url:string
}

const ShareUrl = ({url}:ShareUrlProps) => {

    return <div className={`grid grid-cols-1 md:grid-cols-2 pt-4 border border-black p-2`}>
    {/*<div className="">
      <CopyBox id="locatedCopy" copyText={`${url}`} promptText="Copy link" successText="Link has been copied!"/>
      mapIsLocated ? <div className="text-center">🚨 This link includes your current location 🚨</div>: undefined  
    </div>*/}
    <div className="">
      <CopyBox id="basicCopy" copyText={`${url}`} promptText="Copy link to page" successText="Link copied" />
    </div>
  </div>
}


export {
    ShareUrl
}