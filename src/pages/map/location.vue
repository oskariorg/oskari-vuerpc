<template>
  <div>
    <h2>{{ title }}</h2>
    <!-- MapMoveRequest --> 
    <h3>Move map programmatically</h3>
    <p>The {{ requestName }} request can be used to move the map programmatically.</p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequest">Documentation for {{requestName}}</DocumentationLink>
    <CodeSnippet>
var x = {{ LOCATION_POSIO[0] }};
var y =  {{ LOCATION_POSIO[1] }};;
var zoomLevel = {{ zoomLevel }};
channel.postRequest('MapMoveRequest', [x, y, zoomLevel]);
    </CodeSnippet>

    <p>
      Click the button to run the code above
       (you should also see a move event in the log after the map has moved):
      <RunExampleButton @click="moveMap">Move map to Posio</RunExampleButton>
    </p>

    <!-- AfterMapMoveEvent --> 
    <h3>Reacting to map movement</h3>

    <p>Whenever the map location changes whether programmatically or by user
      interaction a "{{ eventName }}" is triggered. Move or zoom the map to show these events in the log.
    </p>
    
    <DocumentationLink type="event" :apiDoc="apiDocPageEvent">Documentation for {{eventName}}</DocumentationLink>
    <CodeSnippet>
{
  'centerX': 411650.70779123,
  'centerY': 6751897.3481153,
  'zoom': 4,
  'scale': 362834
}
    </CodeSnippet>

    <!-- RPC functions --> 
    <h3>RPC API client functions</h3>
    
    <p>
      There's a couple of functions on the RPC API client for getting
       information about the current map location programmatically:<br />
    <DocumentationLink type="bundle" :apiDoc="apiDocPageRPC">Documentation for RPC functions</DocumentationLink>
    </p>

    <!-- getMapPosition() --> 
    <h4>getMapPosition()</h4>
    <p>
      This function can be used to get the center coordinates
       and zoom level for the current map viewport.
    </p>
    <CodeSnippet>
channel.getMapPosition(function (data) {
  channel.log('GetMapPosition:', data);
});
    </CodeSnippet>
    <RunExampleButton @click="logMapPosition">Show position in log</RunExampleButton>
    
    <!-- getMapBbox() --> 
    <h4>getMapBbox()</h4>
    <p>
      This function can be used to get the bbox coordinates 
      for the current map viewport.
    </p>
    
    <CodeSnippet>
channel.getMapBbox(function (data) {
  channel.log('GetMapBbox:', data);
});
    </CodeSnippet>
    <RunExampleButton @click="getMapBbox">Show bbox in log</RunExampleButton>
  </div>
</template>

<script>
const title = 'Map location';

const eventName = 'AfterMapMoveEvent';
const apiDocPageEvent = 'mapping/mapmodule/event/AfterMapMoveEvent.md';
const requestName = 'MapMoveRequest';
const apiDocPageRequest = 'mapping/mapmodule/request/MapMoveRequest.md';
const apiDocPageRPC = 'framework/rpc';

export default {
  name: 'MapLocation',
  label: title,
  data () {
    return {
      title,
      eventName,
      apiDocPageEvent,
      requestName,
      apiDocPageRequest,
      apiDocPageRPC,
      LOCATION_POSIO: [552935, 7332639],
      zoomLevel: 7
    }
  },
  methods: {
    moveMap () {
      this.$root.channel.postRequest('MapMoveRequest',
        [this.LOCATION_POSIO[0], this.LOCATION_POSIO[1], this.zoomLevel]);
      this.$root.channel.log('MapModulePlugin.MapMoveRequest posted with data', [this.LOCATION_POSIO[0], this.LOCATION_POSIO[1], 7]);
    },
    logMapPosition () {
      this.$root.channel.getMapPosition((data) => {
        this.$root.channel.log('GetMapPosition: ', data);
      });
    },
    getMapBbox () {
      this.$root.channel.getMapBbox((data) => {
        this.$root.channel.log('GetMapBbox: ', data);
      });
    }
  }
}
</script>
