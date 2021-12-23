import React,{ useEffect, useState } from 'react'
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const LocationMap = ({lon, lat}: {lon: number|undefined|null, lat: number|undefined|null}) => {
    const [loaded, setLoaded] = useState(false);
    const [acessKeyLoaded, setAccessKeyLoaded] = useState(false);

    useEffect(() => {
      mapboxgl.accessToken ="pk.eyJ1Ijoid2FubmFkYyIsImEiOiJjazBja2M1ZzYwM2lnM2dvM3o1bmF1dmV6In0.50nuNnApjrJYkMfR2AUpXA";
      setAccessKeyLoaded(true);
    }, [])

    useEffect(() => {
      if(acessKeyLoaded) {
        console.log(process.env.KEY)
        new mapboxgl.Map({
          container: "my-map",
          style: "mapbox://styles/mapbox/streets-v10",
          center: [lon, lat],
          zoom: 11,
        });
      }
        setLoaded(true);
      }, [acessKeyLoaded]);

      if(loaded) return <div id="my-map"></div>
      else return <div>map is laoding...</div>
}

export default LocationMap
