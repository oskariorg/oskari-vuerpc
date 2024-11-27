<template>
  <div>
    <p>
      The visibility of the markers on the map can be controlled with a
      <InlineCode>MapModulePlugin.MarkerVisibiltyRequest</InlineCode>. To try out the functionality,
      first add a marker on the map with:
    </p>
    <CodeSnippet :runnable="true" buttonText="Add marker">
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
      <DocumentationLink type="request" :apiDoc="apiDocPage">
        To the documentation of MapModulePlugin.MarkerVisibilityRequest
      </DocumentationLink>

      <CodeSnippet :runnable="true" buttonText="Hide marker">
// If MARKER_ID is not defined then hide all visibled markers
var MARKER_ID = 'RPC_MARKER';
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
      <CodeSnippet :runnable="true" buttonText="Show marker">
// If MARKER_ID is not defined then show all unvisibled markers
var MARKER_ID = 'RPC_MARKER';
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
      apiDocPage: 'mapping/mapmodule/request/MapModulePlugin.MarkerVisibilityRequest.md'
    };
  },
  beforeUnmount() {
    this.$root.channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
  }
};
</script>
