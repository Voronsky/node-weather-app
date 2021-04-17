const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=3&access_token=pk.eyJ1Ijoidm9yb25za3kiLCJhIjoiY2tua2dzODZuMDk4cjJubHR2bHlsczAzZiJ9.lkVJfcdQH18DonWFWhOWng'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!')
        }
        if (body.features.length === 0) {
            //This implicitly sets the 2nd param to be undefined
            callback('Unable to find location. Try another search')
        }
        else {
            // Explicitly sets the first guy to be undefined
            // In callbacks, only one of the params can be defined
            const { center, place_name } = body.features[0]
            callback(undefined, {
                //latitude: response.body.features[0].center[1],
                //longitude: response.body.features[0].center[0],
                //location: response.body.features[0].place_name,
                latitude: center[1],
                longitude: center[0],
                location: place_name,
            })
        }
    })
}

module.exports = geocode