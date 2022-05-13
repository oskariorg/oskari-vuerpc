<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Clicking the buttons will zoom the map to Helsinki to see markers working.</p>
    <DocumentationLink type="request" apiDoc="mapping/mapmodule/request/addmarkerrequest.md">Documentation for MapModulePlugin.AddMarkerRequest</DocumentationLink>

    <h3>Add marker with a built-in icon</h3>
    <p>Adding markers with Oskari default icons (shape number between 0 and 6). Icon size is an abstracted number. The pixel size is calculated with <InlineCode>size * 10 + 40px</InlineCode></p>
    <CodeSnippet>
var markerData = {{ JSON.stringify(markerIcon, null, 2) }};
channel.postRequest('MapMoveRequest', [markerData.x, markerData.y,  {{zoomLevel}}]);
channel.postRequest('MapModulePlugin.AddMarkerRequest', [markerData, '{{MARKER_ID}}']);
    </CodeSnippet>
    <RunExampleButton @click="addMarkerDefaultIcon()">Add marker with built-in symbol</RunExampleButton><br>

    <h3>Add marker with custom SVG</h3>
    <p>Adding markers with own svg icon (happy face icon). Note that icon size is in pixels.</p>
    <CodeSnippet>
var markerData = {{ JSON.stringify(markerSVG, null, 2) }};
channel.postRequest('MapMoveRequest', [markerData.x, markerData.y,  {{zoomLevel}}]);
channel.postRequest('MapModulePlugin.AddMarkerRequest', [markerData, '{{MARKER_ID}}']);
    </CodeSnippet>
    <RunExampleButton @click="addMarkerSVGIcon()">Add marker with custom SVG</RunExampleButton><br>

    <h3>Add marker with custom PNG</h3>
    <p>Adding markers with own icon. Note that icon size is in pixels.</p>
    <CodeSnippet>
var markerData = {{ JSON.stringify(markerPNG, null, 2) }};
channel.postRequest('MapMoveRequest', [markerData.x, markerData.y,  {{zoomLevel}}]);
channel.postRequest('MapModulePlugin.AddMarkerRequest', [markerData, '{{MARKER_ID}}']);
    </CodeSnippet>
    <RunExampleButton @click="addMarkerPNGIcon()">Add marker with custom PNG</RunExampleButton><br>

    <h3>Marker events</h3>
    <p><InlineCode>AfterAddMarkerEvent</InlineCode> event is triggered when a marker has been added to map. The event provides an id for the marker that was added.</p>
    <CodeSnippet>
{
  "id": "{{MARKER_ID}}"
}
    </CodeSnippet>
    <DocumentationLink type="event" apiDoc="mapping/mapmodule/event/AfterAddMarkerEvent.md">Documentation for AfterAddMarkerEvent</DocumentationLink>
    <p><!-- Just to provide a bit of white space... --></p>

    <p><InlineCode>MarkerClickEvent</InlineCode> event is triggered when a marker is clicked on the map. The event provides an id for the marker that was clicked.</p>
    <CodeSnippet>
{
  "id": "{{MARKER_ID}}"
}
    </CodeSnippet>
    <DocumentationLink type="event" apiDoc="mapping/mapmodule/event/MarkerClickEvent.md">Documentation for MarkerClickEvent</DocumentationLink>
    <p><!-- Just to provide a bit of white space... --></p>

    <h3>Removing markers</h3>
    <RunExampleButton @click="removeMarkersRequest()">MapModulePlugin.RemoveMarkersRequest</RunExampleButton><br>
    <DocumentationLink type="request" apiDoc="mapping/mapmodule/request/removemarkersrequest.md">Documentation for MapModulePlugin.RemoveMarkersRequest</DocumentationLink>
    <CodeSnippet>
channel.postRequest('MapModulePlugin.RemoveMarkersRequest', ['{{MARKER_ID}}']);
// Or all markers
channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
    </CodeSnippet>
  </div>
</template>
<script>
const title = 'Add or remove a marker';
const markerCoordinates = {
    x: 386020,
    y: 6670057,
};
const MARKER_ID = 'RPC_MARKER'
const zoomLevel = 9;
const markerIcon = {
  ...markerCoordinates,
  color: 'ff0000',
  shape: 3,
  size: 3
};
const markerSVG = {
  ...markerCoordinates,
  shape: '<svg ><g fill="#9955ff" transform="matrix(0.06487924,0,0,0.06487924,0,1.73024e-6)"><g><path d="M 246.613,0 C 110.413,0 0,110.412 0,246.613 c 0,136.201 110.413,246.611 246.613,246.611 136.2,0 246.611,-110.412 246.611,-246.611 C 493.224,110.414 382.812,0 246.613,0 Z m 96.625,128.733 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m -196.743,0 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m 100.738,284.184 c -74.374,0 -138.225,-45.025 -165.805,-109.302 l 48.725,0 c 24.021,39.5 67.469,65.885 117.079,65.885 49.61,0 93.058,-26.384 117.079,-65.885 l 48.725,0 C 385.46,367.892 321.608,412.917 247.233,412.917 Z" /></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></g><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /></svg>',
  offsetX: 16,
  offsetY: 16,
  size: 64
};

const markerPNG = {
  ...markerCoordinates,
  shape: 'https://www.oskari.org/images/done.png',
  msg: 'done',
  offsetX: 12,
  offsetY: 12,
  size: 24
};
export default {
  name: 'AddMarkerRequest',
  label: title,
  data () {
    return {
      title,
      MARKER_ID,
      zoomLevel,
      markerIcon,
      markerSVG,
      markerPNG
    }
  },
  methods: {
    addMarkerDefaultIcon () {
      const markerData = markerIcon;
      this.$root.channel.postRequest('MapMoveRequest', [markerData.x, markerData.y, zoomLevel]);
      this.$root.channel.postRequest('MapModulePlugin.AddMarkerRequest', [markerData, MARKER_ID]);
      this.$root.channel.log('MapModulePlugin.AddMarkerRequest posted with data', [markerData, MARKER_ID]);
    },
    addMarkerSVGIcon () {
      const markerData = markerSVG;
      this.$root.channel.postRequest('MapMoveRequest', [markerData.x, markerData.y, zoomLevel]);
      this.$root.channel.postRequest('MapModulePlugin.AddMarkerRequest', [markerData, MARKER_ID]);
      this.$root.channel.log('MapModulePlugin.AddMarkerRequest posted with data', [markerData, MARKER_ID]);
    },
    addMarkerPNGIcon () {
      const markerData = markerPNG;
      this.$root.channel.postRequest('MapMoveRequest', [markerData.x, markerData.y, zoomLevel]);
      this.$root.channel.postRequest('MapModulePlugin.AddMarkerRequest', [markerData, MARKER_ID]);
      this.$root.channel.log('MapModulePlugin.AddMarkerRequest posted with data', [markerData, MARKER_ID]);
    },
    removeMarkersRequest () {
      this.$root.channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
      this.$root.channel.log('RemoveMarkerRequest posted with data', []);
    }
  }
}
</script>
