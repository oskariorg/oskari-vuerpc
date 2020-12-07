<template>
  <div ref="layerForFeatures">
      <p>
        VectorLayerRequest allows more control for showing vector features on the map.
        You can initializing a layer with styles, scale limits and other toggles that are used for features on that layer.
        This simplifies adding features to that layer since you don't need to send those toggles (some you even can't= on each AddFeaturesToMapRequest.
        For very simple applications or examples it might be easier to use the AddFeaturesToMap since it can be used to initialize a simple layer as well.
      </p>
      <p>
        Initializing a layer can be done by sending the request:
        <code-component>
        channel.postRequest('VectorLayerRequest', [{{ JSON.stringify(LAYER_OPTS.simple, null, 2) }}]);
        </code-component>

        After sending it you can add features to it by referencing the layer by `layerId` in the AddFeaturesToMapRequest.
      </p>
      
      <p>
        You can try different combinations below:
        <ol>
          <li>
            Click <button class="btn btn-primary exampleready" @click="addFeaturesToMapRequest">Add feature</button>
            to add a feature added to the map. However if you hover the feature on the map with mouse nothing happens.
          </li>
          <li>
            Click <button class="btn btn-primary exampleready" @click="removeFeaturesFromMapRequest">Remove feature</button>
            to clean up the map for testing VectorLayerRequest.
          </li>
          <li>
            Click <button class="btn btn-primary exampleready" @click="addSimpleVectorLayer">Add layer</button>
            to initialize a layer for vector features with hover styling. You won't see anything happen on the map when you do this.
            Now click the "Add feature" button on the first step to add a feature to the layer. 
          </li>
          <li>This time the feature has a nice highlighting style when you move the mouse cursor on top of it on the map.
            The hover style was defined in the VectorLayerRequest so you don't need to worry about it when
             pushing more features on the map.
          </li>
          <li>
            You can use VectorLayerRequest to remove the layer (also removes features on the layer).
            After this if you click the "Add features" button the features have lost the hover
             highlighting and you need to initialize the layer again to get it back.<br/>
            <button class="btn btn-primary exampleready" @click="removeSimpleLayer">Remove layer</button>
          </li>
          <li>
            To keep the initialized layer but remove any features on it you can use the "Remove feature" from the second step.
          </li>
        </ol>
      <p>You can define more than just the hover styles with the VectorLayerRequest.
        Documentation links:<br/>
        <a :href="requestLink" class="btn btn-primary exampleready" target="_blank">VectorLayerRequest</a>
        <a :href="styleDocLink" class="btn btn-primary exampleready" target="_blank">Styling</a>
        </p>
      <p>
        Example for removing the layer. Reference with layerId and include a remove-flag:
      
        <code-component>
channel.postRequest('VectorLayerRequest', [{
  layerId: {{ LAYER_OPTS.simple.layerId }},
  remove: true
}]);
        </code-component>
      </p>
  </div>
</template>
<script>
import { LAYER_OPTS, generator } from '../../util/vectorlayer_helpers';

export default {
  name: 'layerForFeatures',
  data () {
    const requestLink = this.$root.documentPathRequest + 'mapping/mapmodule/request/vectorlayerrequest.md'

    return {
      desc: 'Configure vector layers',
      requestLink,
      styleDocLink: '/documentation/examples/oskari-style',
      LAYER_OPTS
    }
  },
  beforeDestroy: () => {
    // Clean up when leaving the example
    // NOTE! We don't have this.$root here so relying on global channel variable
    // const channel = this.$root.channel;
    channel.postRequest('VectorLayerRequest', [{
      layerId: 'MY_VECTOR_LAYER',
      remove: true
    }]);
    channel.postRequest('VectorLayerRequest', [{
      layerId: 'MY_LISTED_VECTOR_LAYER',
      remove: true
    }]);
    channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
  },
  methods: {
    addSimpleVectorLayer () {
      const layerOptions = { ...LAYER_OPTS.simple };
      this.$root.channel.postRequest('VectorLayerRequest', [layerOptions]);
      this.$root.channel.log('VectorLayerRequest posted with data', [layerOptions]);
    },
    removeSimpleLayer () {
      const layerOptions ={
          layerId: LAYER_OPTS.simple.layerId,
          remove: true
      };
      this.$root.channel.postRequest('VectorLayerRequest', [layerOptions]);
      this.$root.channel.log('VectorLayerRequest posted with data', [layerOptions]);
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
          generator.getPolygon(x, y, { 'name': `I'm a polygon` }) /*,
          generator.getPoint(x + 40000, y + 30000, { 'name': `I'm a point` }) */
        ]
      };
      const params = [geojsonObject, {
        layerId: LAYER_OPTS.simple.layerId,
        clearPrevious: true,
        centerTo: true,
        cursor: 'zoom-in'
      }];
      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params
      );
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);

    },
    removeFeaturesFromMapRequest () {
      this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
      this.$root.channel.log('MapModulePlugin.RemoveFeaturesFromMapRequest posted without params');
    }
  }
}
</script>
<style scoped>
/* Need to overwrite styles that are not defined specific enough........ */
ol li {
    display: list-item;
    list-style-type: decimal;
}
a.btn.btn-primary.exampleready {
  /* Need to overwrite the "#select-panel a" color */
  color: white !important;
}
</style>