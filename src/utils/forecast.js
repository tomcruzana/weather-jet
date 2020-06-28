const request = require("request");

const forecast = (lat, long, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=b0f4e786a4566c1b8e890b4c782bf4eb&query=${lat},${long}&units=f`;

    request({url: url, json: true}, (err, res)=>{
        if(err){
            cb("error occured", undefined);
        } 
        else if(res.body.error){
            cb("No location found", undefined);
        } 
        else{
            cb(undefined, `${res.body.current.weather_descriptions[0]}. The current temperature is ${res.body.current.temperature}°F, but it feels like ${res.body.current.feelslike}°F`);
        }
    });
}

module.exports = forecast;