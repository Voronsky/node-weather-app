const request = require('postman-request')

/**
 * @param {number} long  longitude
 * @param {number} lat  latitude
 * @param {function} callback  function to call
 * @describes grabs forecast information based on the lat and long
 */
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=32cce95f5cf3cf8f652bfc27b4d7073b&query='+lat+','+long+'&units=f'
    request({ url, json: true}, (error, {body}) => {
     if(error){
         callback('unable to connect to weather service!')
     }
     else if(body.success === false){
         callback('unable to find location!')
     }
     else{
         const {temperature, weather_descriptions, feelslike, humidity} = body.current

         // Explicitly undefining the error param
         callback(undefined,
            weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out.' + 
            ' It feels like ' + feelslike  + ' degrees out.' 
            + ' The Humidity is ' + humidity + '%'
         )
     }
    })
}

module.exports = forecast