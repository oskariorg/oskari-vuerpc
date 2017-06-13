<template>
  <div ref="GetFeatureInfoRequest">
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
  data () {
    return {
      desc: 'Get feature info'
    }
  },
  methods: {
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
