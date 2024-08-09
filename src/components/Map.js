import React, { useState, useEffect } from 'react'
import loader from '../utils/googleMapsLoader';

const custStyles = [{
    "elementType": "geometry",
    "stylers": [{
        "color": "#1d2c4d"
    }]
},
{
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#f6b260"
    }]
},
{
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#1a3646"
    }]
},
{
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#4b6878"
    }]
},
{
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#64779e"
    }]
},
{
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#4b6878"
    }]
},
{
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#334e87"
    }]
},
{
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [{
        "color": "#023e58"
    }]
},
{
    "featureType": "poi",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
        "color": "#283d6a"
    }]
},
{
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#6f9ba5"
    }]
},
{
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#1d2c4d"
    }]
},
{
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#023e58"
    }]
},
{
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#3C7680"
    }]
},
{
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#234e6b"
    },
    {
        "weight": 2
    }
    ]
},
{
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#98a5be"
    }]
},
{
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#1d2c4d"
    }]
},
{
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "color": "#345378"
    }]
},
{
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#b0d5ce"
    }]
},
{
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#023e58"
    }]
},
{
    "featureType": "road.local",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "transit",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#98a5be"
    }]
},
{
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#1d2c4d"
    }]
},
{
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#283d6a"
    }]
},
{
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{
        "color": "#3a4762"
    }]
},
{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#0e1626"
    }]
},
{
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#4e6d70"
    }]
}
]

const Map = ({ address }) => {
    const [map, setMap] = useState(null);
    useEffect(() => {

        loader.load().then(() => {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK') {
                    let offsetx = $(window).width() / 4;
                    let latlng = results[0].geometry.location
                    const mapOptions = {
                        center: results[0].geometry.location,
                        zoom: 8,
                        zoomControl: false,
                        scaleControl: false,
                        fullscreenControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        mapTypeControl: false,
                        gestureHandling: 'none',
                        styles: custStyles
                    };
                    const newMap = new window.google.maps.Map(
                        document.getElementById('map'),
                        mapOptions
                    );

                    const marker = new window.google.maps.Marker({
                        position: results[0].geometry.location,
                        map: newMap,
                    });
                    google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
                        var map = newMap;
                        var ov = new google.maps.OverlayView();
                        ov.onAdd = function () {
                            var proj = this.getProjection();
                            var aPoint = proj.fromLatLngToContainerPixel(latlng);
                            aPoint.x = aPoint.x + offsetX;
                            aPoint.y = aPoint.y + offsetY;
                            map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
                        };
                        ov.draw = function () { };
                        ov.setMap(map);
                    };
                    google.maps.Map.prototype.setCenterWithOffset(latlng, offsetx, 0);
                    // if (windowCheck().indexOf('desktop') > -1) {
                       
                    // }
                    setMap(newMap);
                }
            });
        });
    }, [address]);

    return (
        <div id="map" style={{ height: '660px' }}></div>
    )
}

export default Map