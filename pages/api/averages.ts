import { NextApiRequest, NextApiResponse } from "next"
import { Fetcher } from "../../components/lib/Fetcher"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {  
    if(!process.env.BASE_API_URL){
      throw new Error("no process.env.BASE_API_URL")
    }
    let fetcher:Fetcher = new Fetcher(process.env.BASE_API_URL)


    let metaData = await fetcher.getMeta()
    
    res.status(200).json(metaData)
  }
  
