let icons = document.querySelectorAll('.icon img');
let weekDate = document.querySelectorAll('.week-date');
let allTemp = document.querySelectorAll('.temp');
let allTemp2 = document.querySelectorAll('.temp2');
let humidity = document.querySelectorAll('.humidity');
let windSpeed = document.querySelectorAll('.wind-speed');
let search = document.querySelector('.search');
let searchBtn = document.querySelector('.fa-search');
let city = document.querySelector('#city h4');

search.addEventListener("keydown",(event)=>{
    if(event.keyCode===13){
        get_coord(event.target.value);
        city.innerText = event.target.value.toString().toLowerCase();
    }
});
searchBtn.addEventListener("click",(event)=>{
    get_coord(search.value);
    city.innerText = search.value.toString().toLowerCase();
    // console.log(search.value);
});
// console.log(humidity[0]);

// console.log(icons[1]);

window.addEventListener('load', () => {
    const preload = document.querySelector(".loader-wrapper");
    preload.setAttribute("style", "opacity:0;pointer-events:none;");
});



var weathercodes = [
    [0,1,2,3,48,51,45,53,55,56,57,61,63,65,66,67,71,73,75,77,80,81,82,85,86,95,96,99],
    ["images/animated/day.svg","images/animated/cloudy-day-1.svg","images/animated/cloudy-day-2.svg","images/animated/cloudy-day-3.svg","images/animated/cloudy.svg",
    ,"images/animated/rainy-1.svg","images/animated/cloudy.svg","images/animated/rainy-2.svg","images/animated/rainy-3.svg","images/animated/rainy-7.svg","images/animated/rainy-7.svg","images/animated/rainy-4.svg","images/animated/rainy-5.svg","images/animated/rainy-6.svg","images/animated/rainy-7.svg","images/animated/rainy-7.svg","images/animated/snowy-1.svg","images/animated/snowy-2.svg","images/animated/snowy-3.svg","images/animated/snowy-6.svg","images/animated/rainy-4.svg","images/animated/rainy-5.svg","images/animated/rainy-6.svg","images/animated/snowy-4.svg","images/animated/snowy-5.svg","images/animated/snowy-6.svg","images/animated/thunder.svg","images/animated/thunder.svg"]
]
// console.log("testing...")
// console.log(weathercodes[1][weathercodes[0].indexOf(65)]);
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
let currentDate;
let time;

setInterval(() => {
    currentDate = new Date();
    // console.log(currentDate.getHours());
    // console.log(currentDate.toLocaleDateString(undefined,options));
    document.querySelector('#date').innerText = currentDate.toLocaleDateString(undefined,options);
    time = currentDate.getHours().toString().padStart(2,'0')+":"+currentDate.getMinutes().toString().padStart(2,'0');
    document.querySelector('#time').innerText = time;
}, 1000);
currentDate = new Date();
let cHrs = currentDate.getHours();


// console.log("Hiiiii")
// console.log(cHrs);
// let cMin = currentDate.getMinutes().toString().padStart(2,'0');
// let cSec = currentDate.getSeconds().toString().padStart(2,'0');
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth();
let cYear = currentDate.getFullYear();
let apiDate = `${cYear}-${(cMonth+1).toString().padStart(2,'0')}-${cDay.toString().padStart(2,'0')}`
let apiEndDate = `${cYear}-${(cMonth+1).toString().padStart(2,'0')}-${(cDay+5).toString().padStart(2,'0')}`
// console.log("Hello!!!");
// console.log(apiDate)
var monthArr = ["Jan", "Feb", "March", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
// console.log(currentDate);
// console.log(cHrs);
// console.log(cMin);
// console.log(cSec);
// console.log(cDay);
// console.log(cMonth);
// console.log(cYear);



function get_coord(city_name){
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city_name}`).then(response => response.json()).then(json => get_data(json));
}

function get_data(xyz) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${xyz.results[0].latitude}&longitude=${xyz.results[0].longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,visibility,windspeed_10m,pressure_msl&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&start_date=${apiDate}&end_date=${apiEndDate}`).then(response => response.json()).then(json => _data(json));
}

get_coord("new delhi");

function _data(xyz){
    console.log(xyz.hourly);
    console.log(xyz.daily);
    if(xyz.daily.weathercode[0]===0){
        document.querySelector('body').setAttribute("style","background: linear-gradient(rgba(255, 255, 255, 0.151), rgba(30, 30, 30, 0.785)) padding-box, linear-gradient(to bottom, rgb(239, 120, 128), rgb(255, 204, 183), rgb(193, 76, 111), rgb(121, 63, 92)) border-box;background-repeat: no-repeat;background-attachment: fixed;")
        document.querySelector('#background').style.backgroundImage="url(images/Background.jpg)";
    }
    else if(xyz.daily.weathercode[0]===1 || xyz.daily.weathercode[0]===2 || xyz.daily.weathercode[0]===3 || xyz.daily.weathercode[0]===45 || xyz.daily.weathercode[0]===48){
        document.querySelector('body').setAttribute("style","    background: linear-gradient(rgba(255, 255, 255, 0.151), rgba(30, 30, 30, 0.785)) padding-box, linear-gradient(to bottom, rgb(80, 87, 107), rgb(126, 141, 160), rgb(52, 73, 90), rgb(184, 191, 194), rgb(59, 63, 26)) border-box;background-repeat: no-repeat;background-attachment: fixed;")
        document.querySelector('#background').style.backgroundImage="url(images/cloudy.jpg)"

    }
    else if(xyz.daily.weathercode[0]===2 || xyz.daily.weathercode[0]===2 || xyz.daily.weathercode[0]===2 || xyz.daily.weathercode[0]===2){

    }
    else if(xyz.daily.weathercode[0]===3){

    }
    for(var i=1;i<6;i++){
        // console.log(xyz.daily.weathercode[i]);
        // console.log(weathercodes[1][weathercodes[0].indexOf(xyz.daily.weathercode[i])])
        icons[i-1].setAttribute("src",weathercodes[1][weathercodes[0].indexOf(xyz.daily.weathercode[i])]);
    }
    document.querySelector('.precip').innerText = xyz.hourly.precipitation[cHrs];
    document.querySelector('.visibility').innerText = xyz.hourly.visibility[cHrs];
    document.querySelector('.pressure').innerText = xyz.hourly.pressure_msl[cHrs];
    document.querySelector('#sunrise').innerText = xyz.daily.sunrise[0].slice(11);
    document.querySelector('#sunset').innerText = xyz.daily.sunset[0].slice(11);
    document.querySelector('.pressure').innerText = xyz.hourly.pressure_msl[cHrs];
    windSpeed[0].innerText = xyz.hourly.windspeed_10m[cHrs];
    allTemp[0].innerText = xyz.hourly.temperature_2m[cHrs]+"??C";
    for(var i=1;i<6;i++){
        weekDate[i-1].innerText = xyz.daily.time[i];
        allTemp[i].innerText = xyz.daily.temperature_2m_max[i];
        allTemp2[i-1].innerText = xyz.daily.temperature_2m_min[i];
    }

    // console.log("testing");
    // console.log(xyz.hourly.temperature_2m[cHrs]);


    // updating parameters
    humidity[5].innerText = xyz.hourly.relativehumidity_2m[cHrs];

    for(var i=1;i<6;i++){
        humidity[i-1].innerText = xyz.hourly.relativehumidity_2m[(24*i)+cHrs];
    }   



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