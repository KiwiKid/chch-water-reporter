import React from "react";


export default function About() {
  const [isPopped, setIsPopped] = React.useState<boolean>();
 
  return !isPopped ? 
    <div><button onClick={() => setIsPopped(true)}>About</button> </div>
    :
  <>
    <div><button onClick={() => setIsPopped(false)}>Close</button>This site is based on data via the </div>
  </>
   

}
