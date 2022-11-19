import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import PropertyTiles from '../components/PropertyTiles'
import useWindowSize from './lib/useWindowSize';
import Controls from './Controls';



type LeafletMapProps = {
}


export default function LeafletMap({}:LeafletMapProps) {
 const startZoom = 13
 const {width, height} = useWindowSize()
return <>
  <style>{`
    .leaflet-container{
      height: 99vh;
      width: 101wh;
  `}</style><></>
    {width && height && <div style={{ "height": `${height}px`, "width": `${width}px`}}>
        <MapContainer preferCanvas={true} center={[-43.530975, 172.637780]} zoom={startZoom} ref={(ref) => { }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <PropertyTiles />
          <Controls/>
        </MapContainer>
    </div>}
  </>
}
