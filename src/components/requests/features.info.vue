<template>
  <div ref="GetFeatureInfoRequest">
    To show feature info box for a certain layer you must ensure first that the layer visibility is set to true and then proceed to send GetFeatureInfoRequest.
    <br><br>
    1. Set visibility of wanted layer as true. In this example visibility is set to true already.
    <CodeSnippet snippet="channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [492, true]);
  channel.log('MapModulePlugin.MapLayerVisibilityRequest posted with data', [492, true]);"></CodeSnippet>

    2. Show feature info box
    <button id="btnMapModulePluginGetFeatureInfoRequest" class="btn btn-primary exampleready" @click="getFeatureInfoRequest">MapModulePlugin.GetFeatureInfoRequest</button>
    <div>
      <a id="getFeatureInfo" href="" @click="getLink">To the documentation</a>
    </div>

    <CodeSnippet snippet="//get map center and display and feature info box
  channel.getMapPosition(function(data){
    var lonlat = [data.centerX, data.centerY];
    channel.postRequest('MapModulePlugin.GetFeatureInfoRequest', lonlat);
    channel.log('MapModulePlugin.GetFeatureInfoRequest posted with data', lonlat);
  });"></CodeSnippet>
  </div>
</template>
<script>
import EVENTBUS from '../../util/eventbus.js';

const listeners = [];
let layerVisibility = false;

export default {
  name: 'GetFeatureInfoRequest',
  label: 'Get feature info',
  data () {
    return {
      desc: 'Get feature info'
    }
  },
  methods: {
    mapLayerVisibilityRequest (showLayer) {
      layerVisibility = showLayer;
      this.$root.channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [492, showLayer]);
      this.$root.channel.log('MapModulePlugin.MapLayerVisibilityRequest posted with data', [492, true]);
    },
    getFeatureInfoRequest () {
      this.$root.channel.getMapPosition((data) => {
        const lonlat = [data.centerX, data.centerY];
        this.$root.channel.postRequest('MapModulePlugin.GetFeatureInfoRequest', lonlat);
        this.$root.channel.log('MapModulePlugin.GetFeatureInfoRequest posted with data', lonlat);
      });
    },
    getLink (e) {
      let documentPathEnd = 'mapping/mapmodule/request/GetFeatureInfoRequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  },
  mounted () {
    if (this.$root.channel && !layerVisibility) {
      this.mapLayerVisibilityRequest(true);
    }
    listeners.push(EVENTBUS.on('channel.available', (event) => {
      if (!layerVisibility) {
        this.mapLayerVisibilityRequest(true);
      }
    }));
  },
  updated () {

  },
  beforeDestroy () {
    this.mapLayerVisibilityRequest(false);
    while (listeners.length) {
      EVENTBUS.off('rpcAppDisplayMessage', listeners.pop());
    }
  }
}

const toggleLayerVisibility = () => {
  this.$root.channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [492, true]);
  this.$root.channel.log('MapModulePlugin.MapLayerVisibilityRequest posted with data', [492, true]);
};
</script>
