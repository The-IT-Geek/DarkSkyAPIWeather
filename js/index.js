var data;
if (!navigator.geolocation) {
  alert("Geolocation is not supported by this browser!");
}
//This will make appear a pop up asking for permission
navigator.geolocation.getCurrentPosition(showPosition, error);

//In case the permission is granted
function showPosition(position) {
  data = position;
  pos();
}

//In case the permission is denied
function error() {
  alert(
    "Unable to retrieve your location! Allow the browser to track your location!"
  );
}

var weatherdata;
var forecast;
var lat;
var lon;
function pos() {
  lat = data.coords.latitude;
  lon = data.coords.longitude;
  console.log(data.coords.latitude);
  console.log(data.coords.longitude);
  $.getJSON(
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      data.coords.latitude +
      "," +
      data.coords.longitude +
      "&key=AIzaSyBI3HG3-O61_scaYb-UafgD1ItAVNqry9Q",
    function(weather) {
      weatherdata = weather;
      $("#currentLocation").html(
        weather.results[0].address_components[1].long_name +
          ", " +
          weather.results[0].address_components[2].long_name
      );
    }
  );

  //get darksky api data
  $.getJSON(
    "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/debe674fa6a703aceaaae6772143e04f/" +
      data.coords.latitude +
      "," +
      data.coords.longitude +
      "?units=si",
    function(apiData) {
      forecast = apiData;
      $("#currentTemp").html(Math.floor(apiData.currently.temperature) + "°C");
      $("#currentWeather").html(apiData.currently.summary);
      $("#low").html(
        "Low: " + Math.floor(apiData.daily.data[0].temperatureMin) + "°C"
      );
      $("#high").html(
        "High: " + Math.floor(apiData.daily.data[0].temperatureMax) + "°C"
      );
      
      //skycons
      var skycons = new Skycons({"color": "white"});
      if(apiData.currently.icon=='clear-day'){
        skycons.add("icon1", Skycons.CLEAR_DAY);
      } else if(apiData.currently.icon=='clear-night'){
        skycons.add("icon1", Skycons.CLEAR_NIGHT);
      } else if(apiData.currently.icon=='rain'){
        skycons.add("icon1", Skycons.RAIN);
      } else if(apiData.currently.icon=='snow'){
        skycons.add("icon1", Skycons.SNOW);
      } else if(apiData.currently.icon=='sleet'){
        skycons.add("icon1", Skycons.SLEET);
      } else if(apiData.currently.icon=='wind'){
        skycons.add("icon1", Skycons.WIND);
      } else if(apiData.currently.icon=='fog'){
        skycons.add("icon1", Skycons.FOG);
      } else if(apiData.currently.icon=='cloudy'){
        skycons.add("icon1", Skycons.CLOUDY);
      } else if(apiData.currently.icon=='partly-cloudy-day'){
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
      } else if(apiData.currently.icon=='partly-cloudy-night'){
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
      } else if(apiData.currently.icon=='hail'){
        skycons.add("icon1", Skycons.HAIL);
      } else if(apiData.currently.icon=='thunderstorm'){
        skycons.add("icon1", Skycons.THUNDERSTORM);
      } else if(apiData.currently.icon=='tornado'){
        skycons.add("icon1", Skycons.TORNADO);
      } else{
        console.log('NOPE');
      }
      
      
      skycons.play();
      var currentDate = new Date(),
          day = currentDate.getDate(),
          month = currentDate.getMonth()+1,
          year = currentDate.getFullYear();
      $('.date').html('</br><strong>'+day+'/'+month+'/'+year+'</strong>');
    }
  );
}