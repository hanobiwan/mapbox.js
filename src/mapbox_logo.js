'use strict';

var MapboxLogo = L.Control.extend({

    options: {
        position: 'bottomleft',
        sanitizer: require('sanitize-caja')
    },

    initialize: function(options) {
        L.setOptions(this, options);
        this._mapboxLogo = '';
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', 'mapbox-logo');
        L.DomEvent.disableClickPropagation(this._container);

        if (L.mapbox.accessToken) this.addLogo(L.mapbox.accessToken);

        this._update();

        return this._container;
    },

    addLogo: function(accessToken) {
        // check to see if accessToken is associate with a logo
        console.log(accessToken);

        // if it is:
        this._mapboxLogo = 'MAPBOX LOGO!';

        return this._update();
    },

    _update: function() {
        if (!this._map) { return this; }

        this._container.innerHTML = '';

        var div = L.DomUtil.create('div', 'mapbox-logo', this._container);
        div.innerHTML = this._mapboxLogo;

        return this;
    }
});

module.exports.MapboxLogo = MapboxLogo;

module.exports.MapboxLogo = function(options) {
    return new MapboxLogo(options);
};
