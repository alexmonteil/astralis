mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: starport.geometry.coordinates, // starting position [lng, lat]
    zoom: 8 // starting zoom
});


map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
.setLngLat(starport.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25 })
    .setHTML(
        `<h3>${starport.title}</h3><p>${starport.location}</p>`
    )
)
.addTo(map);