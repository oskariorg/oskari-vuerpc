<template>
  <div id="addOrRemoveFeatures">
    <div id="AddFeaturesToMapRequest">
      <button id="btnAddFeaturesToMapRequest" class="btn btn-primary exampleready" @click="addFeaturesToMapRequest">AddFeaturesToMapRequest</button>
      <button id="btnRemoveFeaturesFromMapRequest" class="btn btn-primary exampleready" @click="removeFeaturesFromMapRequest">RemoveFeaturesFromMapRequest</button>
      <div>AddFeaturesToMapRequest allows adding vector features on the map.</div>
      <div>
        <a id="addFeatures" href="" @click="getLink">To the documentation</a>
      </div>
      <div>
        <a href="" @click="getLayerRequestLink">To VectorLayerRequest documentation</a>
      </div>
      <code-component :snippet="add"></code-component>
      <div>You can update feature style for example when you want to higlight feature from the map. </div>
      <button class="btn btn-primary exampleready" @click="updateFeatures">AddFeaturesToMapRequest (update feature)</button>
      <code-component :snippet="update"></code-component>
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
      <code-component snippet="// Remove all feature's whose 'test_property' === 1 from the layer with id==='MY_VECTOR_LAYER'
      channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest',['test_property', 1, 'MY_VECTOR_LAYER']);"></code-component>
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
      add: features.add,
      update: features.update
    }
  },
  methods: {
    getLink (e) {
      let documentPathEnd = e.target.id === 'addFeatures' ? 'mapping/mapmodule/request/addfeaturestomaprequest.md' : 'mapping/mapmodule/request/removefeaturesfrommaprequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    },
    getLayerRequestLink (e) {
      e.target.href = this.$root.documentPathRequest + 'mapping/mapmodule/request/vectorlayerrequest.md';
    },
    addFeaturesToMapRequest () {
      const layerOptions = {
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
      this.$root.channel.postRequest('VectorLayerRequest', [layerOptions]);
      this.$root.channel.log('VectorLayerRequest posted with data', [layerOptions]);

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
      const params = [geojsonObject, {
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
      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params
      );
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);

      // Next add features on default vector layer
      const defaultVectorLayerOptions = {
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
      this.$root.channel.postRequest('VectorLayerRequest', [defaultVectorLayerOptions]);
      this.$root.channel.log('VectorLayerRequest posted with data', [defaultVectorLayerOptions]);

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
              'test_property': 'Point'
            }
          }

        ]
      };

      const params2 = [geojsonObject2, {
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

      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params2
      );
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params2);
    },
    updateFeatures () {
      // Define the feature to be updated
      var updateFeature = {'test_property': 1};

      var params = [updateFeature, {
        layerId: 'MY_VECTOR_LAYER',
        featureStyle: {
          fill: {
            color: '#00FF00'
          }
        },
        animationDuration: 500
      }];
      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params
      );
    },
    removeFeaturesFromMapRequest () {
      this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
      this.$root.channel.log('MapModulePlugin.RemoveFeaturesFromMapRequest posted without params');
    },
    removeFeaturesFromMapRequest2 () {
      const params = ['test_property', 1, 'MY_VECTOR_LAYER'];
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
              'coordinates': [500000, 6939136]
            },
            'properties': {
              'label': 'I am a point feature!',
              'test_property': 'SVG'
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
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);
    }
  }
}
</script>
