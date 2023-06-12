/*
 *             IN THIS FILE YOU CAN FIND THE EXAMPLES USED IN HIGHLIGHTJS. THE EXAMPLES IN THIS FILE ARE TOO BIG TO BE USED IN TEMPLATE SO THEY ARE IMPORTED FROM HERE INSTEAD
 */
var features = {
  // EVENT feature.event.vue
  event: `{
    "operation": "add",
    "features": [
      {
        "id": "F24",
        "geojson": {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "id": "F24",
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [
                    488704,
                    6939136
                  ],
                  [
                    588704,
                    7039136
                  ]
                ]
              },
              "properties": {
                "test_property": 1,
                "oskari-cursor": "zoom-in"
              }
            }
          ]
        },
        "layerId": "VECTOR"
      },
      {
        "id": "F25",
        "geojson": {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "id": "F25",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  488704,
                  6939136
                ]
              },
              "properties": {
                "test_property": 2
              }
            }
          ]
        },
        "layerId": "VECTOR"
      }
    ]
  }`
};
var wkt = `// Define a WKT geometry
var WKT = 'POLYGON ((358911.7134508261 6639617.669712467, 358911.7134508261 6694516.612323322, 382536.4910289571 6694516.612323322, 382536.4910289571 6639617.669712467, 358911.7134508261 6639617.669712467))';

// Some attributes for the feature
var attributes = {
  test_property: 1
};

// Styling
var featureStyle = {
  fill: {
    color: 'rgba(0,0,0,0.3)',
  },
  stroke: {
    color: '#FF0000',
    width: 10
  },
  text : {
    scale : 1.3,
    fill : {
      color : 'rgba(0,0,0,1)'
    },
    stroke : {
      color : 'rgba(255,255,255,1)',
      width : 2
    },
    labelProperty: 'test_property'
  }
};

// Add features
channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [WKT, {
  layerId: 'MY_VECTOR_LAYER',
  clearPrevious: true,
  layerOptions: null,
  centerTo: false,
  featureStyle: featureStyle,
  attributes: attributes
}]);`;

export { features, wkt };
