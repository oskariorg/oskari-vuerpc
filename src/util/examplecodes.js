/*
*             IN THIS FILE YOU CAN FIND THE EXAMPLES USED IN HIGHLIGHTJS. THE EXAMPLES IN THIS FILE ARE TOO BIG TO BE USED IN TEMPLATE SO THEY ARE IMPORTED FROM HERE INSTEAD
*/
var features = {
  // SVG features.add.vue
  svg: `var geojsonObject = {
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'EPSG:3067'
      }
    },
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [500000, 6939136]
        },
        'properties': {
          'label': 'I am a point feature!',
          'test_property': 'SVG'
        }
      }
    ]
  };
  var params = [geojsonObject, {
    clearPrevious: false,
    centerTo: true,
    cursor: 'zoom-in',
    featureStyle: {
      image: {
        shape: 2,
        size: 1,
        fill: {
          color: '#ff3300'
        },
        stroke: {
          color: '#000000'
        }
      },
      text: {
        scale: 1.3,
        fill: {
          color: 'rgba(0,0,0,1)'
        },
        stroke: {
          color: 'rgba(255,255,255,1)',
          width: 2
        },
        labelProperty: 'label',
        offsetX: 65,
        offsetY: 8
      }
    }
  }];
  channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);`,
  // ADD features.add.vue
  add: `var layerOptions = {
    layerId: 'MY_VECTOR_LAYER',
    layerInspireName: 'Inspire theme name',
    layerOrganizationName: 'Organization name',
    showLayer: true,
    opacity: 100,
    layerName: 'Layer name',
    layerDescription: 'Description text',
    layerPermissions: {
      'publish': 'publication_permission_ok'
    },
    maxScale: 1,
    minScale: 1451336,
    hover: {
      featureStyle: {
        fill: {
          color: '#ff00ff'
        },
        stroke: {
          color: '#000000'
        },
        image: {
          fill: {
            color: '#ff0000'
          },
          radius: 10
        }
      },
      content: [
          { 'key': 'Layer: MY_VECTOR_LAYER' },
          { 'key': 'Test property', 'valueProperty': 'test_property' }
      ]
    }
  };
  channel.postRequest('VectorLayerRequest', [layerOptions]);
  channel.log('VectorLayerRequest posted with data', [layerOptions]);

  var x = 488704;
  var y = 6939136;
  var geojsonObject = {
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'EPSG:3067'
      }
    },
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [[[x, y], [x + 100000, y + 100000], [x + 25000, y + 50000]]]
        },
        'properties': {
          'test_property': 1
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [x + 40000, y + 30000]
        },
        'properties': {
          'test_property': 2
        }
      }

    ]
  };
  var params = [geojsonObject, {
    layerId: 'MY_VECTOR_LAYER',
    clearPrevious: true,
    centerTo: true,
    cursor: 'zoom-in',
    prio: 4,
    featureStyle: {
      text: {
        scale: 1.3,
        fill: {
          color: 'rgba(0,0,0,1)'
        },
        stroke: {
          color: 'rgba(255,255,255,1)',
          width: 2
        },
        labelProperty: 'test_property'
      }
    },
    optionalStyles: [{
      property: { key: 'test_property', value: 2 },
      stroke: {
        color: '#FFFF00'
      },
      image: {
        fill: {
          color: 'rgba(0,0,0,1)'
        },
        radius: 4
      }
    }]
  }];
  channel.postRequest(
    'MapModulePlugin.AddFeaturesToMapRequest',
    params
  );
  channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);

  // Next add features on default vector layer
  var defaultVectorLayerOptions = {
    hover: {
      featureStyle: {
        'inherit': true,
        'effect': 'auto major'
      },
      content: [
          { 'key': 'Layer: default' },
          { 'key': 'Test property', 'valueProperty': 'test_property' }
      ]
    }
  };
  channel.postRequest('VectorLayerRequest', [defaultVectorLayerOptions]);
  channel.log('VectorLayerRequest posted with data', [defaultVectorLayerOptions]);

  var geojsonObject2 = {
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'EPSG:3067'
      }
    },
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [[x + 30000, y], [x + 130000, y + 100000]]
        },
        'properties': {
          'test_property': 'Line'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [x + 30000, y]
        },
        'properties': {
          'test_property': null
        }
      }

    ]
  };

  var params2 = [geojsonObject2, {
    clearPrevious: false,
    centerTo: true,
    featureStyle: {
      fill: {
        color: '#ff0000'
      },
      stroke: {
        color: '#ff0000',
        width: 5
      },
      text: {
        scale: 1.3,
        fill: {
          color: 'rgba(0,0,0,1)'
        },
        stroke: {
          color: 'rgba(255,255,255,1)',
          width: 2
        },
        labelProperty: 'test_property'
      }
    },
    cursor: 'zoom-out',
    prio: 1
  }];

  channel.postRequest(
    'MapModulePlugin.AddFeaturesToMapRequest',
    params2
  );
  channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params2);
  `,
  // UPDATE features.add.vue
  update: `
  // Define the feature to be updated
  var updateFeature = {'test_property': 1};

  var params = [updateFeature, {
    layerId: 'MY_VECTOR_LAYER',
    featureStyle: {
      fill: {
        color: '#FF0000'
      }
    },
    animationDuration: 500
  }];

  channel.postRequest(
  'MapModulePlugin.AddFeaturesToMapRequest',
  params
  );
  `,
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
}
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
  'one': `  var postdata = {
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
  'two': `var postdata = {
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
  'three': `var postdata = {
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
  // GET FEEDBACK REQ feedback.request.vue
  req: `channel.getMapBbox(function(data) {
    var filterdata = {
      "start_date": "2016-09-01T00:00:00Z",
      "bbox": data.left + ',' + data.bottom + ',' + data.right + ',' + data.top,
      "status": "open,closed"
    };
    var data = {
      "srs": "EPSG:3067",
      "payload": filterdata
    };
    channel.postRequest('GetFeedbackRequest', [data]);
  });`,
  // GET FEEDBACK SERVICES feedback.services.vue
  services: {
    list: `channel.postRequest('GetFeedbackServiceRequest', []);`,
    id: `channel.postRequest('GetFeedbackServiceRequest', ["180"]);`
  }
}
var infobox = {
  req: `  //get map center and then show an infobox at that location
  channel.getMapPosition(function(data) {
    var content = [
      {
        'html': '&lt;div&gt;Map position info:&lt;/div&gt;'
      },
      {
        'html': '&lt;div&gt;Center: '+parseInt(data.centerX)+', '+parseInt(data.centerY)+'&lt;/div&gt;',
        'actions': [
          {
            name: "My link 1",
            type: "link",
            action: {
              info: "this can include any info",
              info2: "action-object can have any number of params"

            }
          },
          {
            name: "My link 2",
            type: "link",
            action: {
              info: "this can include any info",
              info2: "action-object can have any number of params"
            }
          }
        ]
      },
      {
        'html': '&lt;div&gt;Zoom level: '+data.zoom+'&lt;/div&gt;'
      },
      {
        'actions': [
          {
            name: "My link 3",
            type: "link",
            action: {
              info: "this can include any info",
              info2: "action-object can have any number of params",
            }
          },
          {
            name: "My link 4",
            type: "link",
            action: {
              info: "this can include any info",
              info2: "action-object can have any number of params",
            }
          },
          {
            name: "My button 1",
            type: "button",
            group: 1,
            action: {
              info: "this can include any info",
              info2: "action-object can have any number of params",
              buttonInfo: "This button has group 1 and is placed to the same row with other actions that have the same group"
            }
          },
          {
            name: "My button 2",
            type: "button",
            group: 1,
            action: {
              info: "this can include any info",
              info2: "action-object can have any number of params",
              buttonInfo: "This button has group 1 and is placed to the same row with other actions that have the same group"
            }
          }
        ]
      }
    ];
    var data = [
      'myInfoBox',
      'Generic info box',
      content,
      {
        'lon': data.centerX,
        'lat': data.centerY
      },
      {
        colourScheme: {
          bgColour: '#00CCFF',
          titleColour: '#FFFFFF',
          headerColour: '#0066FF',
          iconCls: 'icon-close-white',
          buttonBgColour: '#00CCFF',
          buttonLabelColour: '#FFFFFF',
          linkColour: '#000000'
        },
        font: 'georgia',
        positioning: 'left'
      }
    ];

    channel.postRequest('InfoBox.ShowInfoBoxRequest', data);
    channel.log('InfoBox.ShowInfoBoxRequest posted with data', data);
  });`
}
var marker = {
  addDefault: `var data = {
    x: 386020,
    y: 6670057,
    color: 'ff0000',
    msg : '',
    shape: 3, // icon number (0-6)
    size: 3
  };
  channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, MARKER_ID]);`,
  addSvg: `var data = {
    x: 386020,
    y: 6670057,
    msg : '',
    shape: '&#60;svg width="32" height="32">&#60;g fill="#9955ff" transform="matrix(0.06487924,0,0,0.06487924,0,1.73024e-6)">&#60;g>&#60;path d="M 246.613,0 C 110.413,0 0,110.412 0,246.613 c 0,136.201 110.413,246.611 246.613,246.611 136.2,0 246.611,-110.412 246.611,-246.611 C 493.224,110.414 382.812,0 246.613,0 Z m 96.625,128.733 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m -196.743,0 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m 100.738,284.184 c -74.374,0 -138.225,-45.025 -165.805,-109.302 l 48.725,0 c 24.021,39.5 67.469,65.885 117.079,65.885 49.61,0 93.058,-26.384 117.079,-65.885 l 48.725,0 C 385.46,367.892 321.608,412.917 247.233,412.917 Z" />&#60;/g>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;g/>&#60;/g>&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;g transform="translate(0,-461.224)" />&#60;/svg>',
    offsetX: 16, // center point x position from left to right
    offsetY: 16, // center point y position from bottom to up
    size: 3
  };
  channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, MARKER_ID]);`,
  addOwn: `var data = {
    x: 386020,
    y: 6670057,
    shape: 'http://demo.paikkatietoikkuna.fi/Oskari/resources/framework/bundle/mapmodule-plugin/images/marker.png',
    offsetX: 16, // center point x position from left to right
    offsetY: 0 // center point y position from bottom to up
  };
  channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, MARKER_ID]);`
}
var route = {
  result: `  {
    "success": true,
    "plan": {
      "to": {
        "vertexType": "NORMAL",
        "lon": 390034.00018034934,
        "name": "corner of service road and Koirasaarentie",
        "orig": "",
        "lat": 6671672.006009135
      },
      "itineraries": [
        {
          "transfers": 0,
          "walkTime": 381,
          "tooSloped": false,
          "geoJSON": {
            "features": [
              {
                "properties": {
                  "startTime": 1450366500000,
                  "distance": 476.931,
                  "endTime": 1450366881000,
                  "mode": "WALK"
                },
                "type": "Feature",
                "geometry": {
                  "type": "LineString",
                  "coordinates": [
                    [
                      389842.07877171424,
                      6671242.080841911
                    ],
                    [
                      389843.7768205804,
                      6671243.144166887
                    ],
                    [
                      389870.8256342589,
                      6671274.647929972
                    ],
                    [
                      389877.3640309194,
                      6671288.938273188
                    ],
                    [
                      389889.09677866707,
                      6671309.758766002
                    ],
                    [
                      389888.4555012388,
                      6671325.379265161
                    ],
                    [
                      389890.6553711612,
                      6671343.143130694
                    ],
                    [
                      389888.7845465592,
                      6671373.287436124
                    ],
                    [
                      389898.6656690572,
                      6671406.421703335
                    ],
                    [
                      389911.8756084682,
                      6671439.455970851
                    ],
                    [
                      389929.00254671066,
                      6671473.48697394
                    ],
                    [
                      389939.0700160877,
                      6671494.357627388
                    ],
                    [
                      389945.2870980694,
                      6671516.458334743
                    ],
                    [
                      389960.0269640322,
                      6671544.989300754
                    ],
                    [
                      389970.0606493179,
                      6671564.746668732
                    ],
                    [
                      389989.9939904303,
                      6671599.808009706
                    ],
                    [
                      390001.1369856759,
                      6671619.532142801
                    ],
                    [
                      390023.38921349036,
                      6671657.867139279
                    ],
                    [
                      390036.6842070854,
                      6671675.298023889
                    ]
                  ]
                }
              }
            ],
            "type": "FeatureCollection"
          },
          "walkDistance": 476.9767692324481,
          "endTime": 1450366881000,
          "elevationGained": 0,
          "startTime": 1450366500000,
          "duration": 381,
          "waitingTime": 0,
          "elevationLost": 0,
          "walkLimitExceeded": false,
          "legs": [
            {
              "to": {
                "vertexType": "NORMAL",
                "lon": 390034.00018034934,
                "name": "corner of service road and Koirasaarentie",
                "arrival": 1450366881000,
                "orig": "",
                "lat": 6671672.006009135
              },
              "arrivalDelay": 0,
              "pathway": false,
              "agencyTimeZoneOffset": 7200000,
              "steps": [
                {
                  "absoluteDirection": "NORTHEAST",
                  "lon": 389842.5157554888,
                  "distance": "91.148",
                  "area": "false",
                  "stayOn": "false",
                  "relativeDirection": "DEPART",
                  "alerts": "[{alertHeaderText=Unpaved surface}]",
                  "elevation": "[]",
                  "streetName": "track",
                  "bogusName": "false",
                  "lat": 6671242.987759405
                },
                {
                  "absoluteDirection": "NORTH",
                  "lon": 389888.757125883,
                  "distance": "118.40299999999999",
                  "area": "false",
                  "stayOn": "false",
                  "relativeDirection": "CONTINUE",
                  "elevation": "[]",
                  "streetName": "service road",
                  "bogusName": "true",
                  "lat": 6671325.437063239
                },
                {
                  "absoluteDirection": "NORTHEAST",
                  "lon": 389911.95877571765,
                  "distance": "267.38",
                  "area": "false",
                  "stayOn": "false",
                  "relativeDirection": "CONTINUE",
                  "elevation": "[]",
                  "streetName": "Koirasaarentie",
                  "bogusName": "false",
                  "lat": 6671439.8212151695
                }
              ],
              "from": {
                "vertexType": "NORMAL",
                "lon": 389842.5157554888,
                "name": "track",
                "departure": 1450366500000,
                "lat": 6671242.987759405
              },
              "rentedBike": false,
              "endTime": 1450366881000,
              "mode": "WALK",
              "startTime": 1450366500000,
              "realTime": false,
              "distance": 476.931,
              "duration": 381,
              "interlineWithPreviousLeg": false,
              "departureDelay": 0,
              "route": "",
              "legGeometry": {
                "length": 19,
                "geoJSON": {
                  "properties": {
                    "startTime": 1450366500000,
                    "distance": 476.931,
                    "endTime": 1450366881000,
                    "mode": "WALK"
                  },
                  "type": "Feature",
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [
                      [
                        389842.07877171424,
                        6671242.080841911
                      ],
                      [
                        389843.7768205804,
                        6671243.144166887
                      ],
                      [
                        389870.8256342589,
                        6671274.647929972
                      ],
                      [
                        389877.3640309194,
                        6671288.938273188
                      ],
                      [
                        389889.09677866707,
                        6671309.758766002
                      ],
                      [
                        389888.4555012388,
                        6671325.379265161
                      ],
                      [
                        389890.6553711612,
                        6671343.143130694
                      ],
                      [
                        389888.7845465592,
                        6671373.287436124
                      ],
                      [
                        389898.6656690572,
                        6671406.421703335
                      ],
                      [
                        389911.8756084682,
                        6671439.455970851
                      ],
                      [
                        389929.00254671066,
                        6671473.48697394
                      ],
                      [
                        389939.0700160877,
                        6671494.357627388
                      ],
                      [
                        389945.2870980694,
                        6671516.458334743
                      ],
                      [
                        389960.0269640322,
                        6671544.989300754
                      ],
                      [
                        389970.0606493179,
                        6671564.746668732
                      ],
                      [
                        389989.9939904303,
                        6671599.808009706
                      ],
                      [
                        390001.1369856759,
                        6671619.532142801
                      ],
                      [
                        390023.38921349036,
                        6671657.867139279
                      ],
                      [
                        390036.6842070854,
                        6671675.298023889
                      ]
                    ]
                  }
                },
                "points": "_senJewtwCAEy@}AYUe@g@[B_@Eu@H{@_@{@k@}@y@e@a@g@Ss@q@c@a@_AcAc@e@eAkA_@m@"
              },
              "transitLeg": false
            }
          ],
          "transitTime": 0
        }
      ],
      "from": {
        "vertexType": "NORMAL",
        "lon": 389842.5157554888,
        "name": "track",
        "orig": "",
        "lat": 6671242.987759405
      },
      "date": 1450366500000
    },
    "requestParameters": {
      "time": "05:35PM",
      "arriveBy": "false",
      "wheelchair": "false",
      "maxWalkDistance": "1000",
      "fromPlace": {
        "lon": 389842.00018067844,
        "lat": 6671244.00601055
      },
      "toPlace": {
        "lon": 390034.00018034934,
        "lat": 6671672.006009135
      },
      "date": "12-17-2015"
    }
  }`
};
var search = {
  result: `  {
    "success": true,
    "result": {
      "methods": [
        {},
        {},
        {}
      ],
      "totalCount": 4,
      "locations": [
        {
          "id": 0,
          "rank": 10,
          "lon": "389828.281",
          "village": "Vantaa",
          "name": "Vantaa",
          "zoomScale": 56650,
          "type": "Kunta, kaupunki",
          "lat": "6686279.347"
        },
        {
          "id": 1,
          "rank": 30,
          "lon": "383183.648",
          "village": "Hausjärvi",
          "name": "Vantaa",
          "zoomScale": 11300,
          "type": "Kylä, kaupunginosa tai kulmakunta",
          "lat": "6733424.84"
        },
        {
          "id": 2,
          "rank": 50,
          "lon": "387139.034",
          "village": "Helsinki",
          "name": "Vantaa",
          "zoomScale": 5650,
          "type": "Virtavesi",
          "lat": "6683063.213"
        },
        {
          "id": 3,
          "rank": 50,
          "lon": "383746.169",
          "village": "Nurmijärvi",
          "name": "Vantaa",
          "zoomScale": 2800,
          "type": "Talo",
          "lat": "6708499.96"
        }
      ]
    },
    "requestParameters": "Vantaa"
  }`
}
var layer = {
  fill: `var layerId = 1387;
  var params = {
    SLD_BODY:
    '&lt;StyledLayerDescriptor xmlns=\"http://www.opengis.net/sld\" xmlns:ogc=\"http://www.opengis.net/ogc\" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"&gt;'+
    '    &lt;NamedLayer&gt;'+
    '    &lt;Name&gt;oskari:kunnat2013&lt;/Name&gt;'+
    '    &lt;UserStyle&gt;'+
    '    &lt;Title&gt;SLD Cook Book: Simple polygon&lt;/Title&gt;'+
    '    &lt;FeatureTypeStyle&gt;'+
    '    &lt;Rule&gt;'+
    '    &lt;PolygonSymbolizer&gt;'+
    '    &lt;Fill&gt;'+
    '    &lt;CssParameter name="fill"&gt;#000080&lt;/CssParameter&gt;'+
    '    &lt;CssParameter name="fill-opacity"&gt;#000080&lt;/CssParameter&gt;'+
    '    &lt;/Fill&gt;'+
    '    &lt;/PolygonSymbolizer&gt;'+
    '    &lt;/Rule&gt;'+
    '    &lt;/FeatureTypeStyle&gt;'+
    '    &lt;/UserStyle&gt;'+
    '    &lt;/NamedLayer&gt;'+
    '    &lt;/StyledLayerDescriptor&gt;'
  };

  channel.postRequest('MapModulePlugin.MapLayerUpdateRequest', [layerId, true, params]);`
}
var drawing = {
  event: `{
    "name": "DrawingEvent",
    "id": "my functionality id",
    "geojson": "{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[356352,6776320],[428032,6776064]]]},\"properties\":{\"area\":\"0 m2\"}}]}",
    "data": {
      "area": "0 m2",
      "bufferedGeoJson": "{\"type\":\"FeatureCollection\",\"features\":[]}",
      "shape": "Polygon"
    },
    "isFinished": true
  }`
}
export { features, wkt, feedback, infobox, marker, route, search, layer, drawing };
