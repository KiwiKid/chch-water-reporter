import React from "react";

interface ButtonProps {
    children:any
    onClick:(e: React.MouseEvent<HTMLElement>) => void
    className?:string
}

function Button({children, onClick, className}:ButtonProps){
    
    return (<button className={` ${className} bg-gray-100 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center}`} onClick={onClick} style={{minHeight:'60px', minWidth:'150px'}}>
        {children}
  </button>)
}

export {
    Button
}