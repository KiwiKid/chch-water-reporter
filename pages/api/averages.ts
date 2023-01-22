


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PropertyWithUsages[]>
  ) {  
    
    
    res.status(200).json(await fetcher.get())
  }
  