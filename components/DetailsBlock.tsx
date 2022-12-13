    import React from 'react'
import { useState } from "react"
import { Button } from './Button'

interface Props {
    title: string
    children: any
}

const DetailsBlock = ({title, children}:Props) => {
    let [isOpen, setIsOpen] = useState<boolean>(false)

    if(!isOpen){
        return (<div onClick={() => setIsOpen(true)}>
            {title}
        </div>)
    }

    return (<>{children}<Button onClick={() => setIsOpen(false)}>close</Button></>)
}

export {
    DetailsBlock
}