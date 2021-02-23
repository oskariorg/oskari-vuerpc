<template>
  <div ref="GetFeatureInfoRequest">
    To show feature info box for a certain layer you must ensure first that the layer visibility is set to true and then proceed to send GetFeatureInfoRequest.
    <br><br>
    1. Set visibility of wanted layer as true.
    <button id="btnMapModulePluginLayerVisibilityRequest" class="btn btn-primary exampleready" @click="mapLayerVisibilityRequest">MapModulePlugin.MapLayerVisibilityRequest</button>
    <code-component snippet="channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [492, true]);
  channel.log('MapModulePlugin.MapLayerVisibilityRequest posted with data', [492, true]);"></code-component>

    2. Show feature info box
    <button id="btnMapModulePluginGetFeatureInfoRequest" class="btn btn-primary exampleready" @click="getFeatureInfoRequest">MapModulePlugin.GetFeatureInfoRequest</button>
    <div>
      <a id="getFeatureInfo" href="" @click="getLink">To the documentation</a>
    </div>

    <code-component snippet="//get map center and display and feature info box
  channel.getMapPosition(function(data){
    var lonlat = [data.centerX, data.centerY];
    channel.postRequest('MapModulePlugin.GetFeatureInfoRequest', lonlat);
    channel.log('MapModulePlugin.GetFeatureInfoRequest posted with data', lonlat);
  });"></code-component>
  </div>
</template>
<script>
export default {
  name: 'GetFeatureInfoRequest',
  label: 'Get feature info',
  data () {
    return {
      desc: 'Get feature info'
    }
  },
  methods: {
    mapLayerVisibilityRequest () {
      this.$root.channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [492, true]);
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
  }
}
</script>
