const request = require("request");

// convert adddress to geolocation 
const geocode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidG9tY3J1emFuYSIsImEiOiJja2J2M2ZtYmQwMjh2Mndud3J1bHhyZXhlIn0.kL_JMbYdYmzX1T0D2WlJZg`;

    request({url: url, json: true}, (err, res)=>{
        if(err){
            cb("error occured", undefined);
        } 
        else if(res.body.features.length === 0){
            cb("No location found", undefined);
        } 
        else{
            cb(undefined, {
                lat: res.body.features[0].center[1],
                long: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            });
        } 
    });
}

module.exports = geocode;