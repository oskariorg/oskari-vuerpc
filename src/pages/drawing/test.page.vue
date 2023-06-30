<template>
  <div>
    <h3>header</h3>
    <p>
      placeholder text placeholder text placeholder text placeholder text placeholder text
      placeholder textplaceholder text placeholder textplaceholder text placeholder textplaceholder
      text placeholder text placeholder textplaceholder textplaceholder text
    </p>
    <CodeEditor :code="event" :mode="mode1" />
    <p>
      placeholder text placeholder text placeholder text placeholder text placeholder text
      placeholder textplaceholder text placeholder textplaceholder text placeholder textplaceholder
      text placeholder text placeholder textplaceholder textplaceholder text
    </p>
  </div>
</template>
<script>
const mode1 = 'javascript';

const code2 = `<div>moikka kaikille</div>`;
const mode2 = 'xml';

const event = `\
{
  "operation": "add",
  "features": [
    {
      "id": "F24",
      "geojson": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "id": "F24",
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  488704,
                  6939136
                ],
                [
                  588704,
                  7039136
                ]
              ]
            },
            "properties": {
              "test_property": 1,
              "oskari-cursor": "zoom-in"
            }
          }
        ]
      },
        "layerId": "VECTOR"
    },
    {
      "id": "F25",
      "geojson": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "id": "F25",
            "geometry": {
              "type": "Point",
              "coordinates": [
                488704,
                6939136
              ]
            },
            "properties": {
              "test_property": 2
            }
          }
        ]
      },
      "layerId": "VECTOR"
    }
  ]
}`;

export default {
  name: 'testPage',
  data() {
    return {
      event,
      mode1,
      code2,
      mode2
    };
  }
};
</script>
