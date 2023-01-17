
import { Fetcher } from '../components/lib/Fetcher'

describe('Data processing', () => {
    it.skip('removes duplicates', async () => {
        if(!process.env.BASE_API_URL){ throw new Error("No process.env.BASE_API_URL")}
        let fetcher:Fetcher = new Fetcher(process.env.BASE_API_URL)


        let res = await fetcher.get()

        let seen = new Map()
        res.forEach((rs) => {
            let k = `${rs.averageUsage}${rs.property.lat}`
            if(seen.has(k)){
                throw new Error(`Duplicate found: \n${JSON.stringify(rs, undefined, 4)}\n\n\n\n AND: \n${JSON.stringify(seen.get(k), undefined, 4)}`)
            }else{
                seen.set(k, rs)
            }
        })


    }, 120000)

})