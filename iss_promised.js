const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};


/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCordsByIP = function(ip) {
  const parsedIp = JSON.parse(ip).ip;
  return request(`http://ipwho.is/${parsedIp}`);
};

/*
 * Requests data from https://iss-flyover.herokuapp.com using provided lat/long data
 * Input: JSON body containing geo data response from ipwho.is
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(cords) {
  const parsedCords = { latitude: JSON.parse(cords).latitude, longitude: JSON.parse(cords).longitude}
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${parsedCords.latitude}&lon=${parsedCords.longitude}`)
}

/* 
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCordsByIP) 
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
}
module.exports = { nextISSTimesForMyLocation }