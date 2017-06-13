<template>
  <div id="addOrRemoveFeatures">
    <div id="AddFeaturesToMapRequest">
      <button id="btnAddFeaturesToMapRequest" class="btn btn-primary exampleready" @click="addFeaturesToMapRequest">AddFeaturesToMapRequest</button>
      <button id="btnRemoveFeaturesFromMapRequest" class="btn btn-primary exampleready" @click="removeFeaturesFromMapRequest">RemoveFeaturesFromMapRequest</button>
      <div>AddFeaturesToMapRequest allows adding vector features on the map.</div>
      <div>
        <a id="addFeatures" href="" @click="getLink">To the documentation</a>
      </div>
      <code-component :snippet="add"></code-component>
    </div>
    <div id="AddFeaturesToMapUsingSVG">
      <div>Adding features with SVG icon (Oskari SVG-shape numbers: 0 - 6) </div>
      <button id="btnAddFeaturesToMapRequest2" class="btn btn-primary exampleready" @click="addFeaturesToMapRequestUsingSVG">AddFeaturesToMapRequest (display point as SVG icon)</button>
      <div>
        <a id="addFeatures" href="" @click="getLink">To the documentation</a>
      </div>
      <code-component :snippet="svg"></code-component>
    </div>
    <div id="RemoveFeaturesFromMapRequest">
      <div>Remove all features across all vector layers</div>
      <button id="btnRemoveFeaturesFromMapRequest" class="btn btn-primary exampleready" @click="removeFeaturesFromMapRequest">RemoveFeaturesFromMapRequest</button>
      <div>
        <a id="removeFeatures" href="" @click="getLink">To the documentation</a>
      </div>
      <code-component snippet="//annihilate everything
      channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest',[]);"></code-component>
    </div>
    <div id="RemoveFeaturesFromMapRequest2">
      <div>Remove specific vector features from specific layer</div>
      <button id="btnAddFeaturesToMapRequest" class="btn btn-primary exampleready" @click="addFeaturesToMapRequest">AddFeaturesToMapRequest</button>
      <button id="btnRemoveFeaturesFromMapRequest2" class="btn btn-primary exampleready" @click="removeFeaturesFromMapRequest2">RemoveFeaturesFromMapRequest2</button>
      <div>
        <a id="removeFeatures" href="" @click="getLink">To the documentation</a>
      </div>
      <code-component snippet="// Remove all feature's whose 'test_property' === 1 from the layer with id==='VECTOR'
      channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest',['test_property', 1, 'VECTOR']);"></code-component>
    </div>
  </div>
</template>
<script>
import { features } from '../../util/examplecodes.js';
export default {
  name: 'addOrRemoveFeatures',
  data () {
    return {
      desc: 'Add or remove vector features',
      svg: features.svg,
      add: features.add
    }
  },
  methods: {
    getLink (e) {
      let documentPathEnd = e.target.id === 'addFeatures' ? 'mapping/mapmodule/request/addfeaturestomaprequest.md' : 'mapping/mapmodule/request/removefeaturesfrommaprequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    },
    addFeaturesToMapRequest () {
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
    },
    removeFeaturesFromMapRequest () {
      this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
      this.$root.channel.log('MapModulePlugin.RemoveFeaturesFromMapRequest posted without params');
    },
    removeFeaturesFromMapRequest2 () {
      const params = ['test_property', 1, 'VECTOR'];
      this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', params);
      this.$root.channel.log('MapModulePlugin.RemoveFeaturesFromMapRequest posted with params', params);
    },
    addFeaturesToMapRequestUsingSVG () {
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
              'type': 'Point',
              'coordinates': [488704, 6939136]
            },
            'properties': {
              'label': 'I am a point feature!'
            }
          }
        ]
      };
      const params = [geojsonObject, {
        clearPrevious: false,
        centerTo: true,
        cursor: 'zoom-in',
        featureStyle: {
          image: {
            shape: 2,
            size: 1,
            color: '#ff3300',
            stroke: '#000000'
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
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);
    }
  }
}
</script>
