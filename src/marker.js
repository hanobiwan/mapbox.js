'use strict';

var url = require('./url');
// mapbox-related markers functionality
// provide an icon from mapbox's simple-style spec and hosted markers
// service
function icon(fp) {
    fp = fp || {};

    var sizes = {
            small: [20, 50],
            medium: [30, 70],
            large: [35, 90]
        },
        size = fp['marker-size'] || 'medium',
        symbol = (fp['marker-symbol']) ? '-' + fp['marker-symbol'] : '',
        color = (fp['marker-color'] || '7e7e7e').replace('#', '');

    return L.icon({
        iconUrl: url.base() + 'marker/' +
            'pin-' + size.charAt(0) + symbol + '+' + color +
            // detect and use retina markers, which are x2 resolution
            ((L.Browser.retina) ? '@2x' : '') + '.png',
        iconSize: sizes[size],
        iconAnchor: [sizes[size][0] / 2, sizes[size][1] / 2],
        popupAnchor: [0, -sizes[size][1] / 2]
    });
}

// a factory that provides markers for Leaflet from MapBox's
// [simple-style specification](https://github.com/mapbox/simplestyle-spec)
// and [Markers API](http://mapbox.com/developers/api/#markers).
function style(f, latlon) {
    var markerIcon = (f.properties.icon) ? f.properties.icon : icon(f.properties),
        markerContent = f.properties.title;

    return L.marker(latlon, {
        icon: markerIcon,
        title: markerContent
    });
}

function createPopup(f) {
    var popup = '<div class="marker-title">' + f.properties.title + '</div>';

    if (f.properties.description)
        popup += '<div class="marker-description">' + f.properties.description + '</div>';

    return popup;
}

module.exports = {
    icon: icon,
    style: style,
    createPopup: createPopup
};
