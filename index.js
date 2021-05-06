const { fetchMyIP, fetchChoordsByIP, getPasses, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {

//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);

// });

// fetchChoordsByIP(`24.86.185.125`, (error, data) => {

//   if (error){
//     console.log(error);
//     return;
//   }
//   console.log(`Found Your Coordinates: `, data);
// })

// getPasses({ latitude: '49.27670', longitude: '-123.13000' }, (error, data) => {

//   if (error){
//     console.log(error);
//     return;
//   }

//   console.log(`Found Data: `, data);
// })

nextISSTimesForMyLocation((error, passTimes) =>{
  if (error) {
    return console.log("It Didnt Work!: ", error)
  }
  console.log(passTimes);
})

