const { fetchMyIP, fetchCoordsByIP, getPasses, myLocationPasses} = require('./iss_promised');

fetchMyIP()
.then(fetchCoordsByIP)
.then(getPasses)
.then(myLocationPasses)
.catch((error) => {
  console.log(`It didnt work?: `, error.message)
});