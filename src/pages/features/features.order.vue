<template>
  <div>
    <h2>{{ title }}</h2>
    <p>When features are pushed to the map they normally appear in the order they were pushed in.
      An exception to this is when you define different layers to push to.
      The features on the most recently "created" layer (through VectorLayerRequest or referencing a layer by id in {{ requestNameAdd }})
      will always on top of the features in layers created before it.
      There might be other means of changing the order of layers with features but without any rearranging this will be true.
    </p>
    <p>
      There is a way to affect the order of features on a layer when pushed to the map with {{ requestNameAdd }}.
      The request options can include a "prio" value meaning priority:
      <CodeSnippet>
var geojson = {
  "type": "FeatureCollection",
  "features": [... shortened ...]
};
channel.postRequest(
  '{{ requestNameAdd }}',
  [geojson, { "prio": 5 }]);
      </CodeSnippet>
    </p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequestAdd">Documentation for {{ requestNameAdd }}</DocumentationLink>

    <p>
      When you enter the page a feature collection of 3 polygons will be pushed to the map. 
      You can toggle the style of the third polygon (located in the middle/overlapping the other two)
      by clicking the button below. As it is pushed to the map last it will be drawn on top of the other two.
    </p>
    <RunExampleButton @click="togglePolygonStyle">Toggle middle polygon style</RunExampleButton>

    <h2>Using priority</h2>
    <p>The same three polygons can be pushed to the map with the three buttons below. 
      The difference is that they are all pushed with their own requests.
      This allows adding them with different styles and priorities.
      They are all pushed in the same order (south-west, northeast, middle) but with different priority values and styles.
      Without priority they would be shown in the order they are pushed to the map.
    </p>

    <h3>Middle one between the others</h3>
    <p>
      The first polygon pushed to the map (south-west) has a lower prio number set than the middle one so it's shown ABOVE the middle one.
      The second polygon pushed to the map (north-east) has a larger prio number set than the middle one so it's shown BENEATH the middle one.
      Without specifying prio the draw order would be middle on top, then north-east, then south-west.
      <ol>
        <li>The first one (south-west) has prio 1.</li>
        <li>Second one (north-east) has prio 3.</li>
        <li>Third one (middle) has prio 2.</li>
      </ol>
    </p>
    <RunExampleButton @click="runExample(1)">Update features on map</RunExampleButton>
    <RunExampleButton @click="togglePolygonStyle">Toggle middle polygon style</RunExampleButton>

    <h3>Reverse draw order</h3>
    <p>
      The first one pushed (south-west) is the one with lowest prio so it's shown on top, then north-east and last the middle one.
      <ol>
        <li>The first one (south-west) has prio 1.</li>
        <li>Second one (north-east) has prio 2.</li>
        <li>Third one (middle) has prio 3.</li>
      </ol>
    </p>
    <RunExampleButton @click="runExample(2)">Update features on map</RunExampleButton>
    <RunExampleButton @click="togglePolygonStyle">Toggle middle polygon style</RunExampleButton>
    
    <h3>Prio same as push order</h3>
    <p>
      All polygons have prio and they are descending order so it matches the case where no prio is specified.
      <ol>
        <li>The first one (south-west) has prio 3.</li>
        <li>Second one (north-east) has prio 2.</li>
        <li>Third one (middle) has prio 1.</li>
      </ol>
      The lowest prio (middle) should be shown on top, then north-east and last the middle one.
      This is the same order as they were when the example page is accessed.
    </p>
    <RunExampleButton @click="runExample(3)">Update features on map</RunExampleButton>
    <RunExampleButton @click="togglePolygonStyle">Toggle middle polygon style</RunExampleButton>

    <h3>Note!</h3>
    <p>
      A mix of features having prio and ones without prio on the same layer will give you mixed results
      and draw order will be controllable in a meaningful way. 
    </p>
    <p>
      Pushing feature collection (multiple features) with same prio and another set with different prio needs some testing how it works in practice.
    </p>
  </div>
</template>

<script>
import { generator } from './vectorlayer_helpers';
import { polygonStyles, createStyleCycler } from './vectorstyles_helpers';

import EVENTBUS from '../../util/eventbus.js';

const title = 'Order of features';
const requestNameAdd = 'MapModulePlugin.AddFeaturesToMapRequest';
const apiDocPageRequestAdd = 'mapping/mapmodule/request/addfeaturestomaprequest.md';
const vectorLayerName = 'MY_VECTOR_LAYER';

const x = 488704;
const y = 6939136;
const polygons = [
  generator.getRectangle(x, y, { 'name': `I'm a polygon` }),
  generator.getRectangle(x + 150, y + 50, { 'name': `I'm a polygon 2` }),
  generator.getRectangle(x + 75, y + 25, { 'name': `I'm a polygon 3` })];
const geojsonObject = generator.getCollectionOf(polygons);
const centerToGeomOpts = {
  centerTo: true,
  layerId: vectorLayerName
};

const getNextPolygonStyle = createStyleCycler(polygonStyles);

export default {
  name: 'FeatureOrder',
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
  beforeUnmount: () => {
    // Clean up when user leaves the example
    // NOTE! We don't have this.$root here so relying on global channel variable
    // const channel = this.$root.channel;
    channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
    channel.postRequest('VectorLayerRequest', [{
      layerId: vectorLayerName,
      remove: true
    }]);
  },
  mounted () {
    const init = () => {
      this.addFeaturesToMap();
    };
    // this is required since channel might not be available (when opening this example with direct url) when loaded
    //  but App.vue will trigger an event when the channel is ready
    if (typeof channel !== 'object') {
      EVENTBUS.once('channel.available', init);
    } else {
      init();
    }
  },
  methods: {
    runExample (example) {
      // remove any previous points
      this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
      if (example === 1) {
        this.addFeature(polygons[0], polygonStyles[0], 1);
        this.addFeature(polygons[1], polygonStyles[1], 3);
        this.addFeature(polygons[2], polygonStyles[2], 2);
      }
      else if (example === 2) {
        this.addFeature(polygons[0], polygonStyles[0], 1);
        this.addFeature(polygons[1], polygonStyles[1], 2);
        this.addFeature(polygons[2], polygonStyles[2], 3);
      }
      else if (example === 3) {
        this.addFeature(polygons[0], polygonStyles[0], 3);
        this.addFeature(polygons[1], polygonStyles[1], 2);
        this.addFeature(polygons[2], polygonStyles[2], 1);
      }
    },
    addFeature (feature, style, priorityNum) {
      const geojson = generator.getCollectionOf([feature]);
      // add point and polygon to the map
      const params = [geojson, {
        ...centerToGeomOpts,
        featureStyle: style || getNextPolygonStyle()
      }];
      if (typeof priorityNum === 'number') {
        params[1].prio = priorityNum;
      }
      this.$root.channel.postRequest(requestNameAdd, params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);
    },
    addFeaturesToMap () {
      // remove any previous points
      this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
      // add point and polygon to the map
      const params = [geojsonObject, {
        ...centerToGeomOpts,
        featureStyle: getNextPolygonStyle()
      }];
      this.$root.channel.postRequest(requestNameAdd, params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);
    },
    togglePolygonStyle () {
      // Define the feature to be updated
      var polygonSelector = { name: polygons[2].properties.name };
      var params = [polygonSelector, {
        layerId: vectorLayerName,
        featureStyle: getNextPolygonStyle(),
        animationDuration: 500
      }];
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
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
</style>
