// define geoJSON dataset

var earthquakeJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// perform a GET request to the query URL

d3.json(earthquakeJSON, function(data) {
    console.log(data);

    // once we get a response, send the data.features object to the createMap function

    createMap(data.features);
});


// function to set color to indicate epicenter depth

function setColor(depth) {
 
    // create color object
    var depthColor = [{interval: 10, color: "green"}, {interval: 30, color: "lightgreen"}, {interval: 50, color: "yellow"}, {interval: 70, color: "orange"}, {interval: 90, color: "red"}, {interval: 1000, color: "maroon"}];

    // loop through color object and return
    // first match

    for (var i = 0; i < depthColor.length; i++) {
        if (depth <= depthColor[i].interval) {
            return(depthColor[i].color);
        }
    } 
}


// function to define our markers features

function createMap(earthquakeData) {

    // create our map, giving it the streetmap and earthquakes layers to display on load

    var myMap = L.map("mapid", {
        center: [
            37.09, -95.71
        ],
        zoom: 5
    });

    // define basemap

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    // initialize earthquake marker array

    eqMarkers = [];

    // loop through the earthquake locations

    for (var i = 0; i < earthquakeData.length; i++) {

        // set location to coordinates provided

        var location = [earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]];

        // push a circle marker into our list, calling setColor using
        // the depth coordinate and using the magnitude for
        // the circle radius.  add a popup to the markers

        eqMarkers.push(L.circle(location, {
            weight: 1,
            color: "black",
            fillColor: setColor(earthquakeData[i].geometry.coordinates[2]),
            fillOpacity: 0.8,
            radius: earthquakeData[i].properties.mag * 10000
        }).bindPopup("<h3>" + earthquakeData[i].properties.place +
            "</h3><hr><p><strong>Magnitude:</strong> " + earthquakeData[i].properties.mag + "<br><strong>Depth:</strong> "
            + earthquakeData[i].geometry.coordinates[2] + " km<br><br>" + new Date(earthquakeData[i].properties.time) + "</p>")
        .addTo(myMap));
    }


    // set up the legend

    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var depthLimits = [-10, 10, 30, 50, 70, 90];
        div.innerHTML = '<h3>Epicenter Depth</h3>';
        for (var i = 0; i < depthLimits.length; i++) {
            div.innerHTML += '<i style="background:' + setColor(depthLimits[i] + 1) + '"></i> ' + depthLimits[i] + (depthLimits[i + 1] ? ' km &ndash; ' + depthLimits[i + 1] + ' km <br>' : '+ km');
        }
        return div;
    }
    // adding legend to the map

    legend.addTo(myMap);
}
