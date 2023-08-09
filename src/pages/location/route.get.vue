<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Allows usage of routing integrations (requires configuration on the Oskari-based application).
    </p>

    <CodeSnippet>
var data = {
  'fromlat': '6683840',
  'fromlon': '360448',
  'srs': 'EPSG:3067',
  'tolat': '6675728',
  'tolon': '394240',
  'mode': 'TRANSIT,WALK' // TRANSIT, WALK, BICYCLE, TRAIN and so on
};
channel.postRequest('GetRouteRequest', [data]);
    </CodeSnippet>

    <p>The examples here searches for a route from Pasila to the center point of the map:</p>
    <RunExampleButton @click="getRouteRequest('TRANSIT,WALK')">
      GetRouteRequest (transit,walk)
    </RunExampleButton>
    <RunExampleButton @click="getRouteRequest('WALK')"> GetRouteRequest (walk) </RunExampleButton>
    <RunExampleButton @click="getRouteRequest('BICYCLE')">
      GetRouteRequest (bicycle)
    </RunExampleButton>
    <p>
      <DocumentationLink type="request" :apiDoc="apiDocPageRequest">
        Documentation for {{ requestName }}
      </DocumentationLink>
    </p>
  </div>
</template>

<script>
import EVENTBUS from '../../util/eventbus';
import { RouteHelper } from './RouteHelper';
import { generator } from '../features/vectorlayer_helpers';

const title = 'Get route';
const requestName = 'GetRouteRequest';
const apiDocPageRequest = 'mapping/routingService/request/getrouterequest.md';

// listeners is references to event listeners registered
// by this example so we can remove them when the user leaves the page
const listeners = [];

const getPayload = (x = 394240, y = 6675728, mode = 'TRANSIT,WALK') => {
  return {
    fromlat: '6675341',
    fromlon: '385414',
    srs: 'EPSG:3067',
    tolat: y,
    tolon: x,
    showIntermediateStops: 'true',
    mode: mode
  };
};
export default {
  name: 'GetRouteRequest',
  label: title,
  data() {
    return {
      title,
      requestName,
      apiDocPageRequest,
      requestPayload: getPayload()
    };
  },
  mounted() {
    listeners.push(
      EVENTBUS.on('RouteResultEvent', (data) => {
        showRouteOnMap(data, this.$root.channel);
      })
    );
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
    while (listeners.length) {
      EVENTBUS.off('RouteResultEvent', listeners.pop());
    }
  },
  methods: {
    getRouteRequest(mode) {
      this.$root.channel.getMapPosition((data) => {
        const datain = getPayload(data.centerX, data.centerY, mode);
        this.$root.channel.postRequest('GetRouteRequest', [datain]);
        this.$root.channel.log('GetRouteRequest posted with data', datain);
      });
    }
  }
};

const showPopup = (msg, seconds = 5) => {
  EVENTBUS.notify('rpcAppDisplayMessage', { msg, seconds });
};

const showRouteOnMap = (response = {}, channel) => {
  if (!response.success) {
    showPopup(
      'Getting routes failed ! - zoom map center around 1 km to nearest public trafic stop'
    );
    return;
  }
  let geoJSON =
    response.plan && response.plan.itineraries && response.plan.itineraries.length
      ? response.plan.itineraries[0].geoJSON
      : undefined;

  if (!geoJSON) {
    showPopup('Getting geojson for route failed!');
    return;
  }
  // Plot routes
  const data = response.plan.itineraries[0];

  channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
    data.geoJSON,
    RouteHelper.getBaseStyle()
  ]);

  const legsGeoJSON = generator.getCollectionOf(
    RouteHelper.generateRouteLegsForStylingPurposes(data)
  );
  channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
    legsGeoJSON,
    RouteHelper.getLegsStyle()
  ]);
};
</script>

<style></style>
