function successFunction(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log('Your latitude is :'+lat+' and longitude is '+long);
  sessionStorage.setItem('lat', lat);
  sessionStorage.setItem('long', long);
}

function errorFunction() {
  console.error('Error!');
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} else {
  console.error('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}

const APP = {
  TOKEN: 'pk.406422e2e1885dda468a42c370f8fbc0',
  SEARCHURL: `https://us1.locationiq.com/v1/search.php?format=json&`,
  REVERSEURL: `https://us1.locationiq.com/v1/reverse.php?format=json&`,
  MAPURL: `https://maps.locationiq.com/v3/staticmap?`,
  data: null,
  init: () => {
      APP.doReverse;
      console.log("init");
  },
  showSearchResults: () => {
    //display the results of the search
    console.log(APP.data);
    let section = document.querySelector('.results');
    let pre = section.querySelector('pre');
    if (!pre) {
      pre = document.createElement('pre');
      section.append(pre);
    }
    //just dump the data response into the <pre> element
    //just the first result from the array
    pre.textContent = JSON.stringify(APP.data, null, 2);
  },
  doReverse: (ev) => {
    ev.preventDefault();
    var lat = sessionStorage.getItem('lat');
    var long = sessionStorage.getItem('long');
    //build url
    //let url = "https://us1.locationiq.com/v1/reverse.php?format=json&key=pk.406422e2e1885dda468a42c370f8fbc0&lat="+ lat +"&lon="+ long;
    let url = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ long +"&appid=2d3575bd2805d5b9687f3320c778f5ec&units=metric";
    console.log(url);
    //do a reverse geocoding call
    //save the results in a global location
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        APP.data = data; //no [0]
        APP.showSearchResults();
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

document.addEventListener('DOMContentLoaded', APP.doReverse);