//import {format,parse} from "date-fns";
//import {utcToZonedTime} from "date-fns-tz";
const {format, parseISO} = require('date-fns');
const {utcToZonedTime} = require( "date-fns-tz");

const formatInTimeZone = (date, fmt, tz) =>
    format(
      utcToZonedTime(date, tz),
      fmt,
      {timeZone: tz});

let tz1 = "Asia/Taipei";
let tz2 = "America/Montserrat";
let tz3 = "Asia/Bangkok";
let tz4 = 'Asia/Kolkata';

console.log(process.env.TZ); // undefined
console.log(new Date().toString()); // Tue Apr 21 2020 22:05:28 GMT+0100 (British Summer Time)
process.env.TZ = tz2; // not my timezone
console.log(new Date().toString()); // Wed Apr 22 2020 02:35:28 GMT+0530 (India Standard Time)
process.env.TZ = tz3; // not my timezone
console.log(new Date().toString()); // Wed Apr 22 2020 02:35:28 GMT+0530 (India Standard Time)
process.env.TZ = tz4; // not my timezone
console.log(new Date().toString()); // Wed Apr 22 2020 02:35:28 GMT+0530 (India Standard Time)


const dates = [
  "2021-01-03T00:00:00",
  "2021-01-03 04:00:00",
  "2021-01-03 08:00:00",
  "2021-01-03 12:00:00",
  "2021-01-03 16:00:00",
  "2021-01-03 20:00:00",
  "2021-01-04 00:00:00"
];

[tz1, tz2, tz3].forEach( tz => {
  console.log("====" + tz)
  process.env.TZ = tz; 
  dates.forEach(date=> console.log(parseISO(date )));
});

// console.log("====" + tz2)
// process.env.TZ = tz2; // not my timezone
// dates.forEach(date=> console.log(parseISO(date )));

console.log("== add +08:00 ==");
[tz1,tz2,tz3].forEach( tz => {
  console.log("====" + tz)
  process.env.TZ = tz; 
  dates.forEach(date=> console.log(parseISO(date + "+08:00")));
});

console.log("===================");

[tz1,tz2,tz3].forEach(tz=>{
  console.log("====" + tz);
  process.env.TZ = tz;
  console.log(
    dates.map(d=> parseISO(d+"+08:00"))
        .map(date=> format(date, "yyyy-MM-dd HH:mm:ss", tz2))
  );
});


console.log("===================");

[tz1,tz2,tz3].forEach(tz=>{
  console.log("====" + tz);
  process.env.TZ = tz;
  console.log(
    dates.map(d=> parseISO(d+"+08:00"))
        .map(date=> formatInTimeZone(date, "yyyy-MM-dd HH:mm:ss", tz2))
  );
});

