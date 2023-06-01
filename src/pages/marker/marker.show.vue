<template>
  <div>
    <div>1. Zoom map to Helsinki</div>
    <div>
      2. Add marker to map
      <RunExampleButton @click="addMarker"> MapModulePlugin.AddMarkerRequest </RunExampleButton>
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
    <div>
      3. Hide marker
      <RunExampleButton @click="showHideMarker(false)">
        MapModulePlugin.MarkerVisibilityRequest
      </RunExampleButton>
      <br />
      <DocumentationLink type="request" :apiDoc="apiDocPage">
        To the documentation of MapModulePlugin.MarkerVisibilityRequest
      </DocumentationLink>

      <CodeSnippet>
// If MARKER_ID is not defined then hide all visibled markers
channel.postRequest('MapModulePlugin.MarkerVisibilityRequest', [false, MARKER_ID]);
      </CodeSnippet>
    </div>
    <div>
      4. Show marker
      <RunExampleButton @click="showHideMarker(true)">
        MapModulePlugin.MarkerVisibilityRequest
      </RunExampleButton>
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
  data() {
    return {
      desc: 'Show or hide a marker',
      MARKER_ID: 'RPC_MARKER',
      apiDocPage: 'mapping/mapmodule/request/markervisibilityrequest.md'
    };
  },
  methods: {
    addMarker() {
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
      this.$root.channel.log('MapModulePlugin.AddMarkerRequest posted with data', [
        data,
        this.MARKER_ID
      ]);
    },
    showHideMarker(bool) {
      this.$root.channel.postRequest('MapModulePlugin.MarkerVisibilityRequest', [
        bool,
        this.MARKER_ID
      ]);
      this.$root.channel.log('MapModulePlugin.MarkerVisibilityRequest posted with data', [
        bool,
        this.MARKER_ID
      ]);
    }
  },
  beforeUnmount() {
    this.$root.channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
  }
};
</script>
