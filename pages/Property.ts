import { LatLngExpression, Point } from 'leaflet'
import transformation from 'transform-coordinates'


type PropertyStatus = 'success'|string

type PropertyProps = {
  id:number
  status:PropertyStatus
  StreetAddressID:string
  FullStreetAddress:string
  FullPostalAddress:string
  RatingUnitID:string
  lat:number
  lng:number
  raw:string
  last_usage_update:Date
}

class Property {
  id:number
  status:"success"|"unknown"|string
  message?:string
  StreetAddressID:string
  FullStreetAddress:string
  FullPostalAddress:string
  RatingUnitID:string
  lat:number
  lng:number
  raw:string
  last_usage_update:Date
  point:LatLngExpression

  constructor({id, status, StreetAddressID, FullStreetAddress, FullPostalAddress, RatingUnitID, lat, lng, raw, last_usage_update}:PropertyProps) {

    this.id = id;
    this.status = status;
    this.StreetAddressID = StreetAddressID;
    this.FullStreetAddress = FullStreetAddress;
    this.FullPostalAddress = FullPostalAddress;
    this.RatingUnitID = RatingUnitID;
    this.lat = lat;
    this.lng = lng;

    const transform = transformation("EPSG:2193", "EPSG:4326")

    const projectedLatLng = transform.forward([lat,lng])
    console.log(`${projectedLatLng[1]} ${projectedLatLng[0]}`)
    this.point = [projectedLatLng[1], projectedLatLng[0]] as LatLngExpression
    this.raw = raw;
    this.last_usage_update = last_usage_update;
   // this.geoJSON = JSON.parse(raw).Geometry

  }
}

export default Property
