<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      {{ requestName }} allows more control for showing vector features on the map.
    </p>
    <p>
      You can initializing a layer with styles, scale limits and other toggles that are used for vector features on that layer.
      This simplifies adding features to that layer since you don't need to send those toggles (some you even can't) on each AddFeaturesToMapRequest.
      For very simple applications or examples it might be easier to use the AddFeaturesToMap since it can be used to initialize a simple layer as well.
    </p>
    <p>
      Initializing a layer can be done by sending the "{{ requestName }}" request:
      <CodeSnippet>
        channel.postRequest('{{ requestName }}', [{{ JSON.stringify(LAYER_OPTS.simple, null, 2) }}]);
      </CodeSnippet>

      After sending it you can add features to it by referencing the layer by `layerId` in the AddFeaturesToMapRequest.
    </p>
      
    <p>You can try different combinations below:
      <ol>
        <li>
          Click <RunExampleButton @click="addFeaturesToMapRequest">Add feature</RunExampleButton>
          to add a feature added to the map.
          <CodeSnippet>
const params = [geojson, {
  layerId: '{{ LAYER_OPTS.simple.layerId }}',
  clearPrevious: true,
  centerTo: true,
  cursor: 'zoom-in'
}];
channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
          </CodeSnippet>
        However if you hover the feature on the map with mouse nothing happens (the cursor changes based on the request parameter "cursor" with value supported in CSS).
        </li>
        <li>
          Click <RunExampleButton @click="removeFeaturesFromMapRequest">Remove features</RunExampleButton>
          to clean up the map for testing VectorLayerRequest.
          <CodeSnippet>
            channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
          </CodeSnippet>
        </li>
        <li>
          Click <RunExampleButton @click="addSimpleVectorLayer">Add layer</RunExampleButton>
          to initialize a layer for vector features with hover styling.
          <CodeSnippet>
            channel.postRequest('{{ requestName }}', [{{ JSON.stringify(LAYER_OPTS.simple, null, 2) }}]);
          </CodeSnippet>
          <b>Note!</b> You won't see anything happen on the map when you do this.
          Now click the "Add feature" button below or on the first step to add a feature to the layer.<br />
          <RunExampleButton @click="addFeaturesToMapRequest">Add feature</RunExampleButton><br />
          The important part is that the layerId on both requests match.
        </li>
        <li>This time the feature has a nice highlighting style when you move the mouse cursor on top of it on the map.
          The hover style was defined in the VectorLayerRequest so you don't need to worry about it when
            pushing more features on the map.
        </li>
        <li>
          You can use VectorLayerRequest to remove the layer (also removes features on the layer).
          After this if you click the "Add features" button the features have lost the hover
            highlighting and you need to initialize the layer again to get it back.<br/>
          <CodeSnippet>
channel.postRequest('VectorLayerRequest', [{
  layerId: '{{ LAYER_OPTS.simple.layerId }}',
  remove: true
}]);
          </CodeSnippet>
          <RunExampleButton @click="removeSimpleLayer">Remove layer</RunExampleButton>
        </li>
        <li>
          To keep the initialized layer but remove any features on it you can use the "Remove feature" from the second step.
        </li>
      </ol>
    </p>
    <p>You can define more than just the hover styles with the VectorLayerRequest.
      Documentation links:
      <ul>
      <li><DocumentationLink type="request" :apiDoc="apiDocPageRequest">Documentation for {{requestName}}</DocumentationLink></li>
      <li><DocumentationLink :href="styleDocLink">Styling</DocumentationLink></li>
      </ul>
    </p>
    <p>
      Example for removing the layer. Reference with layerId and include a remove-flag:
    
      <CodeSnippet>
channel.postRequest('VectorLayerRequest', [{
  layerId: '{{ LAYER_OPTS.simple.layerId }}',
  remove: true
}]);
      </CodeSnippet>
    </p>
  </div>
</template>
<script>
import { LAYER_OPTS, generator } from './vectorlayer_helpers';

const title = 'Configure layer for vector features';
const requestName = 'VectorLayerRequest';

const x = 488704;
const y = 6939136;
const geojsonObject = generator.getCollectionOf([
    generator.getPolygon(x, y, { 'name': `I'm a polygon` }) /*,
    generator.getPoint(x + 40000, y + 30000, { 'name': `I'm a point` }) */
]);

export default {
  name: 'FeatureLayer',
  label: title,
  data () {

    return {
      title,
      requestName,
      apiDocPageRequest: 'mapping/mapmodule/request/vectorlayerrequest.md',
      styleDocLink: 'https://oskari.org/documentation/examples/oskari-style',
      LAYER_OPTS,
      geojsonObject
    }
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    this.$root.channel.postRequest('VectorLayerRequest', [{
      layerId: LAYER_OPTS.simple.layerId,
      remove: true
    }]);
    this.$root.channel.postRequest('VectorLayerRequest', [{
      layerId: LAYER_OPTS.listing.layerId,
      remove: true
    }]);
    this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
  },
  methods: {
    addSimpleVectorLayer () {
      const layerOptions = { ...LAYER_OPTS.simple };
      this.$root.channel.postRequest('VectorLayerRequest', [layerOptions]);
      this.$root.channel.log('VectorLayerRequest posted with data', [layerOptions]);
    },
    removeSimpleLayer () {
      const layerOptions = {
          layerId: LAYER_OPTS.simple.layerId,
          remove: true
      };
      this.$root.channel.postRequest('VectorLayerRequest', [layerOptions]);
      this.$root.channel.log('VectorLayerRequest posted with data', [layerOptions]);
    },
    addFeaturesToMapRequest () {
      const params = [geojsonObject, {
        layerId: LAYER_OPTS.simple.layerId,
        clearPrevious: true,
        centerTo: true,
        cursor: 'zoom-in'
      }];
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
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