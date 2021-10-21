//import {format,parse} from "date-fns";
//import {utcToZonedTime} from "date-fns-tz";
const { format, parseISO } = require('date-fns');
const { utcToZonedTime } = require("date-fns-tz");

const formatInTimeZone = (date, fmt, tz) =>
  format(
    utcToZonedTime(date, tz),
    fmt,
    { timeZone: tz });

let tz1 = "Asia/Taipei";
let tz2 = "America/Montserrat";
let tz3 = "Asia/Bangkok";
let tz4 = 'Asia/Kolkata';

let tzs = [tz1, tz2, tz3, tz4];

console.log(process.env.TZ); // undefined
console.log(new Date().toString()); // Thu Oct 21 2021 11:06:26 GMT+0800 (台北標準時間)
tzs.forEach(tz => {
  process.env.TZ = tz; // not my timezone
  console.log(new Date().toString());
});
/*
Thu Oct 21 2021 11:06:26 GMT+0800 (台北標準時間)
Wed Oct 20 2021 23:06:26 GMT-0400 (大西洋標準時間)
Thu Oct 21 2021 10:06:26 GMT+0700 (中南半島時間)
Thu Oct 21 2021 08:36:26 GMT+0530 (印度標準時間)
*/


const dates = [
  "2021-01-03T00:00:00",
  "2021-01-03 04:00:00",
  "2021-01-03 08:00:00",
  "2021-01-03 12:00:00",
  "2021-01-03 16:00:00",
  "2021-01-03 20:00:00",
  "2021-01-04 00:00:00"
];

tzs.forEach(tz => {
  console.log("====" + tz)
  process.env.TZ = tz;
  console.log(dates.map(date => parseISO(date)));
});



console.log("== add +08:00 ==");
[tz1, tz2, tz3].forEach(tz => {
  console.log("====" + tz)
  process.env.TZ = tz;
  console.log(dates.map(date => parseISO(date + "+08:00")));
});

console.log("===================");

[tz1, tz2, tz3].forEach(tz => {
  console.log("====" + tz);
  process.env.TZ = tz;
  console.log(
    dates.map(d => parseISO(d + "+08:00"))
      .map(date => format(date, "yyyy-MM-dd HH:mm:ss", tz2))
  );
});


console.log("===================");

[tz1, tz2, tz3].forEach(tz => {
  console.log("====" + tz);
  process.env.TZ = tz;
  console.log(
    dates.map(d => parseISO(d + "+08:00"))
      .map(date => formatInTimeZone(date, "yyyy-MM-dd HH:mm:ss", tz2))
  );
});

