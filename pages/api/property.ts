// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
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

  const serverUrl = process.env.BASE_API_URL

  const propertiesResponse = await fetch(`${serverUrl}/chch-water-property/all`)
  const propertyRaw = await propertiesResponse.json()

  console.log(`got ${propertyRaw.length} properties`)
    
  const properties = propertyRaw.property.map((p:Property) => new Property(p))

  const usagesResponse = await fetch(`${serverUrl}/chch-water-usage/all`)
  const usagesRaw = await usagesResponse.json();
  const usages = usagesRaw.usages.map((p:Usage) => new Usage(p));


  console.log(`got ${usages.length} usages`)

  const joiner = new PropertyWithUsageGenerator(properties, usages)
  const propsWithUsage = joiner.getPropertyUsages()

  const propertiesToReturn = propsWithUsage.filter((p) => p.usages.length !== 0)

  // const chargesApply = _.groupBy(propertiesToReturn, (p) => p.averageUsage > 900 ? 'charges_apply' : 'no_charge')

  // console.log(`charges apply: ${chargesApply.charges_apply?.length} \nno charge(${chargesApply.no_charge?.length}) \n${chargesApply.charges_apply.length / propsWithUsage.length}`)
  res.status(200).json(propertiesToReturn)
}
