<template>
  <div>
    <h2>{{ title }}</h2>
    To show feature info box for a certain layer you must ensure first that the layer visibility is set to true and then proceed to send GetFeatureInfoRequest.
    Note that not all layers support querying feature info.
    In this example we have a layer called "Forest vegetation zones" that is automatically toggled on the map when you access the page.
    That layer supports querying the feature info so you can use the `MapModulePlugin.GetFeatureInfoRequest` to trigger a query.
    That same query happens if the user clicks on the map but with the request you can do it programmatically.
    <ol>
      <li>You can programmatically change the visibility of a layer.
      In this example visibility for the GFI supporting layer is is set to true when accessing the example so when you send the GFI request you can see the result.
      Note that if you toggle the layer visibility from the map UI so it's not shown the GFI request does nothing.
      <CodeSnippet>channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [{{ gfiLayerId }}, true]);</CodeSnippet>
      </li>

      <li> Show feature info box

    <CodeSnippet>
// get map center and display feature info box for the center coordinates
channel.getMapPosition(function (data) {
  channel.postRequest('MapModulePlugin.GetFeatureInfoRequest', [data.centerX, data.centerY]);
});
    </CodeSnippet>
      </li>
    </ol>
    <RunExampleButton @click="getFeatureInfoRequest">Send {{ requestName }} with map center coordinates</RunExampleButton>
    <DocumentationLink type="request" :apiDoc="apiDocPage">Documentation for {{ requestName }}</DocumentationLink>
  </div>
</template>
<script>
import EVENTBUS from '../../util/eventbus.js';

const title = 'Get feature info';
const requestName = 'MapModulePlugin.GetFeatureInfoRequest';
const gfiLayerId = 492;
const listeners = [];

export default {
  name: 'GetFeatureInfoRequest',
  label: title,
  data () {
    return {
      title,
      gfiLayerId,
      requestName,
      apiDocPage: 'mapping/mapmodule/request/GetFeatureInfoRequest.md'
    }
  },
  methods: {
    mapLayerVisibilityRequest (showLayer) {
      this.$root.channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [gfiLayerId, showLayer]);
      this.$root.channel.log('MapModulePlugin.MapLayerVisibilityRequest posted with data', [gfiLayerId, true]);
    },
    getFeatureInfoRequest () {
      this.$root.channel.getMapPosition((data) => {
        const lonlat = [data.centerX, data.centerY];
        this.$root.channel.postRequest(requestName, lonlat);
        this.$root.channel.log(requestName + ' posted with data', lonlat);
      });
    }
  },
  mounted () {
    if (this.$root.channel) {
      this.mapLayerVisibilityRequest(true);
    }
    listeners.push(EVENTBUS.on('channel.available', () => {
        this.mapLayerVisibilityRequest(true);
    }));
  },
  beforeDestroy () {
    this.mapLayerVisibilityRequest(false);
    while (listeners.length) {
      EVENTBUS.off('channel.available', listeners.pop());
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
