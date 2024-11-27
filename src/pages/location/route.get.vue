<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Oskari allows usage of routing integrations though it requires configuration on the
      Oskari-based application. <InlineCode>{{ requestName }}</InlineCode> can be used to draw a
      route on the map from a pair of starting coordinates to destination coordinates. The request
      supports different transit modes and other options, like maximum walk distance. For more
      information about <InlineCode>{{ requestName }}</InlineCode
      >, see the documentation page: <br />
      <DocumentationLink type="request" :apiDoc="requestName">
        Documentation for {{ requestName }}
      </DocumentationLink>
    </p>
    <p>
      A <InlineCode>GetRouteRequest</InlineCode> can be sent for example with data of the following
      form:
    </p>

    <CodeSnippet :runnable="true" buttonText="Send request">
var data = {
  'fromlat': '6675341',
  'fromlon': '385414',
  'srs': 'EPSG:3067',
  'tolat': '{{ y }}',
  'tolon': '{{ x }}',
  'showIntermediateStops': true,
  'mode': 'TRANSIT,WALK' // TRANSIT, WALK, BICYCLE, TRAIN and so on
};
channel.postRequest('GetRouteRequest', [data]);
    </CodeSnippet>

    <p>
      The example above searches for a route from Pasila to the center point of the map, but note
      that you can try out different transit modes and start and end coordinates by modifying the
      values in the code editor.
    </p>
    <p>
      <DocumentationLink type="request" :apiDoc="requestName">
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
// const apiDocPageRequest = 'mapping/routingService/request/getrouterequest.md';

// listeners is references to event listeners registered
// by this example so we can remove them when the user leaves the page
const listeners = {};

export default {
  name: 'GetRouteRequest',
  label: title,
  data() {
    return {
      title,
      requestName,
      x: 320047,
      y: 7094234,
    };
  },
  mounted() {
    // Show map crosshair when entering page
    if (this.$root.channel.isReady()) {
      this.$root.channel.sendUIEvent(['mapmodule.crosshair'], () => {});
    } else {
      EVENTBUS.once('channel.available', () => {
        this.$root.channel.sendUIEvent(['mapmodule.crosshair'], () => {});
      });
    }

    listeners['RouteResultEvent'] = EVENTBUS.on('RouteResultEvent', (data) => {
      showRouteOnMap(data, this.$root.channel);
    });
    listeners['AfterMapMoveEvent'] = EVENTBUS.on('AfterMapMoveEvent', (data) => {
      this.x = parseInt(data.centerX);
      this.y = parseInt(data.centerY);
    });
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    this.$root.channel.sendUIEvent(['mapmodule.crosshair'], () => {});
    this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
    Object.entries(listeners).forEach(([event, callback]) => {
      EVENTBUS.off(event, callback);
      delete listeners[event];
    });
  }
};

const showPopup = (msg, seconds = 5) => {
  EVENTBUS.notify('rpcAppDisplayMessage', { msg, seconds });
};

const showRouteOnMap = (response = {}, channel) => {
  if (!response.success) {
    showPopup(
      'Getting routes failed ! - zoom map center around 1 km to nearest public traffic stop'
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
