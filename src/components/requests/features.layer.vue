<template>
  <div id="layerForFeatures">
    <div>
      <button class="btn btn-primary exampleready" @click="removeFeaturesFromMapRequest">Clean up features from map</button>
      <div>
        VectorLayerRequest allows more control for showing vector features on the map.
        You can initializing a layer with styles, scale limits and other toggles that are used for features on that layer.
        This simplifies adding features to that layer since you don't need to send those toggles (some you even can't= on each AddFeaturesToMapRequest.
        For very simple applications or examples it might be easier to use the AddFeaturesToMap since it can be used to initialize a simple layer as well.</div>
      <div>
        <a href="" @click="getLink">To the documentation</a>
      </div>
      <p>
        Initializing a layer can be done by sending the request:
      <code-component>
        channel.postRequest('VectorLayerRequest', [{{ JSON.stringify(LAYER_OPTS.simple, null, 2) }}]);
      </code-component>
      After sending it you can add features to it by referencing the layer by `layerId` in the AddFeaturesToMapRequest.
      
      <button class="btn btn-primary exampleready" @click="addFeaturesToMapRequest">Add layer and features</button>
      </p>
      <div>You can remove the layer from the map with the same request. </div>
      
      <code-component>
        channel.postRequest('VectorLayerRequest', [{
          layerId: {{ LAYER_OPTS.simple.layerId }},
          remove: true
        }]);
      </code-component>
      <button class="btn btn-primary exampleready" @click="removeSimpleLayer">Remove layer</button>
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

const LAYER_OPTS = {
    simple: {
      layerId: 'MY_VECTOR_LAYER',
      opacity: 75,
      hover: {
        featureStyle: {
          fill: {
            color: '#ff00ff'
          },
          stroke: {
            color: '#000000'
          }
        },
        content: [
            { 'key': 'Layer: MY_VECTOR_LAYER' },
            { 'key': 'Name', 'valueProperty': 'name' }
        ]
      }
    },
    
    listing: {
      layerId: 'MY_LISTED_VECTOR_LAYER',
      layerInspireName: 'My layer group',
      layerOrganizationName: 'Organization name',
      showLayer: true,
      opacity: 100,
      layerName: 'Layer name',
      layerDescription: 'Description text',
      minZoomLevel: 6
    }
};
const generator = {
  getPolygon: (x, y, attributes) => {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [[[x, y], [x + 100000, y + 100000], [x + 25000, y + 50000]]]
      },
      'properties': { ...attributes }
    };
  },
  getPoint: (x, y, attributes) => {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [x, y]
      },
      'properties': { ...attributes }
    };
  }
}

export default {
  name: 'layerForFeatures',
  data () {
    return {
      desc: 'Add or remove vector features',
      svg: features.svg,
      add: features.add,
      update: features.update,
      LAYER_OPTS
    }
  },
  beforeDestroy: () => {
    // Clean up
    console.log('vector layer cleanup start');
    //const channel = this.$root.channel;
    // NOTE! We don't have this.$root here so relying on global channel variable
    channel.postRequest('VectorLayerRequest', [{
      layerId: 'MY_VECTOR_LAYER',
      remove: true
    }]);
    channel.postRequest('VectorLayerRequest', [{
      layerId: 'MY_LISTED_VECTOR_LAYER',
      remove: true
    }]);
    channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
    console.log('vector layer cleanup end');
  },
  methods: {
    getLink (e) {
      e.target.href = this.$root.documentPathRequest + 'mapping/mapmodule/request/vectorlayerrequest.md';
    },
    addFeaturesToMapRequest () {
      const layerOptions = { ...LAYER_OPTS.simple };
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
          generator.getPolygon(x, y, { 'name': `I'm a polygon` }) /*,
          generator.getPoint(x + 40000, y + 30000, { 'name': `I'm a point` }) */
        ]
      };
      const params = [geojsonObject, {
        layerId: LAYER_OPTS.simple.layerId,
        clearPrevious: true,
        centerTo: true,
        cursor: 'zoom-in',
        prio: 4
      }];
      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params
      );
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);

    },
    removeSimpleLayer () {
      
      this.$root.channel.postRequest('VectorLayerRequest', [{
          layerId: LAYER_OPTS.simple.layerId,
          remove: true
      }]);
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
