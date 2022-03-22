// define access token
      mapboxgl.accessToken = 'pk.eyJ1IjoiMjY5NTQwN3MiLCJhIjoiY2t6eTd1cG1zMDhsZTJ2bzZhNDRoY2w1aSJ9.EccP1n2fT6Ik9DvK_W_3Qg';

      // create map
      const map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/2695407s/cl11916m8001n14o25rz8k6sb' // map style URL from Mapbox Studio
      });
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Edinburgh", // Placeholder text for the search bar
  proximity: {
    longitude: 55.8642,
    latitude: 4.2518
  } // Coordinates of Glasgow center
});

map.addControl(geocoder, "top-left");

map.addControl(new mapboxgl.NavigationControl(), "top-left");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-left"
);
      // wait for map to load before adjusting it
      map.on('load', () => {
        // make a pointer cursor
        map.getCanvas().style.cursor = 'default';

        // set map bounds to the continental US
        map.fitBounds([
          [-3.404331, 55.991869],
          [-3.095753, 55.895305]
        ]);

        // define layer names
        const layers = [
          'Derelict land',
          'Vacant land',
          'Derelict land & buildings',
          'Vacant land & buildings',
          'Operational land defined as derelict',
          'Derelict buildings',
          
        ];
        const colors = [
          '#b2182b',
          '#2166ac',
          '#fddbc7',
          '#d1e5f0',
          '#49d44e',
          '#E6f05c',
          
        ];

        // create legend
        const legend = document.getElementById('legend');

        layers.forEach((layer, i) => {
          const color = colors[i];
          const item = document.createElement('div');
          const key = document.createElement('span');
          key.className = 'legend-key';
          key.style.backgroundColor = color;

          const value = document.createElement('span');
          value.innerHTML = `${layer}`;
          item.appendChild(key);
          item.appendChild(value);
          legend.appendChild(item);
        });

        // change info window on hover
        map.on('mousemove', (event) => {
          const states = map.queryRenderedFeatures(event.point, {
            layers: ['vacant-and-derelict-land-survey']
          });
          document.getElementById('pd').innerHTML = states.length
            ? `<h3>${states[0].properties.LAND_CAT}</h3><p><strong><em>${states[0].properties.NAME}</strong> </em></p>`
            : `<p>Hover over a area!</p>`;
        });
      });