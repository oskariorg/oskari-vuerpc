<template>
  <div id="GetFeatures">
    <div>
      1. Add features to map
      <button id="btnAddFeaturesToMapRequest" class="btn btn-primary exampleready" @click="addFeatures" >AddFeaturesToMapRequest</button>
    </div>

    <div>
      2. Get features grouped by layers
      <button id="btnGetFeaturesFunction" class="btn btn-primary exampleready" @click="getFeatures(true)" >getFeatures(true)</button>
    </div>
    <code-component>
    channel.getFeatures([true], function(data) {
      channel.log('GetFeatures: ', data);
    });
    </code-component>
    <div>
      Get only layerIds without features
      <button id="btnGetFeaturesFunction" class="btn btn-primary exampleready" @click="getFeatures">getFeatures()</button>
    </div>
    <code-component>
      channel.getFeatures([], function(data) {
        channel.log('GetFeatures: ', data);
      });
    </code-component>
  </div>
</template>
<script>
export default {
  name: 'GetFeatures',
  label: 'Get features',
  data () {
    return {
      desc: 'Get features'
    }
  },
  methods: {
    getFeatures (includeFeatures = false) {
      this.$root.channel.getFeatures([includeFeatures], (data) => {
        this.$root.channel.log('GetFeatures: ', data);
      });
    },
    addFeatures () {
      const x = 488704;
      const y = 6939136;
      const geojsonObject = {
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
              'coordinates': [[x, y], [x + 100000, y + 100000]]
            },
            'properties': {
              'test_property': 1
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [x, y]
            },
            'properties': {
              'test_property': 2
            }
          }

        ]
      };

      const testOptions = {
        'minResolution': 0,
        'maxResolution': 1000
      };
      const params = [geojsonObject, {
        clearPrevious: true,
        layerOptions: testOptions,
        centerTo: true,
        cursor: 'zoom-in',
        prio: 4,
        minScale: 1451336
      }];

      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params
      );
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);

      const geojsonObject2 = {
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

      const testOptions2 = {
        'minResolution': 0,
        'maxResolution': 1000
      };
      const params2 = [geojsonObject2, {
        clearPrevious: false,
        layerOptions: testOptions2,
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

      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params2
      );
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params2);
    }
  }
}
</script>
