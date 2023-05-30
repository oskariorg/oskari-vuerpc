<template>
  <div>
    <h2>{{ title }}</h2>
    <p>AddFeaturesToMapRequest allows updating vector features that have been pushed to the map with the same request.</p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequestAdd">Documentation for {{ requestNameAdd }}</DocumentationLink>

    When you open this example the map should have a point and a polygon pushed on it with the {{ requestNameAdd }} with a code like this:
    <CodeSnippet>
var geojson = {
  "type": "FeatureCollection",
  "features": [... shortened ...]
};
channel.postRequest('{{ requestNameAdd }}', [geojson, {{ JSON.stringify(centerToGeomOpts, null, 2) }}]);
    </CodeSnippet>

    <h3>Updating feature style</h3>
    <p>You can update feature style for example when you want to higlight feature from the map. </p>
    <RunExampleButton @click="togglePointStyle">Toggle point style</RunExampleButton>
    <RunExampleButton @click="togglePolygonStyle">Toggle polygon style</RunExampleButton>
    <p>Click the buttons above to cycle through styles for point and polygon. See the log for details what is sent.
      Instead of a geojson as first parameter on {{ requestNameAdd }} when updating you can send a selector that matches the feature property you want to update.
      The example uses a random animationDuration option when updating the polygon style.
    </p>

    <DocumentationLink href="https://oskari.org/documentation/examples/oskari-style">Documentation for styles</DocumentationLink>
  </div>
</template>

<script>
import { generator } from './vectorlayer_helpers';
import { pointStyles, polygonStyles, createStyleCycler } from './vectorstyles_helpers';

import EVENTBUS from '../../util/eventbus.js';

const title = 'Update vector feature style';
const requestNameAdd = 'MapModulePlugin.AddFeaturesToMapRequest';
const apiDocPageRequestAdd = 'mapping/mapmodule/request/addfeaturestomaprequest.md';
const vectorLayerName = 'MY_VECTOR_LAYER';

const x = 488704;
const y = 6939136;
const geomPolygon = generator.getPolygon(x, y, { 'name': `I'm a polygon` });
const geomPoint = generator.getPoint(x + 40000, y + 30000, { 'name': `I'm a point` });
const geojsonObject = generator.getCollectionOf([geomPolygon, geomPoint]);
const centerToGeomOpts = {
  centerTo: true,
  layerId: vectorLayerName
};

const getNextPointStyle = createStyleCycler(pointStyles);
const getNextPolygonStyle = createStyleCycler(polygonStyles);

const listeners = [];

export default {
  name: 'UpdateFeatures',
  label: title,
  data () {
    return {
      title,
      geojsonObject,
      centerToGeomOpts,
      requestNameAdd,
      apiDocPageRequestAdd,
      vectorLayerName
    }
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
    this.$root.channel.postRequest('VectorLayerRequest', [{
      layerId: vectorLayerName,
      remove: true
    }]);
    while (listeners.length) {
      EVENTBUS.off('channel.available', listeners.pop());
    }
  },
  mounted () {
    if (this.$root.channel.isReady()) {
      this.addFeaturesToMap();
    } else {
      listeners.push(EVENTBUS.on('channel.available', () => {
        this.addFeaturesToMap();
      }));
    }
  },
  methods: {
    addFeaturesToMap () {
      // remove any previous points
      this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
      // add point and polygon to the map
      const params = [geojsonObject, centerToGeomOpts];
      this.$root.channel.postRequest(requestNameAdd, params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);
    },
    togglePolygonStyle () {
      // Define the feature to be updated
      var polygonSelector = { name: geomPolygon.properties.name };
      var params = [polygonSelector, {
        layerId: vectorLayerName,
        featureStyle: getNextPolygonStyle(),
        animationDuration: Math.round(Math.random() * 500)
      }];
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
    },
    togglePointStyle () {
      // Define the feature to be updated
      var pointSelector = { name: geomPoint.properties.name };
      var params = [pointSelector, {
        layerId: vectorLayerName,
        featureStyle: getNextPointStyle()
      }];
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);
    }
  }
}
</script>
