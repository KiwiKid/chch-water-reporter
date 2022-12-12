import React from "react";

interface ButtonProps {
    children:any
    onClick:any
}

export default function Button({children, onClick}:ButtonProps){
    
    return (<button onClick={onClick} style={{minHeight:'60px', minWidth:'200px'}} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        {children}
  </button>)
}