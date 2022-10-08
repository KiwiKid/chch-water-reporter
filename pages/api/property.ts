// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Property from '../Property'
import PropertyWithUsages from '../PropertyWithUsage'
import PropertyWithUsageGenerator from '../PropertyWithUsageGenerator'
import Usage from '../Usage'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropertyWithUsages[]>
) {

  const propertiesResponse = await fetch('http://192.168.1.5:1888/chch-water-property/all')
  const propertyRaw = await propertiesResponse.json()
    
  const properties = propertyRaw.property.map((p:Property) => new Property(p))

  const usagesResponse = await fetch('http://192.168.1.5:1888/chch-water-usage/all')
  const usagesRaw = await usagesResponse.json();
  const usages = usagesRaw.usages.map((p:Usage) => new Usage(p));

  const joiner = new PropertyWithUsageGenerator(properties, usages)
  const propsWithUsage = joiner.getPropertyUsages()
  res.status(200).json(propsWithUsage)
}
