const request = require(`request`);

const fetchMyIP = (callback) => {

  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    const ip = JSON.parse(body);

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, ip['ip']);
  });
};

const fetchChoordsByIP = (ip, callback) => {
  let domain = `https://freegeoip.app/json/${ip}`;

  request(domain, (error, response, body) => {

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);
    const lat = data.latitude;
    const long = data.longitude;
    const dataObj = {
      latitude: lat,
      longitude: long
    };

    callback(null, dataObj);
  });
};

const getPasses = (coordinates, callback) => {
  const long = coordinates.longitude;
  const lat = coordinates.latitude;

  request(`http://api.open-notify.org/iss/v1/?lat=${lat}&lon=${long}&alt=1650`, (error, response, body) => {
    const data = JSON.parse(body);
    if (error) {
      callback(error, null);
    }
    callback(null, data);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {

    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    fetchChoordsByIP(ip, (error, data) => {

      if (error) {
        console.log(error);
        return;
      }

      getPasses(data, (error, data) => {

        if (error) {
          console.log(error);
          return;
        }

        let flyOvers = data.response;
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
      })
    })
  });
};

module.exports = { fetchMyIP, fetchChoordsByIP, getPasses, nextISSTimesForMyLocation };