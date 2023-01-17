// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Fetcher } from '../../components/lib/Fetcher'
import Property from '../../components/Property'
import PropertyWithUsages from '../../components/PropertyWithUsage'
import PropertyWithUsageGenerator from '../../components/PropertyWithUsageGenerator'
import Usage from '../../components/Usage'

/**
 * Api called by the update-script (yarn run update-data) to update the json data file.
 * The generated json file is then committed to deploy the new data
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropertyWithUsages[]>
) {

  if(!process.env.BASE_API_URL){ throw new Error('no process.env.BASE_API_URL')}

  const fetcher = new Fetcher(process.env.BASE_API_URL)
  // const chargesApply = _.groupBy(propertiesToReturn, (p) => p.averageUsage > 900 ? 'charges_apply' : 'no_charge')

  // console.log(`charges apply: ${chargesApply.charges_apply?.length} \nno charge(${chargesApply.no_charge?.length}) \n${chargesApply.charges_apply.length / propsWithUsage.length}`)
  res.status(200).json(await fetcher.get())
}
