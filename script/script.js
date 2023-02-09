let currentDate = new Date();
let cHrs = currentDate.getHours().toString().padStart(2, '0');
let cMin = currentDate.getMinutes().toString().padStart(2, '0');
let cSec = currentDate.getSeconds().toString().padStart(2, '0');
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth();
let cYear = currentDate.getFullYear();

var monthArr = ["Jan", "Feb", "March", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

console.log(currentDate);
console.log(cHrs);
console.log(cMin);
console.log(cSec);
console.log(cDay);
console.log(cMonth);
console.log(cYear);


setInterval(() => {
    let timeVal = document.querySelector('#time');
    timeVal.innerText = `${cHrs}:${cMin}:${cSec}`
    let dateVal = document.querySelector('#date');
    dateVal.innerText = `${cDay} ${monthArr[cMonth]} ${cYear}`
}, 1000);