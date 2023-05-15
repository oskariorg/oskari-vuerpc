<template>
  <div>
    <h2>{{ title }}</h2>
    <p>AddFeaturesToMapRequest allows adding vector features like points, lines and polygons on the map.</p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequestAdd">Documentation for {{ requestNameAdd }}</DocumentationLink>

    <h3>Add point to map</h3>
    <CodeSnippet>
var geojson = {{ JSON.stringify(pointGeoJSON, null, 2) }};
// push vector features on geojson to map
channel.postRequest('{{ requestNameAdd }}', [geojson]);
    </CodeSnippet>

    <RunExampleButton @click="addPointToMap">Add point to map</RunExampleButton>
    <p>
      When you run the above code the vector feature is added to the map. 
      However the map isn't moved to show the features by default.
    </p>
    <RunExampleButton @click="moveMapToPoint">Center map to show the point with MapMoveRequest</RunExampleButton>

    <h3>Add point to map and show it</h3>
    <p>
      A common use case is that you want to show the added feature(s) immediately and you can do it by
      giving another parameter called "centerTo" for the request:
    </p>
    <CodeSnippet>
channel.postRequest('{{ requestNameAdd }}', 
  [geojson, {{ JSON.stringify(centerToGeomOpts)}}]);
    </CodeSnippet>
    <RunExampleButton @click="addPointToMap(true)">Add point and move map</RunExampleButton>
    <p>Note! If you added the point to the map with previous button you should remove it before clicking this. There's a remove button below.
      Also test moving the map so the point to be added isn't in the viewport to see the full effect.
    </p>
    <p>
      However this introduces another problem where especially with point features the map can be zoomed "too close". 
      On version 2.2.0 a flag was added for maxZoomLevel to restrict zooming (on previous versions also minScale works to limit zooming).
      However you can also use ZoomToFeaturesRequest that has even more versatile usage for moving the map to show features:
    </p>
    <CodeSnippet>
channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', 
  [{ maxZoomLevel: 4 }]);
    </CodeSnippet>
    <RunExampleButton @click="zoomToPoint">Zoom to point (limited by zoom level)</RunExampleButton>
    <p>Note! This does nothing if the point is not on map</p>

    <h3>Removing features</h3>
    <p>Remove all features across all vector layers</p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequestRemove">Documentation for {{requestNameRemove}}</DocumentationLink>
    <CodeSnippet>
      channel.postRequest('{{ requestNameRemove }}', []);
    </CodeSnippet>
    <RunExampleButton @click="removeFeaturesFromMapRequest">{{ requestNameRemove }}</RunExampleButton>

    <p>You can also use another toggle on the "{{ requestNameAdd }}"
      parameters: "clearPrevious" to clear existing features from the map before adding new features:
    </p>
    <CodeSnippet>
channel.postRequest('{{ requestNameAdd }}', 
  [geojson, { "clearPrevious": true }]);
    </CodeSnippet>

    <h3>Changing layer visibility</h3>
    <p>
      Note that you can also hide layer with MapLayerVisibilityRequest without removing it. For example and info about it see <DocumentationLink type="request" :apiDoc="apiDocLayerVisiblity">documentation.</DocumentationLink>
    </p>
    
    <h3>Events to react to</h3>
    <p>
      When clicking the example buttons on this page you get "FeatureEvent" lines in the log-panel.
      When a feature is added, removed or clicked on the map the event is triggered which lets you react to it.
      You can ensure that the features were correctly added to the map for the user, get a generated id for the
      features to reference them by later on.
    </p>
    <DocumentationLink type="event" :apiDoc="apiDocPageEvent">Documentation for FeatureEvent</DocumentationLink>

    <h3>Note!</h3>
    <p>
      Using the "{{ requestNameAdd }}" without referencing a layer in extra parameters a default layer with id 'VECTOR' is generated.
      On later examples you can see how to use different layers for features can be used for more complex interaction and styling of features.
      You can also see a layerId referenced on the FeatureEvent.
    </p>

  </div>
</template>

<script>
import { generator } from './vectorlayer_helpers';

const title = 'Add/remove vector features';
const requestNameAdd = 'MapModulePlugin.AddFeaturesToMapRequest';
const requestNameRemove = 'MapModulePlugin.RemoveFeaturesFromMapRequest';
const apiDocPageRequestAdd = 'mapping/mapmodule/request/addfeaturestomaprequest.md';
const apiDocPageRequestRemove = 'mapping/mapmodule/request/removefeaturesfrommaprequest.md';
const apiDocPageEvent = 'mapping/mapmodule/event/featureevent.md';
const apiDocLayerVisiblity = 'mapping/mapmodule/request/MapModulePlugin.MapLayerVisibilityRequest.md';

const pointGeoJSON = generator.getDefaultPointCollection();
const centerToGeomOpts = {
  centerTo: true,
  maxZoomLevel: 4
};

export default {
  name: 'AddFeatures',
  label: title,
  data () {
    return {
      title,
      pointGeoJSON,
      centerToGeomOpts,
      requestNameAdd,
      requestNameRemove,
      apiDocPageRequestAdd,
      apiDocPageRequestRemove,
      apiDocPageEvent,
      apiDocLayerVisiblity
    }
  },
  beforeUnmount: () => {
    // Clean up when user leaves the example
    // NOTE! We don't have this.$root here so relying on global channel variable
    // const channel = this.$root.channel;
    channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
  },
  methods: {
    addPointToMap (moveMap = false) {
      // remove any previous points
      // this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
      // add point to the map
      let opts = {
        "clearPrevious": true
      };
      if (moveMap) {
        opts = {
          ...centerToGeomOpts,
          ...opts
        };
      }
      const params = [pointGeoJSON, opts];
      this.$root.channel.postRequest(requestNameAdd, params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);
    },

    moveMapToPoint () {
      const params = pointGeoJSON.features[0].geometry.coordinates;
      this.$root.channel.postRequest('MapMoveRequest', params);
      this.$root.channel.log('MapMoveRequest posted with data', params);
    },

    zoomToPoint () {
      var maxZoomParams = {
        maxZoomLevel: 4
      };
      this.$root.channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', [maxZoomParams]);
    },

    removeFeaturesFromMapRequest () {
      this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
      this.$root.channel.log('MapModulePlugin.RemoveFeaturesFromMapRequest posted without params');
    }

  }
}
</script>
