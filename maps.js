let priv = require('./private');

var googleMapsClient = require('@google/maps').createClient({
    key: priv.apiKey,
    Promise: Promise
});

let geocode = (city, state) => {
    return googleMapsClient.geocode({
        address: city + ', ' + state
        }).asPromise()
}

let mapQuery = (object) => {
    let longlat = object.json.results[0].geometry.location
    return googleMapsClient.placesNearby({location: longlat,
                                radius: 12000.3,
                                keyword: 'Fire Department'
                                }).asPromise();
}
exports.mapQuery = mapQuery;
exports.geocode = geocode;