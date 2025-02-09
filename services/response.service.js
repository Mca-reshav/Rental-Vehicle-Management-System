const colors = require('colors');
const moment = require('moment');
colors.enable();

exports.tokenLog = (token) => {
    console.log(`[SUCCESS] :: ${token}`.bgBlack);
};

exports.success = (success = true, msg = '', data = {}) => {
    if (success) console.log(`[SUCCESS] :: ${msg}`.green);
    else console.log(`[ERROR] :: ${msg}`.red);
    this.log(success, msg, data);
};

exports.error = (e) => {
    console.log(`[CATCH ERROR] :: ${e}`.brightRed)
    return false;
};

exports.log = (success = true, message = '', data = {}) => {
    if (!success) console.log(`[ERROR] :: ${message}`.red)
   return { success, message, data }
};

exports.logAll = (method, path) => {
    console.log(`[METHOD] :: ${method} :: :: ROUTE: ${path}`.blue)
};

exports.originLog = (flag, ip, origin) => {
    const currentStamp = moment().format('YYYY-MM-DD HH:mm:ss')
    if (flag) console.log(`[ORIGIN] :: ${origin} :: ${ip}:: AT: ${currentStamp}`.dim)
    else console.log(`[ORIGIN NOT ALLOWED] :: ${origin} :: ${ip} :: AT: ${currentStamp}`.bgMagenta)
};
