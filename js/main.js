// set this code outside a function so it can be used for multiple functions
// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiMTYwOTYzMjAiLCJhIjoiY2s4dnkxamxvMDU3ODNlcWpyM3QweGt3MiJ9.xGChlFq4ip4YHM98kQdt_g';

// Initialate map
var map = new mapboxgl.Map({
  	container: 'map',
  	style: 'mapbox://styles/16096320/ck8w7bzf831bw1iqkujnjgzxf',
	center: [4.322840, 52.067101],
 	zoom: 9,
});

map.addControl(new mapboxgl.NavigationControl());

function getWeatherdata(hours) {	
	
	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='c31e9ea428bc3ae268a005a6e136341f';

	map.on('click', function(e) {
		lon = e.lngLat.lng; //get the longitude by clicking
		lat = e.lngLat.lat; // get the latitude by clicking
		// construct request
		var request = url + '?' + 'lat=' + lat + '&' + 'lon=' + lon + '&appid='+ apiKey;
	// get current weather
		fetch(request)	
		
		// parse response to JSON format
		.then(function(response) {
			return response.json();
		})
		
		// do something with response
		.then(function(response) {

			
			// show full JSON object
			var weatherDesc = document.getElementById('boxWeather').innerHTML = response.weather[0].description;

			var weatherTemp = document.getElementById('boxTemp');
			var degC = Math.floor(response.main.temp - 273.15);
			weatherTemp.innerHTML = degC + '&#176;C';

			var weatherWind = document.getElementById('boxWind').innerHTML = "Wind speed: " + response.wind.speed + " m/s";

			var weatherMain = response.weather[0].main;
			var message;

			switch(weatherMain) {
				case 'Clear':
					message ='Safe';
					break;
				case 'Clouds':
					message ='Safe';
					break;
				case 'Rain':
					message ='Doubtful';
					break;
				case 'Drizzle':
					message ='Doubtful';
					break;
				case 'Mist':
					message ='Doubtful';
					break;
				case 'Fog':
					message ='Doubtful';
					break;
				case 'Snow':
					message ='Dangerous!';
					break;
				case 'Thunderstorm':
					message ='Dangerous!';
					break;
				case 'Sand':
					message ='Dangerous!';
					break;
				case 'Smoke':
					message ='Dangerous!';
					break;
				case 'Haze':
					message ='Dangerous!';
					break;
				case 'Dust':
					message ='Dangerous!';
					break;
				case 'Ash':
					message ='Dangerous!';
					break;
				case 'Squall':
					message ='Dangerous!';
					break;
				case 'Tornado':
					message ='Dangerous!';
					break;
				default:
					message ='Something went wrong.'; 
			}

			var weatherLand = document.getElementById('boxLand').innerHTML = 'Landing: ' + message;

		});
	});
}

function setMapStyle() {
	var date = new Date();
	var hours = date.getHours();
	// var hours = 12; // used for testing the change

	if(hours > 18 || hours < 8){
		//change the map style to custom map(nightmode) 
		map.setStyle('mapbox://styles/16096320/ck8w73m5f30pr1io1pv7pbwpu');
	}
	else {
		//cleave the map style to custom map(daymode)
		map.setStyle('mapbox://styles/16096320/ck8w7bzf831bw1iqkujnjgzxf');
	}
	setTimeout(setMapStyle, 1000);	// checks every second to change the map instantly
}

getWeatherdata();
setMapStyle();
