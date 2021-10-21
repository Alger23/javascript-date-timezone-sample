var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
var dayjs = require('dayjs');
dayjs.extend(utc)
dayjs.extend(timezone)

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
  "2021-01-03T12:00:00",
  "2021-01-04T00:00:00"
];

// 在不同時區時，解析的日期是不同的
console.log("== fromISO ==")
tzs.forEach( tz => {
  console.log("====" + tz)
  process.env.TZ = tz; 
  console.log(dates.map(date=> dayjs(date).format()));
});

// 在不同時區，加上Timezone 才能是正確的時間
console.log("== fromISO +08:00 ==");
[tz1,tz2,tz3].forEach( tz => {
  console.log("====" + tz)
  process.env.TZ = tz; 
  console.log(dates.map(date=> dayjs(date + "+08:00").format()))
});

console.log("===================");

// 未指定格式化時的時區，會造成看到的是時區的資料
tzs.forEach(tz=>{
  console.log("====" + tz);
  process.env.TZ = tz;
  console.log(
    dates.map(d=> dayjs(d+"+08:00"))
        .map(date=> date.format("yyyy-MM-DD HH:mm:ss"))
  );
});


console.log("===================");

// 指定時區輸出才能都是相同的
tzs.forEach(tz=>{
  console.log("====" + tz);
  process.env.TZ = tz;
  console.log(
    dates.map(d=> dayjs(d+"+08:00"))
        .map(date=> date.tz(tz2).format("yyyy-MM-DD HH:mm:ss"))
  );
});