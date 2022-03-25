/*global google*/
import React, { useState } from 'react'
import {
    GoogleMap, 
    withScriptjs, 
    withGoogleMap,
    Marker,
    DirectionsRenderer
  } from 'react-google-maps'
import icon from "../icons/wheel.png"
import iconTwo from "../icons/rectangle.png" 
const styles = require('../GoogleMapStyles.json');

function Map(props){
    const DirectionsService = new google.maps.DirectionsService();

    var polylineOptionsActual = new google.maps.Polyline({
        strokeColor: '#ffe200',
        strokeOpacity: 0,
        strokeWeight: 5,
    });

    let [directions, setDirections] = useState(null);

    const firedata = [
        { 
            "id": 1,
            "name": "The driver location",
            "lat": props.driverLat,
            "lng": props.driverLng,
            "icon": icon
        },
      
        { 
            "id":2,
            "name": "The package location",
            "lat": props.packageLat,
            "lng": props.packageLng,
            "icon": iconTwo      
        },
      ]

    const origin = new google.maps.LatLng(props.driverLat, props.driverLng);
    const destination = new google.maps.LatLng(props.packageLat, props.packageLng);
    
   

    DirectionsService.route(
      {
        origin: origin,
        destination: destination ,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  
    return(
        <GoogleMap 
          defaultZoom={15} 
          defaultCenter={{lat: -26.118146918442047, lng: 27.88959632144963}}  
          defaultOptions={{
            disableDefaultUI: true,
            draggable: true,
            scaleControl: true,
            scrollwheel: true,
            styles: styles
          }}
          style={{borderRadius:"10px"}}
        >
          
            <DirectionsRenderer 
              directions={directions}
              options={{ 
                suppressMarkers: true, 
                polylineOptions: polylineOptionsActual
              }}
            />
  
            {/* <Marker position={origin} />
            <Marker position={destination} /> */}
  
            {firedata.map(place =>(
              <Marker
                key={place.id}
                position={{
                  lat: place.lat,
                  lng: place.lng
                }}
                icon={place.icon}
              />
            ))}
  
        </GoogleMap>
    )
  }
  
  const WrappedMap = withScriptjs(withGoogleMap(Map));
  export default WrappedMap