'use strict';

function geoParsers(){
    this.mapPolygonToGeoJSON = mapPolygonToGeoJSON;
    return this;
}

function mapPolygonToGeoJSON(coords){
    var geojson = [];
    coords.forEach(function(coord){
        geojson.push([coord.longitude, coord.latitude])
    });
    geojson.push([coords[0].longitude, coords[0].latitude]); //GeoJSON needs the 1st and last coordinate to be the same
    return {type: 'Polygon', coordinates: [geojson]};  //GeoJSON holds a double list, for holes in polygons
}

module.exports = geoParsers;