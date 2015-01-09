'use strict';

var MapboxLogo = L.Control.extend({

    options: {
        position: 'bottomleft',
        sanitizer: require('sanitize-caja')
    },

    initialize: function(_) {
        this._mapboxLogo = '';
        this._ = _;
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', 'mapbox-logo');
        L.DomEvent.disableClickPropagation(this._container);

        this._update();

        return this._container;
    },

    addLogo: function(json) {
        // check to see if accessToken is associate with a logo
        var mapid = this._.indexOf('/') === -1 ? true : false;

        if (json.mapbox_logo === false || (!mapid && !json.mapbox_logo)) this._mapboxLogo = '';
        else this._mapboxLogo = '<img src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI2NSIgaGVpZ2h0PSIyMCI+PGRlZnMvPjxtZXRhZGF0YT48cmRmOlJERj48Y2M6V29yayByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIvPjxkYzp0aXRsZS8+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNjEuODQ4MywtOTguNTAzOTUpIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjE3NDQxODM2LDAsMCwwLjE3NDQxODM2LDIyMC41MjI4MiwyOS4yMjkzNDIpIiBzdHlsZT0ib3BhY2l0eTowLjI1O2ZpbGw6I2ZmZmZmZjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MTcuMjAwMDIzNjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtZGFzaGFycmF5Om5vbmUiPjxwYXRoIGQ9Ik0gNS4yOCAxLjUgQyA0LjU0IDEuNTYgMy45IDIuMjUgMy45MSAzIGwgMCAxMS44OCBjIDAuMDIgMC43NyAwLjcyIDEuNDcgMS41IDEuNDcgbCAxLjc1IDAgYyAwLjc4IDAgMS40OCAtMC42OSAxLjUgLTEuNDcgbCAwIC00LjI4IDAuNzIgMS4xOSBjIDAuNTMgMC44NyAyLjAzIDAuODcgMi41NiAwIGwgMC43MiAtMS4xOSAwIDQuMjggYyAwLjAyIDAuNzYgMC43IDEuNDUgMS40NyAxLjQ3IGwgMS43NSAwIGMgMC43OCAwIDEuNDggLTAuNjkgMS41IC0xLjQ3IGwgMCAtMC4xNiBjIDEuMDIgMS4xMiAyLjQ2IDEuODEgNC4wOSAxLjgxIGwgNC4wOSAwIDAgMS40NyBjIC0wIDAuNzggMC42OSAxLjQ4IDEuNDcgMS41IGwgMS43NSAwIGMgMC43OSAtMCAxLjUgLTAuNzEgMS41IC0xLjUgbCAwLjAyIC0xLjQ3IGMgMS43MiAwIDMuMDggLTAuNjQgNC4xNCAtMS42OSBsIDAgMC4xOSBjIDAgMC4zOSAwLjE2IDAuNzkgMC40NCAxLjA2IDAuMjggMC4yOCAwLjY3IDAuNDQgMS4wNiAwLjQ0IGwgMy4zMSAwIGMgMi4wMyAwIDMuODUgLTEuMDYgNC45MSAtMi42OSAxLjA1IDEuNjEgMi44NCAyLjY5IDQuODggMi42OSAxLjAzIDAgMS45OCAtMC4yNyAyLjgxIC0wLjc1IDAuMjggMC4zNSAwLjczIDAuNTcgMS4xOSAwLjU2IGwgMi4xMiAwIGMgMC40OCAwLjAxIDAuOTcgLTAuMjMgMS4yNSAtMC42MiBsIDAuOTEgLTEuMjggMC45MSAxLjI4IGMgMC4yOCAwLjM5IDAuNzQgMC42MyAxLjIyIDAuNjIgbCAyLjE2IDAgQyA2Mi42NyAxNi4zMyA2My40MiAxNC44OSA2Mi44MSAxNCBMIDYwLjIyIDEwLjM4IDYyLjYyIDcgQyA2My4yNiA2LjExIDYyLjUgNC42MiA2MS40MSA0LjYyIGwgLTIuMTYgMCBDIDU4Ljc4IDQuNjIgNTguMzEgNC44NiA1OC4wMyA1LjI1IEwgNTcuMzEgNi4yOCA1Ni41NiA1LjI1IEMgNTYuMjkgNC44NiA1NS44MiA0LjYyIDU1LjM0IDQuNjIgbCAtMi4xNiAwIGMgLTAuNDkgLTAgLTAuOTcgMC4yNSAtMS4yNSAwLjY2IC0wLjg2IC0wLjUxIC0xLjg0IC0wLjgxIC0yLjkxIC0wLjgxIC0yLjAzIDAgLTMuODMgMS4wOCAtNC44OCAyLjY5IEMgNDMuMSA1LjUzIDQxLjI3IDQuNDcgMzkuMTkgNC40NyBMIDM5LjE5IDMgQyAzOS4xOSAyLjYxIDM5LjAzIDIuMjEgMzguNzUgMS45NCAzOC40NyAxLjY2IDM4LjA4IDEuNSAzNy42OSAxLjUgbCAtMS43NSAwIGMgLTAuNzEgMCAtMS41IDAuODMgLTEuNSAxLjUgbCAwIDMuMTYgQyAzMy4zOCA1LjEgMzEuOTYgNC40NyAzMC4zOCA0LjQ3IGwgLTMuMzQgMCBjIC0wLjc3IDAuMDIgLTEuNDcgMC43MiAtMS40NyAxLjUgbCAwIDAuMzEgYyAtMS4wMiAtMS4xMiAtMi40NiAtMS44MSAtNC4wOSAtMS44MSAtMS42MyAwIC0zLjA3IDAuNyAtNC4wOSAxLjgxIEwgMTcuMzggMyBjIC0wIC0wLjc5IC0wLjcxIC0xLjUgLTEuNSAtMS41IEwgMTQuNSAxLjUgQyAxMy41NSAxLjUgMTIuMjggMS44NyAxMS42NiAyLjk0IGwgLTEgMS42OSAtMSAtMS42OSBDIDkuMDMgMS44NyA3Ljc3IDEuNSA2LjgxIDEuNSBsIC0xLjQxIDAgQyA1LjM2IDEuNSA1LjMyIDEuNSA1LjI4IDEuNSB6IG0gMTYuMTkgNy43MiBjIDAuNTMgMCAwLjk0IDAuMzUgMC45NCAxLjI4IGwgMCAxLjI4IC0wLjk0IDAgYyAtMC41MiAwIC0wLjk0IC0wLjM4IC0wLjk0IC0xLjI4IC0wIC0wLjkgMC40MiAtMS4yOCAwLjk0IC0xLjI4IHogbSA4LjgxIDAgYyAwLjgzIDAgMS4xOCAwLjY4IDEuMTkgMS4yOCAwLjAxIDAuOTQgLTAuNjIgMS4yOCAtMS4xOSAxLjI4IHogbSA4LjcyIDAgYyAwLjcyIDAgMS4zNyAwLjYgMS4zNyAxLjI4IDAgMC43NyAtMC41MSAxLjI4IC0xLjM3IDEuMjggeiBtIDEwLjAzIDAgYyAwLjU4IDAgMS4wOSAwLjUgMS4wOSAxLjI4IDAgMC43OCAtMC41MSAxLjI4IC0xLjA5IDEuMjggLTAuNTggMCAtMS4xMiAtMC41IC0xLjEyIC0xLjI4IDAgLTAuNzggMC41NCAtMS4yOCAxLjEyIC0xLjI4IHoiIHRyYW5zZm9ybT0ibWF0cml4KDUuNzMzMzQxNCwwLDAsNS43MzMzNDE0LDIzNi45MzMwOCwzOTcuMTc0OTgpIiBzdHlsZT0iZm9udC1zaXplOm1lZGl1bTtmb250LXN0eWxlOm5vcm1hbDtmb250LXZhcmlhbnQ6bm9ybWFsO2ZvbnQtd2VpZ2h0Om5vcm1hbDtmb250LXN0cmV0Y2g6bm9ybWFsO3RleHQtaW5kZW50OjA7dGV4dC1hbGlnbjpzdGFydDt0ZXh0LWRlY29yYXRpb246bm9uZTtsaW5lLWhlaWdodDpub3JtYWw7bGV0dGVyLXNwYWNpbmc6bm9ybWFsO3dvcmQtc3BhY2luZzpub3JtYWw7dGV4dC10cmFuc2Zvcm06bm9uZTtkaXJlY3Rpb246bHRyO2Jsb2NrLXByb2dyZXNzaW9uOnRiO3dyaXRpbmctbW9kZTpsci10Yjt0ZXh0LWFuY2hvcjpzdGFydDtiYXNlbGluZS1zaGlmdDpiYXNlbGluZTtjb2xvcjojMDAwMDAwO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTcuMjAwMDIzNjU7bWFya2VyOm5vbmU7dmlzaWJpbGl0eTp2aXNpYmxlO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZTtmb250LWZhbWlseTpTYW5zOy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246U2FucyIvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjE3NDQxODM2LDAsMCwwLjE3NDQxODM2LDIyMC41MjI4MiwyOS4yMjkzNDIpIiBzdHlsZT0iZmlsbDojZmZmZmZmIj48cGF0aCBkPSJtIDUuNDEgMyAwIDEyIDEuNzUgMCAwIC05LjkxIDMuNSA1Ljk0IDMuNDcgLTUuOTQgMCA5LjkxIDEuNzUgMCAwIC0xMiBMIDE0LjUgMyBDIDEzLjggMyAxMy4yNSAzLjE2IDEyLjk0IDMuNjkgTCAxMC42NiA3LjU5IDguMzggMy42OSBDIDguMDcgMy4xNiA3LjUxIDMgNi44MSAzIHogTSAzNiAzIGwgMCAxMi4wMyAzLjI1IDAgYyAyLjQ0IDAgNC4zOCAtMS45MSA0LjM4IC00LjUzIDAgLTIuNjIgLTEuOTMgLTQuNDcgLTQuMzggLTQuNDcgQyAzOC43IDYuMDMgMzguMzIgNiAzNy43NSA2IGwgMCAtMyB6IE0gMjEuNDcgNS45NyBjIC0yLjQ0IDAgLTQuMTkgMS45MSAtNC4xOSA0LjUzIDAgMi42MiAxLjc1IDQuNTMgNC4xOSA0LjUzIGwgNC4xOSAwIDAgLTQuNTMgYyAwIC0yLjYyIC0xLjc1IC00LjUzIC00LjE5IC00LjUzIHogbSAyNy41NiAwIGMgLTIuNDEgMCAtNC4zOCAyLjAzIC00LjM4IDQuNTMgMCAyLjUgMS45NyA0LjUzIDQuMzggNC41MyAyLjQxIDAgNC4zNCAtMi4wMyA0LjM0IC00LjUzIDAgLTIuNSAtMS45NCAtNC41MyAtNC4zNCAtNC41MyB6IG0gLTIyIDAuMDMgMCAxMiAxLjc1IDAgMCAtMi45NyBjIDAuNTcgMCAxLjA0IC0wIDEuNTkgMCAyLjQ0IDAgNC4zNCAtMS45MSA0LjM0IC00LjUzIDAgLTIuNjIgLTEuOSAtNC41IC00LjM0IC00LjUgeiBtIDI2LjE2IDAgMy4wMyA0LjM4IC0zLjE5IDQuNjIgMi4xMiAwIEwgNTcuMzEgMTEuOTEgNTkuNDQgMTUgNjEuNTkgMTUgNTguMzggMTAuMzggNjEuNDEgNiA1OS4yNSA2IDU3LjMxIDguODEgNTUuMzQgNiB6IE0gMjEuNDcgNy43MiBjIDEuNCAwIDIuNDQgMS4xOSAyLjQ0IDIuNzggbCAwIDIuNzggLTIuNDQgMCBjIC0xLjQgMCAtMi40NCAtMS4yMSAtMi40NCAtMi43OCAtMCAtMS41NyAxLjA0IC0yLjc4IDIuNDQgLTIuNzggeiBtIDI3LjU2IDAgYyAxLjQ0IDAgMi41OSAxLjI0IDIuNTkgMi43OCAwIDEuNTQgLTEuMTUgMi43OCAtMi41OSAyLjc4IC0xLjQ0IDAgLTIuNjIgLTEuMjQgLTIuNjIgLTIuNzggMCAtMS41NCAxLjE4IC0yLjc4IDIuNjIgLTIuNzggeiBtIC0yMC4yNSAwLjAzIDEuNTkgMCBjIDEuNTkgMCAyLjU5IDEuMjggMi41OSAyLjc1IDAgMS40NyAtMS4xMyAyLjc4IC0yLjU5IDIuNzggbCAtMS41OSAwIHogbSA4Ljk3IDAgMS41IDAgYyAxLjQ3IDAgMi42MiAxLjI4IDIuNjIgMi43NSAwIDEuNDcgLTEuMDQgMi43OCAtMi42MiAyLjc4IGwgLTEuNSAwIHoiIHRyYW5zZm9ybT0ibWF0cml4KDUuNzMzMzQxNCwwLDAsNS43MzMzNDE0LDIzNi45MzMwOCwzOTcuMTc0OTgpIiBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lIi8+PC9nPjwvZz48L3N2Zz4=">';

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
