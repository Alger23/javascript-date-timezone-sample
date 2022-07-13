const moment = require("moment-timezone");
require( 'moment/locale/zh-tw');

let tz1 = "Asia/Taipei";
let tz2 = "America/Montserrat";
let tz3 = "Asia/Bangkok";
let tz4 = 'Asia/Kolkata';

let tzs = [tz1, tz2, tz3, tz4];

let date = "2021-01-03T00:00:00Z";

tzs.forEach(tz => {
    // process.env.TZ = tz; // not my timezone
    console.log(moment(date).tz(tz).format("yyyy-MM-DD HH:mm:ss"));
});

// 取得時區列表
const names = moment.tz.names();
names.forEach((name, i) => {
    console.log(moment(date).tz(name).format("yyyy-MM-DD HH:mm:ss"), i, name);
});

// let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
// if (!tz) {
//   tz = "UTC";
// }
// timeZone: tz,
