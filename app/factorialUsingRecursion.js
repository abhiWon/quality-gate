require([
  "esri/map", "esri/tasks/locator", "esri/SpatialReference", "esri/graphic",
  "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/Font", "esri/symbols/TextSymbol", "esri/geometry/Extent",
  "esri/geometry/webMercatorUtils", "dojo/_base/array", "dojo/_base/Color",
  "dojo/parser", "https://esri.github.io/bootstrap-map-js/src/js/bootstrapmap.js",  
  "dojo/domReady!"
], function (
  Map, Locator, SpatialReference, Graphic, SimpleLineSymbol, SimpleMarkerSymbol,
  Font, TextSymbol, Extent, webMercatorUtils, arrayUtils, Color, parser, BootstrapMap
) {
    parser.parse();
    let map = new Map("mapDiv", { center: [-56.049, 38.485], zoom: 3, basemap: "hybrid" });
    BootstrapMap.bindTo(map);
    locator = new Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
    locator.on("address-to-locations-complete", function (evt) {
        map.graphics.clear();
        arrayUtils.forEach(evt.addresses, function (geocodeResult, index) {
            let r = Math.floor(Math.random() * 250);
            let g = Math.floor(Math.random() * 100);
            let b = Math.floor(Math.random() * 100);

            let symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 20, new SimpleLineSymbol(
                SimpleLineSymbol.STYLE_SOLID, new Color([r, g, b, 0.5]), 10), new Color([r, g, b, 0.9]));

            let pointMeters = webMercatorUtils.geographicToWebMercator(geocodeResult.location);
            let locationGraphic = new Graphic(pointMeters, symbol);
            let font = new Font().setSize("12pt").setWeight(Font.WEIGHT_BOLD);
            let textSymbol = new TextSymbol( (index + 1) + ".) " + geocodeResult.address, font, new Color([r, g, b, 0.8]) ).setOffset(5, 15);
            map.graphics.add(locationGraphic);
            map.graphics.add(new Graphic(pointMeters, textSymbol));
        });
        let ptAttr = evt.addresses[0].attributes;
        let minx = parseFloat(ptAttr.Xmin);
        let maxx = parseFloat(ptAttr.Xmax);
        let miny = parseFloat(ptAttr.Ymin);
        let maxy = parseFloat(ptAttr.Ymax);
        let esriExtent = new Extent(minx, miny, maxx, maxy, new SpatialReference({ wkid: 4326 }));
        map.setExtent(webMercatorUtils.geographicToWebMercator(esriExtent));
    });
    //-- Wire up annyang 
    if (annyang) {
        annyang.debug()
        $('#welcome').fadeIn('fast');
        let move = function (dir) {
            if (dir == "left" || dir == "west") map.panLeft();
            if (dir == "right" || dir == "east") map.panRight();
            if (dir == "up" || dir == "north") map.panUp();
            if (dir == "down" || dir == "south") map.panDown();
            if (dir == "in") map.setZoom(map.getZoom() + 1);
            if (dir == "out") map.setZoom(map.getZoom() - 1);
        };
        let setBasemap = function (basemap) {
            if (basemap == 'gray') basemap = 'grey'; //helper
            if (basemap == 'street') basemap = 'streets'; //helper
            let baseMaps = $("a[data-basemapname='" + basemap + "']");
            if (baseMaps.length > 0) map.setBasemap($(baseMaps[0]).attr("data-basemapvalue"));
        };
        let close = function () {
            $('#welcome').fadeOut('fast');
            $('#help').modal('hide');
        };
        let showHelp = function () { $('#help').modal('show'); };
        let commands = {
            'move :dir': move,
            'locate *place': geoLocate,
            'set base map *basemap': setBasemap,
            'base map *basemap': setBasemap,
            'close': close,
            'help': showHelp
        };
        annyang.addCallback('resultNoMatch', function () {
            $('#nomatch').fadeIn('fast').delay(3000).fadeOut('slow'); $('#welcome').fadeOut('fast');
        });
        annyang.addCallback('resultMatch', function () { $('#welcome').fadeOut('fast'); });
        annyang.addCommands(commands);
        annyang.start();
    } else {
        $('#notsupported').fadeIn('fast');
    }
    //-- Helper functions
    function geoLocate(place) {
        let address = { SingleLine: place };
        let options = { address: address, outFields: ["*"] };
        locator.addressToLocations(options);
    }
    //-- Event Binding
    $(".dropdown-menu a").click(function () {
        map.setBasemap($(this).attr("data-basemapvalue"));
    });
    $("form").submit(function (e) {
        geoLocate($("#search").val());
        e.preventDefault();
    });
});