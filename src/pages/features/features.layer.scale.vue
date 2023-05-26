<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      {{ requestName }} lets you define scale/resolution/zoom level limits for features on that layer.
    </p>
    <p>
      In this example the map is initialized with the following code adding two vector layers:
      <ul>
        <li>One that will hold polygons that are only shown for zoom levels 7 and further</li>
        <li>One that will hold points that are only shown for zoom levels 7 and closer</li>
      </ul>
      <CodeSnippet>
channel.postRequest('{{ requestName }}', [{{ JSON.stringify(polygonLayer, null, 2) }}]);
channel.postRequest('{{ requestName }}', [{{ JSON.stringify(pointLayer, null, 2) }}]);
      </CodeSnippet>
      
      Then features are pushed to the map on corresponding layers with:
      <CodeSnippet>
channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [geojsonPoints, {
  layerId: '{{ pointLayer.layerId }}'
}]);

channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', 
  [geojsonPolygons, {
    layerId: '{{ polygonLayer.layerId }}'
    centerTo: true
}]);
      </CodeSnippet>
    
      There should a polygon and a point initialized on the map when this example is loaded.
      They are both visible at zoom level 7.
      If you zoom in the polygon isn't shown.
      If you zoom out the point isn't shown.
      If you get lost click the button below:<br />
      <RunExampleButton @click="moveMapToPoint">Locate point</RunExampleButton>
      <DocumentationLink type="request" :apiDoc="apiDocPageRequest">Documentation for {{requestName}}</DocumentationLink>

    </p>
    <h3>Notes</h3>
    <p>Vector layer zoom limits added to Oskari in version 2.2.0.</p>
    
    <p>You can also use minScale, maxScale, minResolution, maxResolution instead of minZoomLevel and maxZoomLevel.
      The zoom level make the most sense for RPC and it's the simplest to use. 
      However if zoom levels are added to or removed from the embedded map for whatever reason by the admin of the
      Oskari-based service the zoom level numbers may change. This shouldn't be a common thing to happen but it's worth knowing about.
      The scale/resolution limits are not affected if this happens, but they are not that easy to determine on an RPC-app.
      You have a reference for scale/zoom level on "AfterMapMoveEvent"s while resolutions are only used internally by the map implementation.
    </p>
  </div>
</template>
<script>
import { generator } from './vectorlayer_helpers';
import EVENTBUS from '../../util/eventbus.js';

const title = 'Configure zoom limits for vector features';
const requestName = 'VectorLayerRequest';

const polygonCollection = generator.getDefaultPolygonCollection();
const pointCollection = generator.getDefaultPointCollection();

const listeners = [];

const polygonLayer = {
  layerId: 'My_polygons',
  maxZoomLevel: 7
};

const pointLayer = {
  layerId: 'My_points',
  minZoomLevel: 7
};

export default {
  name: 'FeatureLayerZoom',
  label: title,
  data () {

    return {
      title,
      requestName,
      apiDocPageRequest: 'mapping/mapmodule/request/vectorlayerrequest.md',
      polygonLayer,
      pointLayer,
      polygonCollection,
      pointCollection
    }
  },
  beforeUnmount: () => {
    // Clean up when user leaves the example
    // NOTE! We don't have this.$root here so relying on global channel variable
    // const channel = this.$root.channel;
    channel.postRequest('VectorLayerRequest', [{
      layerId: pointLayer.layerId,
      remove: true
    }]);
    channel.postRequest('VectorLayerRequest', [{
      layerId: polygonLayer.layerId,
      remove: true
    }]);
    channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
  },
  mounted () {
    if (this.$root.channel.isReady()) {
      this.addVectorLayers();
      this.addFeaturesToMap();
    } else {
      listeners.push(EVENTBUS.on('channel.available', () => {
        this.addVectorLayers();
        this.addFeaturesToMap();
      }));
    }
  },
  methods: {
    moveMapToPoint () {
      const params = [...pointCollection.features[0].geometry.coordinates, 7];
      this.$root.channel.postRequest('MapMoveRequest', params);
      this.$root.channel.log('MapMoveRequest posted with data', params);
    },
    addVectorLayers () {
      const bus = this.$root.channel
      bus.postRequest('VectorLayerRequest', [polygonLayer]);
      bus.postRequest('VectorLayerRequest', [pointLayer]);
      bus.log('VectorLayerRequest posted with data', [polygonLayer]);
      bus.log('VectorLayerRequest posted with data', [pointLayer]);
    },
    addFeaturesToMap () {
      const params = [pointCollection, {
        layerId: pointLayer.layerId
      }];
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);

      const polygonParams = [polygonCollection, {
        layerId: polygonLayer.layerId,
        centerTo: true
      }];
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', polygonParams);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', polygonParams);
    }
  }
}
</script>

<style scoped>
/* Need to overwrite styles that are not defined specific enough........ */
ul li {
    display: list-item;
    list-style-type: disc;
}
</style>