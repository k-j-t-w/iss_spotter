const { nextISSTimesForMyLocation } = require('./iss_promised')

const printOverheadTimes = function(overheadTimes) {
  for (const pass of overheadTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printOverheadTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });