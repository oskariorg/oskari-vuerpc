<template>
  <div id="showOrHideMarkers">
    <div>
      1. Zoom map to Helsinki
    </div>
    <div>
      2. Add marker to map
      <button id="btnMarkerShowHideAddMarker" class="btn btn-primary exampleready" @click="showHideMarkerAddMarker">MapModulePlugin.AddMarkerRequest</button>
      <div>
        <a id="linkShowHideMarkerAddMarkersToMap" href="" @click="getLink">To the documentation</a>
      </div>

      <CodeSnippet>
var data = {
  x: 386020,
  y: 6670057,
  color: 'ff0000',
  msg : '',
  shape: 3, // icon number (0-6)
  size: 3
};
channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, MARKER_ID]);
      </CodeSnippet>
    </div>
    <div>3. Hide marker
      <button id="btnMarkerShowHideHideMarker" class="btn btn-primary exampleready" @click="showHideMarkerHideMarker">MapModulePlugin.MarkerVisibilityRequest</button>
      <div>
        <a id="linkShowHideMarkerMarkerVisibilityRequest" href="" @click="getLink">To the documentation</a>
      </div>

      <CodeSnippet>
// If MARKER_ID is not defined then hide all visibled markers
channel.postRequest('MapModulePlugin.MarkerVisibilityRequest', [false, MARKER_ID]);
      </CodeSnippet>
    </div>
    <div>4. Show marker
      <button id="btnMarkerShowHideShowMarker" class="btn btn-primary exampleready" @click="showHideMarkerShowMarker">MapModulePlugin.MarkerVisibilityRequest</button>
      <div>
        <a id="linkShowHideMarkerMarkerVisibilityRequest2" href="" @click="getLink">To the documentation</a>
      </div>

      <CodeSnippet>
// If MARKER_ID is not defined then show all unvisibled markers
channel.postRequest('MapModulePlugin.MarkerVisibilityRequest', [true, MARKER_ID]);
      </CodeSnippet>
    </div>
  </div>
</template>
<script>
export default {
  name: 'showOrHideMarkers',
  label: 'Show or hide a marker',
  data () {
    return {
      desc: 'Show or hide a marker',
      MARKER_ID: 'RPC_MARKER'
    }
  },
  methods: {
    showHideMarkerAddMarker () {
      const data = {
        x: 386020,
        y: 6670057,
        color: 'ff0000',
        msg: '',
        shape: 3, // icon number (0-6)
        size: 3
      };
      this.$root.channel.postRequest('MapMoveRequest', [data.x, data.y, 7]);
      this.$root.channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, this.MARKER_ID]);
      this.$root.channel.log('MapModulePlugin.AddMarkerRequest posted with data', [data, this.MARKER_ID]);
    },
    showHideMarkerShowMarker () {
      this.$root.channel.postRequest('MapModulePlugin.MarkerVisibilityRequest', [true, this.MARKER_ID]);
      this.$root.channel.log('MapModulePlugin.MarkerVisibilityRequest posted with data', [true, this.MARKER_ID]);
    },
    showHideMarkerHideMarker () {
      this.$root.channel.postRequest('MapModulePlugin.MarkerVisibilityRequest', [false, this.MARKER_ID]);
      this.$root.channel.log('MapModulePlugin.MarkerVisibilityRequest posted with data', [false, this.MARKER_ID]);
    },
    getLink (e) {
      var documentPathEnd = e.target.id === 'linkShowHideMarkerAddMarkersToMap' ? 'mapping/mapmodule/request/addmarkerrequest.md' : 'mapping/mapmodule/request/markervisibilityrequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  },
  beforeUnmount: () => {
    channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
  }
}
</script>
