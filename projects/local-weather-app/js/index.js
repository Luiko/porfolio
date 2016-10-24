"use strict";

var imgObjs = [{
  url: "http://s33.postimg.org/e34k1mqtb/clear.jpg",
  words: ["Clear", "Sunny"]
}, {
  url: "http://s33.postimg.org/6zermf8sf/cloudy.jpg",
  words: ["Clouds", "Cloudy"]
}, {
  url: "http://s33.postimg.org/s8sqmetdr/drizzle.jpg",
  words: ["Drizzle"]
}, {
  url: "http://s33.postimg.org/e0p9sjcjj/rain.jpg",
  words: ["Rain"]
}, {
  url: "http://s33.postimg.org/vtk0rw8jj/mist.jpg",
  words: ["Mist"]
}, {
  url: "http://s33.postimg.org/u25alla9r/snowfall.png",
  words: ["Snow", "Snofall", "Freezing"]
}, {
  url: "http://s33.postimg.org/zfl8qspj3/smoke.jpg",
  words: ["Smoke"]
}, {
  url: "http://s33.postimg.org/hfptrn1hb/thunderstorm.jpg",
  words: ["Thunderstorm", "Storm"]
}, {
  url: "http://s33.postimg.org/m1vlauipr/haze.jpg",
  words: ["Haze"]
}, {
  url: "http://s33.postimg.org/55t0vrd4v/fog.jpg",
  words: ["Fog"]
}];
var lat, long;
var apiKey = '5ff1c6c6a3ec004c7a1acd5f13e8f60e';
var temp = null;
function getImgObj(weather) {
  //could be better
  var url = "none";
  imgObjs.forEach(function (imgObj) {
    if (imgObj.words.some(function (word) {
      return word == weather[0].main;
    })) url = imgObj.url;
  });
  if (url === 'none') {
    return 'http://s33.postimg.org/e34k1mqtb/clear.jpg';
  }
  return url;
}
$(document).ready(function () {
  $.ajax({
    url: 'http://ip-api.com/json',
    success: function success(ipdata) {
      $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + ipdata['lat'] + '&lon=' + ipdata['lon'] + '&APPID=' + apiKey,
        success: function success(data) {
          temp = data.main.temp - 273.15;
          $('body').css({
            'background-image': 'url(' + getImgObj(data.weather) + ')',
            'background-size': '100%'
          });
          $('h1').text('Local Weather App');
          $('#location').text(ipdata['city'] + ', ' + ipdata['region'] + ', ' + ipdata['country']);
          $('#temp').text(Math.round(temp) + '°C');
          $('button').text('to Fahrenheit');
          $('#weather').text(data.weather[0].main);
          $('#humidity').text('Humidity ' + data.main.humidity + '%');
          $('#wind').text('Wind speed ' + data.wind.speed + ' m/s');
          $('footer').html('&copy 2016 Luiko Was Here.');
        },
        cache: false
      });
    },
    cache: false
  });
});
$('button').click(function () {
  var sign;
  if ($('button').text() == 'to Fahrenheit') {
    temp = temp * (9 / 5) + 32;
    $('button').text('to Celsius');
    sign = '°F';
  } else {
    temp = (temp - 32) / (9 / 5);
    $('button').text('to Fahrenheit');
    sign = '°C';
  }
  $('#temp').text(Math.round(temp) + sign);
});
//test Objects below here
var locationTest = [{
  city: "Cabo San Lucas",
  lat: 22.9216,
  long: -109.9264
}, {
  city: "Ciudad de Mexico",
  lat: 19.4406,
  long: -99.1527
}, {
  city: "Las Vegas",
  lat: 39.1754,
  long: -115.1385
}, {
  city: "Sunland CA",
  lat: 34.2622,
  long: -118.3239
}, {
  city: "Houston TX",
  lat: 29.8075,
  long: -95.3959
}, {
  city: "Nueva Orleans, LS",
  lat: 29.9151,
  long: -90.0785
}, {
  city: "Tierra del Fuego, Argentina",
  lat: -54.7779,
  long: -68.3175
}, {
  city: "Dubai Emiratos Arabes Unidos",
  lat: 25.2310,
  long: 55.2651
}, {
  city: "Bergen, Noruega",
  lat: 60.3911,
  long: 5.3244
}, {
  city: "Munich, Alemania",
  lat: 48.1314,
  long: 11.5823
}, {
  city: "Libia",
  lat: 27.0385,
  long: 14.4359
}, {
  city: "Krasnosyarsk Rusia",
  lat: 79.7174,
  long: 95.7598
}];
var jsonTestObjs = [{
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "clear sky",
    "main": "Clear"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "fog",
    "main": "Fog"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "heavy intensity rain",
    "main": "Rain"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "overcast clouds",
    "main": "Clouds"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "scattered clouds",
    "main": "Clouds"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "mist",
    "main": "Mist"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "haze",
    "main": "Haze"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "smoke",
    "main": "Smoke"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "broken clouds",
    "main": "Clouds"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "moderate rain",
    "main": "Rain"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "thunderstorm",
    "main": "Thunderstorm"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "shower rain",
    "main": "Rain"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "description": "few clouds",
    "main": "Clouds"
  }],
  "wind": {
    "speed": 1
  }
}, {
  "main": {
    "humidity": 0,
    "temp": 30
  },
  "weather": [{
    "main": "Snow"
  }],
  "wind": {
    "speed": 1
  }
}];