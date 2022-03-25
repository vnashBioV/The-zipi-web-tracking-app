/*global google*/
import React, { useState } from 'react'

import styled from 'styled-components'
import firebase from "./firebaseConfig"
import WrappedMap from './components/Map'
import './App.css';
import driverIcon from './icons/user.png';
import carIcon from './icons/Icon-awesome-car.png'
import callIcon from './icons/call-icon.png'
import zipilogo from './icons/we-tracking-logo.png'

//Global variables
const driverData = []
const packageData = []
let packuid = "";
// let driverlat = "-26.118146918442047";
// let driverlng = "27.88959632144963";



export default function App() {
  const [uid, setUid] = useState("");
  const [packageUid, setPackageUid] = useState("");
  const usingvar = "jfgp7W6dbAMakCE7x0MiS9ncMm02";
  const [driverLat, setDriverLat] = useState("");
  const [driverLng, setDriverLng] = useState("");
  const [packageLat, setPackageLat] = useState("");
  const [packageLng, setPackageLng] = useState("");
  const [driverName, setDriverName] = useState("Driver Name");
  const [carRegistration, setCarRegistration] = useState("Car Registration");
  const [driverNumber, setDriverNumber] = useState(0);
  const [driverImg, setDriverImg] = useState(driverIcon);

  const getdata = (e) => {
    e.preventDefault();
    firebase.database().ref('drivers/' + uid).once("value", snap => {
      driverData.push(snap.val())
      setDriverLat(driverData[0].current_coorddinates.latitude);
      setDriverLng(driverData[0].current_coorddinates.longitude);
      setDriverName(driverData[0].midName);
      setDriverImg(driverData[0].img);
      // packuid = (driverData[0].current_package_ref);
      setCarRegistration(driverData[0].plateNum);
      setDriverNumber(driverData[0].cellPhone);
      // console.log(driverData[0].current_package_ref);
      console.log(driverData[0].current_coorddinates.latitude)
      console.log(driverData[0].current_coorddinates.latitude)

    }).then(() =>{
      firebase.database().ref('newReq/' + driverData[0].current_package_ref).once("value", snap => {
        packageData.push(snap.val());
        console.log(driverData[0].current_package_ref);
        setPackageLat(packageData[0].pu_coords.lat);
        setPackageLng(packageData[0].pu_coords.lng);
        console.log(packageData[0].pu_coords.lat)
        console.log(packageData[0].pu_coords.lng)
      })
    })

  
  }

  console.log(packageUid)

  

  const MapContainer = styled.div`
    width:88vw;
    height:95vh;
    margin:auto;
    border-radius:15px;
    overflow: hidden;
  `

  const Container = styled.div`
    width:55%;
    display:flex;
    height:155px;
    margin:auto;
  `
  const Search = styled.input`
    padding: 5px 10px;
    margin: auto;
    width: 75%;
    border-radius: 10px 0px 0px 10px;
    border: 1.7px solid #bdbdbd;
    border-right: none;
    height: 36px;
  `
  const SearchBtn = styled.button`
    padding: 15px 10px;
    margin: auto;
    width: 25%;
    border-radius: 0px 10px 10px 0px;
    border: transparent;
    height: 50px;
    background:#ffe200;
    cursor:pointer;
    font-weight:bold;
  `

  const DriverInfo = styled.div`
    width:50px;
    width: 293px;
    height: 85px;
    background-color: #fff;
    position: absolute;
    display: flex;
    // justify-content: center;
    // align-items: center;
    left: 50%;
    top: 65%;
    padding:30px;
    border-radius:10px;
    transform: translate(-50%, 100%);
    z-index: 99;
    flex-direction: column;
  `

  return (
    <div style={{position:"relative"}}>
      <div 
          style={{
            position:"absolute",
            top:"0px", 
            zIndex:"99",
            left:"7%",
            borderRadius:"0px 0px 16px 16px",
          }}
        >
          <img 
            src={zipilogo} 
            alt="" 
            style={{
              borderRadius:"0px 0px 16px 16px",
            }}
          />
        </div>
      <DriverInfo className='driver-info'>
        <div style={{display:"flex"}}>
          <img className='driver-icon' src={driverImg} alt="" />
          <div>
            <h1>{driverName}</h1>
            <div style={{display:"flex", justifyContent:"flex-start", flexDirection:"row", alignItems:"center"}}>
              <img className='car-icon' src={carIcon} alt="" />
              <p>{carRegistration}</p>
            </div>
          </div>
        </div>
        
        <a 
            href={`tel:${driverNumber}`} 
            style={{
              margin:"auto",
              padding: "18px 0",
            }}
        >
            <img 
              src={callIcon} 
              style={{
                width:"40px",
                height:"40px", 
                borderRadius:"100%",
                margin:"auto",
              }} 
              alt="" />
          </a>
      </DriverInfo>

      <Container >
        <Search type="text" placeholder='Search Driver' onChange={e => setUid(e.target.value)}/>
        <SearchBtn onClick={getdata}>Get Driver Location</SearchBtn>
      </Container>

      
      
      <MapContainer>
        <WrappedMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{height:"100%"}}/>}
          containerElement={<div style={{height:"100%"}}/>}
          mapElement={<div style={{height:"100%"}}/>}
          driverLat={driverLat}
          driverLng={driverLng}
          packageLat={packageLat}
          packageLng={packageLng}
        />
      </MapContainer>
    </div>
  )
}

