<template>
  <div>
    <h2>{{ title }}</h2>
    <!-- RPC functions / getAllLayers() -->
    <h3>Get current map layers</h3>
    <p>
      RPC API client has a function for listing available map layers:
      <InlineCode>getAllLayers()</InlineCode>.
    </p>
    <DocumentationLink type="bundle" :apiDoc="apiDocPageRPC">
      Documentation for RPC functions
    </DocumentationLink>

    <CodeSnippet :runnable="true" buttonText="Show layers in log">
channel.getAllLayers(function (data) {
  channel.log('GetAllLayers:', data);
});
    </CodeSnippet>

    <!-- ChangeMapLayerOpacityRequest -->
    <h3>Change layer opacity</h3>
    <p>
      The request <InlineCode>{{ requestNameOpacity }}</InlineCode> can be used to change layer
      opacity programmatically.
    </p>

    <CodeSnippet :runnable="true" buttonText="Toggle opacity">
channel.getAllLayers(function (layers) {
  // get the bottom layer
  var layerId = layers[0].id;
  var currentOpacity = layers[0].opacity;
  var newOpacity = currentOpacity !== 100 ? 100 : 50;
  channel.postRequest('{{ requestNameOpacity }}', [layerId, newOpacity]);
});
    </CodeSnippet>

    <DocumentationLink type="request" :apiDoc="apiDocPageOpacity">
      Documentation for {{ requestNameOpacity }}
    </DocumentationLink>

    <!-- MapLayerVisibilityRequest -->
    <h3>Show or hide a layer on map</h3>
    <p>
      The request <InlineCode>{{ requestNameVisibility }}</InlineCode> can be used to show or hide a
      layer on map programmatically.
    </p>

    <CodeSnippet>
channel.getAllLayers(function (layers) {
  // get the bottom layer
  const layerId = layers[0].id;
  const currentVisibility = layers[0].visible;
  channel.postRequest('{{ requestNameVisibility }}', [layerId, !currentVisibility]);
});
    </CodeSnippet>

    <DocumentationLink type="request" :apiDoc="apiDocPageVisibility">
      Documentation for {{ requestNameVisibility }}
    </DocumentationLink>

    <div v-for="n in numberOfLayers" :key="n">
      <RunExampleButton @click="toggleVisibility(n - 1)">
        Toggle layer {{ n }} visibility
      </RunExampleButton>
    </div>

    <p>
      <InlineCode>{{ requestNameOpacity }}</InlineCode> and
      <InlineCode>{{ requestNameVisibility }}</InlineCode> can also be used to control vector layers
      that are added to the map programmatically during runtime. Reference the layer with the same
      id used to add vector layer/features to map.
    </p>

    <p>
      It is also possible to rearrange layers with the request
      <InlineCode>RearrangeSelectedMapLayerRequest</InlineCode>. Given the id of the layer and the
      new position, the request modifies the position of the layer in relation to other layers on
      the map.
      <CodeSnippet>
channel.getAllLayers(function (layers) {
  const layerId = layers[0].id;
  const newPos = 1;
  channel.postRequest('RearrangeSelectedMapLayerRequest', [layerId, newPos]);
});
      </CodeSnippet>
      Note! You should have the opacity toggled on and have all layers from this page's previous
      examples visible when trying this example. Otherwise, it will be difficult to see what happens
      when the buttons are pressed. In this example, pressing the buttons pushes the layer back,
      i.e. the current layer on top of the stack gets pushed one stage lower.
    </p>
    <div v-for="n in numberOfLayers" :key="n">
      <RunExampleButton @click="rearrangeLayers(n - 1)"> Reorder layer {{ n }} </RunExampleButton>
    </div>
    <DocumentationLink type="request" :apiDoc="apiDocPageRearrange">
      Documentation for RearrangeSelectedMapLayerRequest
    </DocumentationLink>
  </div>
</template>

<script>
import EVENTBUS from '../../util/eventbus.js';

const title = 'Map Layers';
const apiDocPageRPC = 'framework/rpc';

const requestNameOpacity = 'ChangeMapLayerOpacityRequest';
const apiDocPageOpacity = 'mapping/mapmodule/request/changemaplayeropacityrequest.md';

const requestNameVisibility = 'MapModulePlugin.MapLayerVisibilityRequest';
const apiDocPageVisibility =
  'mapping/mapmodule/request/MapModulePlugin.MapLayerVisibilityRequest.md';
const apiDocPageRearrange = 'mapping/mapmodule/request/rearrangeselectedmaplayerrequest.md';

export default {
  name: 'MapLayers',
  label: title,
  data() {
    return {
      title,
      apiDocPageRPC,
      requestNameOpacity,
      apiDocPageOpacity,
      requestNameVisibility,
      apiDocPageVisibility,
      apiDocPageRearrange,
      numberOfLayers: 0
    };
  },
  methods: {
    toggleVisibility(n = 0) {
      const me = this;
      this.$root.channel.getAllLayers(function (layers) {
        if (n >= layers.length) return;
        const layerId = layers[n].id;
        const currentVisibility = layers[n].visible;

        me.$root.channel.postRequest(requestNameVisibility, [layerId, !currentVisibility]);
        me.$root.channel.log(requestNameVisibility + ' sent with parameters: ', [
          layerId,
          !currentVisibility
        ]);
      });
    },
    rearrangeLayers(n) {
      const me = this;
      this.$root.channel.getAllLayers((layers) => {
        const layerId = layers[n].id;
        const newPos = n >= layers.length ? 0 : n + 1;

        me.$root.channel.postRequest('RearrangeSelectedMapLayerRequest', [layerId, newPos]);
      });
    }
  },
  mounted() {
    if (this.$root.channel.isReady()) {
      this.$root.channel.getAllLayers((data) => {
        this.numberOfLayers = data.length;
      });
    } else {
      EVENTBUS.once('channel.available', () => {
        this.$root.channel.getAllLayers((data) => {
          this.numberOfLayers = data.length;
        });
      });
    }
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    this.$root.channel.resetState(() => {
      this.$root.channel.log('Map state reset on exiting the example: "' + title + '"');
    });
  }
};
</script>
