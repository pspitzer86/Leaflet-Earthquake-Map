# Leaflet-Eathquake-Map

For this project, a leaflet map was created using code to create tilemap layers, earthquake data for the last month from the USGS and various basemaps from Mapbox API.  The project is broken down into two parts, the first just showcasing the earthquake data on a simple basemap, the second also showcasing tectonic plate boundary data taken from a JSON provided on a different github page as well as several different basemaps that a user could toggle between.  A layer of circles were created that plotted the earthquakes based on their coordinates.  The size of the circles were based off the magnitude of each earthquake and was amplified in order to be visible at lower zoom levels.  The color of each circle was based on the depth of the epicenters of the earthquakes.  A scale was created with 20 km deep intervals from -10 to 90 each being assigned a color.  Looping through the depth data in the JSON and comparing their values to the intervals assigned them their color.  The plate boundaries were given a style and color for their representation on the basemaps.  A menu for toggling the various basemaps and layers was set to the upper right of the map and a legend of the intervals and their colors for the earthquake depth was set to the bottom right of the map.

In collaboration with Kate Spitzer


![Leaflet_map_updated](https://user-images.githubusercontent.com/65049133/121833027-4d518380-cc80-11eb-9d71-cfce9b050439.png)
