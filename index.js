const { nextISSTimesForMyLocation } = require('./iss');

// a function to ouput a readable format
const printOverheadTimes = function(overheadTimes) {
  for (const pass of overheadTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

//calls the function 
nextISSTimesForMyLocation((error, overheadTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printOverheadTimes(overheadTimes);
});