<template>
  <div>
    <h3>header</h3>
    <p>
      placeholder text placeholder text placeholder text placeholder text placeholder text
      placeholder textplaceholder text placeholder textplaceholder text placeholder textplaceholder
      text placeholder text placeholder textplaceholder textplaceholder text
    </p>
    <CodeEditor :snippet="event" :mode="mode1" :runnable="true" />
    <p>
      placeholder text placeholder text placeholder text placeholder text placeholder text
      placeholder textplaceholder text placeholder textplaceholder text placeholder textplaceholder
      text placeholder text placeholder textplaceholder textplaceholder text
    </p>
    <CodeEditor>const a = 1;</CodeEditor>
    <CodeEditor :runnable="true">
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
    </CodeEditor>

    <CodeEditor lang="xml">{{ xml }}</CodeEditor>
  </div>
</template>
<script>
const mode1 = 'javascript';
const event = `
var geojson = {
  "type": "FeatureCollection",
  "crs": {
    "type": "name",
    "properties": {
      "name": "EPSG:3067"
    }
  },
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          528704,
          6969136
        ]
      },
      "properties": {
        "name": "I'm a point"
      }
    }
  ]
};
// push vector features on geojson to map
channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [geojson]);
`.trim();

const xml = '<div>moikka kaikille</div>';

export default {
  name: 'testPage',
  data() {
    return {
      event,
      mode1,
      xml
    };
  }
};
</script>
