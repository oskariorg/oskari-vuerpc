<template>
  <div id="FeatureEvent">
    <div>Occurs after adding or removing features to or from map and after clicking a feature</div>
    <div>
    <DocumentationLink type="event" :apiDoc="apiDocPageEvent">
      Documentation for FeatureEvent
    </DocumentationLink>
    </div>

    <CodeSnippet>{{ event }}</CodeSnippet>
  </div>
</template>
<script>
export default {
  name: 'FeatureEvent',
  label: 'FeatureEvent',
  data() {
    return {
      desc: 'Feature Event',
      event,
      apiDocPageEvent: 'mapping/mapmodule/event/FeatureEvent.md'
    };
  }
};

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
</script>
