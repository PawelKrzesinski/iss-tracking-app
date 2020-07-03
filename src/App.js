import React from 'react';
import './App.css';
import L from 'leaflet';
import {Map, TileLayer, Marker} from 'react-leaflet';
import axios from 'axios';

const myIcon = L.icon({
	iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/200px-International_Space_Station.svg.png',
	iconSize: [50, 32],
	iconAnchor: [25, 16],
})


class App extends React.Component{
	state = {
		lat: "",
		lng: "",
		zoom: 3,
	}
	
	componentDidMount(){
		this.getPosition();
		setInterval(this.getPosition ,5000)	
		console.log("New Data");
	};

	getPosition = () =>{
		axios.get("http://api.open-notify.org/iss-now.json")
		.then((response) => {
			const {longitude, latitude} = response.data.iss_position;
			this.setState({lng: longitude,
						   lat: latitude})
		})	
	}

	render(){
		const position = [this.state.lat, this.state.lng]
		return(
			<div className="App">
				<h1>International Space Station is currently at:</h1>
				<h3>Longitude: {this.state.lng}</h3>
				<h3>Latitude: {this.state.lat}</h3>
			    <Map className="map" center={position} zoom={this.state.zoom}>
        			<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={position} icon={myIcon}>

					</Marker>
				</Map>
			</div>
		)
	}
		
}

export default App;
