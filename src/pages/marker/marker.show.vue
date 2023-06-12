<template>
  <div>
    <p>
      The visibility of the markers on the map can be controlled with a
      <InlineCode>MapModulePlugin.MarkerVisibiltyRequest</InlineCode>. To try out the functionality,
      first add a marker on the map with:
    </p>
    <RunExampleButton @click="addMarker"> MapModulePlugin.AddMarkerRequest </RunExampleButton>
    <CodeSnippet>
const MARKER_ID = 'RPC_MARKER'
const data = {
  x: 386020,
  y: 6670057,
  color: 'ff0000',
  msg : '',
  shape: 3, // icon number (0-6)
  size: 3
};
channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, MARKER_ID]);
    </CodeSnippet>
    <div>
      <p>
        Hide the marker by sending a
        <InlineCode>MapModulePlugin.MarkerVisibiltyRequest</InlineCode> with
        <InlineCode>false</InlineCode> and <InlineCode>MARKER_ID</InlineCode> as parameters. All
        markers are made invisible if <InlineCode>MARKER_ID</InlineCode>
        is omitted from the parameters.
      </p>
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
      <p>
        A marker can be made visible again by sending a
        <InlineCode>MapModulePlugin.MarkerVisibiltyRequest</InlineCode> with
        <InlineCode>true</InlineCode> and <InlineCode>MARKER_ID</InlineCode> as parameters. As in
        the previous example, all markers will be affected by the request if
        <InlineCode>MARKER_ID</InlineCode> is omitted.
      </p>
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
