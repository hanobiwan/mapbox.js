describe('mapbox_logo', function() {
    var server, element, doc, tileJSON = helpers.tileJSON;

    beforeEach(function() {
        server = sinon.fakeServer.create();
        element = document.createElement('div');
    });

    afterEach(function() {
        server.restore();
    });

    it('constructor', function() {
        var map = L.mapbox.map(element, tileJSON);
        var mapboxLogo = map._mapboxLogo;
        expect(map._mapboxLogo instanceof L.Control);
        expect(map.getTileJSON()).to.eql(helpers.tileJSON);
    });

    it('is not on tilejson map without mapbox_logo flag', function() {
        var map = L.mapbox.map(element, tileJSON);
        var mapboxLogo = map._mapboxLogo;
        expect(mapboxLogo._mapboxLogo.length).to.eql(0);
        expect(map.getTileJSON()).to.eql(helpers.tileJSON);
    });

    it('is on tilejson map with mapbox_logo === true', function() {
        var map = L.mapbox.map(element, helpers.tileJSON_mapboxlogo);
        var mapboxLogo = map._mapboxLogo;
        expect(mapboxLogo._mapboxLogo.length).to.eql(6396);
        expect(map.getTileJSON()).to.eql(helpers.tileJSON_mapboxlogo);
    });

    it('is not on tilejson map with mapbox_logo === false', function() {
        var map = L.mapbox.map(element, helpers.tileJSON_mapboxlogoFalse);
        var mapboxLogo = map._mapboxLogo;
        expect(mapboxLogo._mapboxLogo.length).to.eql(0);
        expect(map.getTileJSON()).to.eql(helpers.tileJSON_mapboxlogoFalse);
    });

    it('is on mapid map without mapbox_logo flag', function(done) {
        var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2');
        map.on('ready', function() {
            var mapboxLogo = map._mapboxLogo;
            expect(mapboxLogo._mapboxLogo.length).to.equal(6396);
            expect(map.getTileJSON()).to.eql(helpers.tileJSON);
            done();
        });

        server.respondWith("GET", "http://a.tiles.mapbox.com/v4/mapbox.map-0l53fhk2.json?access_token=key",
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
        server.respond();
        
    });

    it('is on mapid map with mapbox_logo flag === true', function(done) {
        var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2');
        map.on('ready', function() {
            var mapboxLogo = map._mapboxLogo;
            expect(mapboxLogo._mapboxLogo.length).to.equal(6396);
            expect(map.getTileJSON()).to.eql(helpers.tileJSON_mapboxlogo);
            done();
        });

        server.respondWith("GET", "http://a.tiles.mapbox.com/v4/mapbox.map-0l53fhk2.json?access_token=key",
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON_mapboxlogo)]);
        server.respond();
    });

    it('is not on mapid map with mapbox_logo flag === false', function(done) {
        var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2');
        map.on('ready', function() {
            var mapboxLogo = map._mapboxLogo;
            expect(mapboxLogo._mapboxLogo.length).to.equal(0);
            expect(map.getTileJSON()).to.eql(helpers.tileJSON_mapboxlogoFalse);
            done();
        });

        server.respondWith("GET", "http://a.tiles.mapbox.com/v4/mapbox.map-0l53fhk2.json?access_token=key",
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON_mapboxlogoFalse)]);
        server.respond();
    });
});
