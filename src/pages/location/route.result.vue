<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Occurs after a route search has been completed providing a result for it.</p>
    <DocumentationLink type="event" :apiDoc="apiDocPage">
      Documentation for {{ title }}
    </DocumentationLink>

    <CodeSnippet>{{ result }}</CodeSnippet>
  </div>
</template>

<script>
const apiDocPage = 'mapping/routingService/event/routeresultevent.md';
const title = 'RouteResultEvent';

export default {
  name: title,
  label: title,
  data() {
    return {
      title,
      apiDocPage,
      result: routeResult
    };
  }
};

var routeResult = `{
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
}`;
</script>
