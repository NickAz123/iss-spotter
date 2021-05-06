const request = require('request-promise-native');

const fetchMyIP = () => {
  return request(`https://api.ipify.org?format=json`)
  
};

const fetchCoordsByIP = (ipObj) => {
  const ip = JSON.parse(ipObj).ip;
  return request (`https://freegeoip.app/json/${ip}`);
};

const getPasses = (dataObj) => {
  const data = JSON.parse(dataObj);
  const lat = data.latitude;
  const long = data.longitude;
  
  return request(`http://api.open-notify.org/iss/v1/?lat=${lat}&lon=${long}&alt=1650`)
}

const myLocationPasses = (obj) => {
  let objParsed = JSON.parse(obj);
  let flyOvers = objParsed.response;
  for (const info of flyOvers) {
    const time = (info.risetime) * 1000;
    const date = new Date(time);
    const day = date.toLocaleString("en-US", { weekday: "short" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const day0 = date.toLocaleString("en-US", { day: "numeric" });
    const year = date.toLocaleString("en-US", { year: "numeric" });
    const timeZone = date.toLocaleString("en-US",{ timeZoneName: "short" });
    console.log(`Next Pass at ${day} ${month} ${day0} ${year} ${timeZone}`);
  }
}

module.exports = {fetchMyIP, fetchCoordsByIP, getPasses, myLocationPasses};