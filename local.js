function setup_map () {
    var map = L.map('map').setView([47.946,10.195], 5);

    L.tileLayer('http://grulicueva.homenet.org/~mdione/Elevation/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> | Design &copy; <a href="https://www.grulic.org.ar/~mdione/glob/">Marcos Dione</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> | Routing information &copy; <a href="http://project-osrm.org/">OSRM</a>, <a href="http://opendatacommons.org/licenses/odbl/">ODbL</a>',
        maxZoom: 18
    }).addTo(map);

    var hash = new L.Hash(map);

    // markersFromCookies (map);

    var geocoder = L.Control.geocoder({
        collapsed: false,
        showResultIcons: true
    });
    geocoder.addTo(map);
    geocoder.markGeocode = function(result) {
        this._map.fitBounds(result.bbox);
        return this;
    };

    // scale
    var scale= L.control.scale ({
        imperial: false,
        maxWidth: 500
    });
    scale.addTo (map);

    // trip planner
    var trip= new Trip ('default');
    var manager= new TripManager (map, trip);
    manager.load ();

    var save= new SaveControl ({'manager': manager});
    save.addTo (map);
}
