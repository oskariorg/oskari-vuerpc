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
var feedback = {
  one: `  var postdata = {
    "service_code": "180",
    "description": "Kampin bussipysäkillä on roskakori täynnä",
    "first_name": "Oskari",
    "last_name": "Maanmittaushallitus",
    "lat": "6674188.748000",
    "long": "384717.640000"
  };
  var data = {
    "srs": "EPSG:3067",
    "payload": postdata
  };
  channel.postRequest('PostFeedbackRequest', [data]);`,
  two: `var postdata = {
    "service_code": "180",
    "description": "Vartiosaari kaipaa suojelua",
    "first_name": "Line",
    "last_name": "POC",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [393000, 6673192],
        [393216, 6673560],
        [393712, 6673864],
        [393736, 6673592]
      ]
    }
  };
  var data = {
    "srs": "EPSG:3067",
    "payload": postdata
  };
  channel.postRequest('PostFeedbackRequest', [data]);`,
  three: `var postdata = {
    "service_code": "180",
    "description": "Kampin bussipysäkillä on roskakori täynnä",
    "first_name": "Oskari",
    "last_name": "Maanmittaushallitus",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [382472.5, 6677324.5],
          [382328.5, 6676636.5],
          [383288.5, 6676332.5],
          [383528.5, 6677100.5],
          [382472.5, 6677324.5]
        ]
      ]
    }
  };
  var data = {
    "srs": "EPSG:3067",
    "payload": postdata
  };
  channel.postRequest('PostFeedbackRequest', [data]);`,
  // GET FEEDBACK SERVICES feedback.services.vue
  services: {
    list: "channel.postRequest('GetFeedbackServiceRequest', []);",
    id: 'channel.postRequest(\'GetFeedbackServiceRequest\', ["180"]);'
  }
};
export { features, wkt, feedback };
