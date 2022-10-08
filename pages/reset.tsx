import localforage from "localforage";
import { NextApiRequest, NextApiResponse, NextPage } from "next";
import { useEffect, useState } from "react";

const ResetPage: NextPage = () => {

  const [status, setStatus] = useState<string>('loading')
  const [error, setError] = useState<string>();

  useEffect(() => {
    localforage.setItem('property_cache', null)
      .then(() => {
        setStatus('success')
      })
      .catch((err) => {
        console.error(err)
        setStatus('failure')
        setError(JSON.stringify(err))
    })
  })
    

      return <>{status}{error}</>
  } 


  export default ResetPage
