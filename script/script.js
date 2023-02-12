let sunriseTime = document.querySelector('#sunrise');
let icons = document.querySelectorAll('.icon');

console.log(icons[1]);

window.addEventListener('load', () => {
    const preload = document.querySelector(".loader-wrapper");
    preload.setAttribute("style", "opacity:0;pointer-events:none;");
});

var weathercode = {
    0:"./images/day.svg",
    1:"./images/animated/cloudy-day-1",
    2:"./images/animated/cloudy-day-2",
    3:"./images/animated/cloudy-day-3",
    45:"./images/animated/cloudy",
    48:"./images/animated/cloudy",
    51:"./images/animated/rainy-1",
    53:"./images/animated/rainy-2",
    55:"./images/animated/rainy-3",
    56:"./images/animated/rainy-7",
    57:"./images/animated/",
    61:"./images/animated/",
    63:"./images/animated/",
    65:"./images/animated/",
    66:"./images/animated/",
    67:"./images/animated/",
    71:"./images/animated/",
    73:"./images/animated/",
    75:"./images/animated/",
    77:"./images/animated/",
    80:"./images/animated/",
    81:"./images/animated/",
    82:"./images/animated/",
    85:"./images/animated/",
    86:"./images/animated/",
    95:"./images/animated/",
    96:"./images/animated/",
    99:"./images/animated/"
};

// let currentDate = new Date();
// let cHrs = currentDate.getHours().toString().padStart(2,'0');
// let cMin = currentDate.getMinutes().toString().padStart(2,'0');
// let cSec = currentDate.getSeconds().toString().padStart(2,'0');
// let cDay = currentDate.getDate();
// let cMonth = currentDate.getMonth();
// let cYear = currentDate.getFullYear();

// var monthArr = ["Jan", "Feb", "March", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
// console.log(currentDate);
// console.log(cHrs);
// console.log(cMin);
// console.log(cSec);
// console.log(cDay);
// console.log(cMonth);
// console.log(cYear);

// let timeVal;
// let dateVal; 
// setInterval(() => {
//     timeVal = document.getElementById('time');
//     timeVal.innerText = `${cHrs}:${cMin}:${cSec}`
//     dateVal = document.getElementById('date');
//     dateVal.innerText = `${cDay} ${monthArr[cMonth]} ${cYear}`
// }, 1000);



function get_coord(city_name){
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city_name}`).then(response => response.json()).then(json => get_data(json));
}

function get_data(xyz) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${xyz.results[0].latitude}&longitude=${xyz.results[0].longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&start_date=2023-02-10&end_date=2023-02-15`).then(response => response.json()).then(json => _data(json));
}

get_coord("delhi");

function _data(xyz){
    console.log(xyz.daily.weathercode[1]);
}

// async function get_CoOrd(loc_name) {
    //     _loc_CoOrdinates = await (await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)).json();
    //     return _loc_CoOrdinates;
    // }


    // API
    
    // For latitude and longitude
    // `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
    
    // For Weather
    // `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&start_date=2023-02-10&end_date=2023-02-15`