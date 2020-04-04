// var map = L.map('map').setView([37.71, -99.88], 4);
//
// L.esri.basemapLayer('Gray').addTo(map);
//
// L.esri.dynamicMapLayer({
//   url: 'https://services.arcgisonline.com/arcgis/rest/services/Specialty/Soil_Survey_Map/MapServer',
//   opacity: 0.7
// }).addTo(map);
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMDY4M2ZkMy0zZmI1LTRkZjYtYmZkZC0wYjJkNWZjMjkwNzIiLCJpZCI6MjQ3NTcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODU3MTU0NDV9.Gwsbx6x_f_K8y05xf7Lk92QW1ExFffqcGEfwXd4x3Lc';
var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

// Add a WMS imagery layer
var imageryLayers = viewer.imageryLayers;
// Add a WMS imagery layer
var imageryLayers = viewer.imageryLayers;
// var url = 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Petroleum/KGS_OilGasFields_Kansas/MapServer';
// var esri = new Cesium.ArcGisMapServerImageryProvider({
//     url : url
// });


// imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
//     url : 'https://nationalmap.gov.au/proxy/http://geoserver.nationalmap.nicta.com.au/geotopo_250k/ows',
//     layers : 'Hydrography:bores',
//     parameters : {
//         transparent : true,
//         format : 'image/png'
//     }
// }));

// imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
//     url : 'https://nationalmap.gov.au/proxy/http://services.ga.gov.au/site_3/rest/services/Electricity_Infrastructure/MapServer'
// }));
imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
    url : 'https://livefeeds2dev.arcgis.com/arcgis/rest/services/GEOGLOWS/GlobalWaterModel_Medium/MapServer'
}));
// Start off looking at Australia.
viewer.camera.setView({
    destination: Cesium.Rectangle.fromDegrees(114.591, -45.837, 148.970, -5.730)
});//Sandcastle_End
