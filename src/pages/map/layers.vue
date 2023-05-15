<template>
  <div>
    <h2>{{ title }}</h2>
    <!-- RPC functions / getAllLayers() --> 
    <h3>Get current map layers</h3>
    <p>RPC API client has a function for listing available map layers: getMapLayers().</p>
    <DocumentationLink type="bundle" :apiDoc="apiDocPageRPC">Documentation for RPC functions</DocumentationLink>

    <CodeSnippet>
channel.getAllLayers(function (data) {
  channel.log('GetAllLayers:', data);
});
    </CodeSnippet>
    <RunExampleButton @click="getAllLayers">Show layers in log</RunExampleButton>
    
    <!-- ChangeMapLayerOpacityRequest --> 
    <h3>Change layer opacity</h3>
    <p>The request {{ requestNameOpacity }} can be used to change layer opacity programmatically.</p>

    <CodeSnippet>
channel.getAllLayers(function (layers) {
  // get the bottom layer
  var layerId = layers[0].id;
  var currentOpacity = layers[0].opacity;
  var newOpacity = currentOpacity !== 100 ? 100 : 50;
  channel.postRequest('{{ requestNameOpacity }}', [layerId, newOpacity]);
});
    </CodeSnippet>

    <DocumentationLink type="request" :apiDoc="apiDocPageOpacity">Documentation for {{ requestNameOpacity }}</DocumentationLink>

    <RunExampleButton @click="toggleOpacity">Toggle opacity</RunExampleButton>
    
    <!-- MapLayerVisibilityRequest --> 
    <h3>Show or hide a layer on map</h3>
    <p>The request {{ requestNameVisibility }} can be used to show or hide a layer on map programmatically.</p>

    <CodeSnippet>
channel.getAllLayers(function (layers) {
  // get the bottom layer
  const layerId = layers[0].id;
  const currentVisibility = layers[0].visible;
  channel.postRequest('{{ requestNameVisibility }}', [layerId, !currentVisibility]);
});
    </CodeSnippet>

    <DocumentationLink type="request" :apiDoc="apiDocPageVisibility">Documentation for {{ requestNameVisibility }}</DocumentationLink>

    <RunExampleButton @click="toggleVisibility">Toggle visibility</RunExampleButton>
    
    <p>
      {{ requestNameOpacity }} and {{ requestNameVisibility }} can also be used to control 
      vector layers that are added to the map programmatically during runtime. 
      Reference the layer with the same id used to add vector layer/features to map.
    </p>
  </div>
</template>

<script>
const title = 'Map Layers';
const apiDocPageRPC = 'framework/rpc';

const requestNameOpacity = 'ChangeMapLayerOpacityRequest';
const apiDocPageOpacity = 'mapping/mapmodule/request/changemaplayeropacityrequest.md';

const requestNameVisibility = 'MapModulePlugin.MapLayerVisibilityRequest';
const apiDocPageVisibility = 'mapping/mapmodule/request/MapModulePlugin.MapLayerVisibilityRequest.md';

export default {
  name: 'MapLayers',
  label: title,
  data () {
    return {
      title,
      apiDocPageRPC,
      requestNameOpacity,
      apiDocPageOpacity,
      requestNameVisibility,
      apiDocPageVisibility
    }
  },
  methods: {
    getAllLayers () {
      this.$root.channel.getAllLayers((data) => {
        this.$root.channel.log('GetAllLayers: ', data);
      });
    },
    toggleOpacity () {
      const me = this;
      this.$root.channel.getAllLayers(function (layers) {
        const layerId = layers[0].id;
        const currentOpacity = layers[0].opacity;
        var newOpacity = currentOpacity !== 100 ? 100 : 50;

        me.$root.channel.postRequest(requestNameOpacity, [layerId, newOpacity]);
        me.$root.channel.log(requestNameOpacity + ' sent with parameters: ', [layerId, newOpacity]);
      });
    },
    toggleVisibility () {
      const me = this;
      this.$root.channel.getAllLayers(function (layers) {
        const layerId = layers[0].id;
        const currentVisibility = layers[0].visible;

        me.$root.channel.postRequest(requestNameVisibility, [layerId, !currentVisibility]);
        me.$root.channel.log(requestNameVisibility + ' sent with parameters: ', [layerId, !currentVisibility]);
      });
    }
  },
  beforeUnmount: () => {
    // Clean up when user leaves the example
    // NOTE! We don't have this.$root here so relying on global channel variable
    // const channel = this.$root.channel;
    channel.resetState(() => {
        channel.log('Map state reset on exiting the example: "' + title + '"');
    });
  }
}
</script>
