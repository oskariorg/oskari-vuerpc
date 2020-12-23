import EVENTBUS from './eventbus';

const showPopup = (msg, seconds = 5) => {
  EVENTBUS.notify('rpcAppDisplayMessage', { msg, seconds });
};

export const eventHandlers = {
  RouteResultEvent: (channel, data) => {
    if (!data || !data.success) {
      showPopup('Getting routes failed ! - zoom map center around 1 km to nearest public trafic stop');
    } else {
      let geoJSON = data && data.plan && data.plan.itineraries && data.plan.itineraries.length ? data.plan.itineraries[0].geoJSON : undefined;
      // Plot routes
      if (geoJSON) {
        channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
          geoJSON, {
            clearPrevious: true,
            centerTo: true,
            cursor: 'zoom-in',
            prio: 4,
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
                }
              }
            },
            optionalStyles: [{
              property: {
                value: 'AIRPLANE',
                key: 'mode'
              },
              stroke: {
                color: '#0d92ff',
                width: 10
              }
            }, {
              property: {
                value: 'BUS',
                key: 'mode'
              },
              stroke: {
                color: '#0d92ff',
                width: 10
              }
            }, {

              property: {
                value: 'RAIL',
                key: 'mode'
              },
              stroke: {
                color: '#0d92ff',
                width: 10
              }
            }, {
              property: {
                value: 'FERRY',
                key: 'mode'
              },
              stroke: {
                color: '#0d92ff',
                width: 10,
                lineDash: [10, 20]
              }
            }, {
              property: {
                value: 'TRAM',
                key: 'mode'
              },
              stroke: {
                color: '#0d92ff',
                width: 10
              }
            }, {
              property: {
                value: 'SUBWAY',
                key: 'mode'
              },
              stroke: {
                color: '#0d92ff',
                width: 10
              }
            }, {
              property: {
                value: 'WALK',
                key: 'mode'
              },
              stroke: {
                color: '#0d92ff',
                width: 10,
                lineDash: [0, 10]
              }
            }, {
              property: {
                value: 'BICYCLE',
                key: 'mode'
              },
              stroke: {
                color: '#0d92ff',
                width: 10,
                lineDash: [10, 20]
              }

            }]
          }
        ]);

        // Get route mode changed start points
        const legs = data.plan.itineraries[0].legs;
        const features = [];
        for (let i = 0; i < legs.length; i++) {
          // Draw start points
          const leg = legs[i];
          let feature = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [leg.from.lon, leg.from.lat]
            },
            properties: {
              mode: leg.mode
            }
          };
          features.push(feature);

          // Calculate stops
          for (const j in leg.intermediateStops) {
            const istop = leg.intermediateStops[j];

            feature = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [istop.lon, istop.lat]
              },
              properties: {
                mode: 'stop_' + leg.mode
              }
            };
            features.push(feature);
          }
        }

        // Get end point
        const endPoint = legs[legs.length - 1];
        const endPointFeature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [endPoint.to.lon, endPoint.to.lat]
          },
          properties: {
            mode: 'routeEndPoint'
          }
        };
        features.push(endPointFeature);

        geoJSON = {
          type: 'FeatureCollection',
          crs: {
            type: 'name',
            properties: {
              name: 'EPSG:3067'
            }
          },
          features: features
        };

        if (geoJSON) {
          channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
            geoJSON, {
              clearPrevious: false,
              centerTo: false,
              cursor: 'pointer',
              prio: 1,
              optionalStyles: [
                {
                  property: {
                    value: 'FERRY',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'marker_ferry'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'AIRPLANE',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'marker_flight'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'WALK',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'marker_walk'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'BUS',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'marker_bus'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'RAIL',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'marker_train'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'SUBWAY',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'marker_metro'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'BICYCLE',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'marker_bike'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'routeEndPoint',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'marker_flag'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'stop_RAIL',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'train_stop'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'stop_BUS',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'bus_stop'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'stop_SUBWAY',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'metro_stop'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'stop_FERRY',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'ferry_stop'
                    },
                    size: 5
                  }
                },
                {
                  property: {
                    value: 'stop_AIRPLANE',
                    key: 'mode'
                  },
                  image: {
                    shape: {
                      key: 'routing',
                      name: 'fligth_stop'
                    },
                    size: 5
                  }
                }

              ]
            }
          ]);
        }
      }
    }
  },
  FeedbackResultEvent: (channel, data) => {
    if (!data || !data.success) {
      showPopup('Getting feedback response failed ! ');
    } else {
      showPopup('Getting feedback response success ! ');
      const geoJSON = data && data.data && data.data.getFeedback ? data.data.getFeedback : undefined;
      // Plot routes
      if (geoJSON) {
        channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
          geoJSON, {
            clearPrevious: true,
            centerTo: true,
            cursor: 'zoom-in',
            prio: 4,
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
                }
              }
            }
          }
        ]);
      }
    }
  }
};
