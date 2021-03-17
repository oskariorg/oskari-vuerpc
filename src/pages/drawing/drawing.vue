<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      To start drawing send <InlineCode>StartDrawingRequest</InlineCode>.
      <RunExampleButton @click="startDrawing">DrawTools.StartDrawingRequest</RunExampleButton>
      <br>
      <DocumentationLink type="request" apiDoc="mapping/drawtools/request/startdrawingrequest.md">Documentation for {{ startDrawingRequest }}</DocumentationLink>
      <CodeSnippet>
        var data = ['my functionality id', 'Polygon'];
        channel.postRequest('DrawTools.StartDrawingRequest', data);
      </CodeSnippet>
    </p>

    <p>
      To stop current drawing progress send <InlineCode>StopDrawingRequest</InlineCode>.
      <RunExampleButton @click="stopDrawing">DrawTools.StopDrawingRequest</RunExampleButton>
      <br>
      <DocumentationLink type="request" apiDoc="mapping/drawtools/request/stopdrawingrequest.md">Documentation for {{ stopDrawingRequest }}</DocumentationLink>
      <CodeSnippet>
        var data = ['my functionality id'];
        channel.postRequest('DrawTools.StopDrawingRequest', data);
      </CodeSnippet>
    </p>

    <p>
      To clear drawing from the map send <InlineCode>StopDrawingRequest</InlineCode> with second member of data parameter given to StopDrawingRequest set as true.
      <RunExampleButton @click="stopDrawingClear">DrawTools.StopDrawingRequest - clear drawings</RunExampleButton>
      <CodeSnippet>
        var data = ['my functionality id', true];
      channel.postRequest('DrawTools.StopDrawingRequest', data);
      </CodeSnippet>
    </p>

    <p>
      Everytime mouse is moved on the map DrawingEvent occurs while drawing is in progress and contains all the information regarding current drawing. To ensure that logging isn't clogged check if <code>DrawingEvent.finished</code> is set to <code>true</code> and only log when drawing is finished.
      <br>
      <DocumentationLink type="event" apiDoc="mapping/drawtools/event/DrawingEvent.md">Documentation for {{ drawingEvent }}</DocumentationLink>
      <CodeSnippet>
        {
          "name": "DrawingEvent",
          "id": "my functionality id",
          "geojson": {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                    [
                      [
                        429245.623,
                        7349501.146
                      ],
                      [
                        158909.62300000002,
                        7081213.146
                      ],
                      [
                        597181.623,
                        6853885.146
                      ],
                      [
                        429245.623,
                        7349501.146
                      ]
                    ]
                  ]
                },
                "properties": {
                  "area": 87187682917.60973
                },
                "id": "drawFeature0"
              }
            ],
            "crs": "EPSG:3067"
          },
          "data": {
            "buffer": 0,
            "bufferedGeoJson": {
              "type": "FeatureCollection",
              "features": []
            },
            "shape": "Polygon",
            "area": 87187682917.60973
          },
          "isFinished": true
        }
      </CodeSnippet>
    </p>
  
  </div>
</template>
<script>
const drawingEvent = 'DrawingEvent';
const startDrawingRequest = 'DrawTools.StartDrawingRequest';
const stopDrawingRequest = 'DrawTools.StopDrawingRequest';
const title = 'Drawing requests'

export default {
  name: 'Drawing',
  label: title,
  data () {
    return {
      drawingEvent,
      startDrawingRequest,
      stopDrawingRequest,
      title
    }
  },
  methods: {
    startDrawing () {
      const data = ['my functionality id', 'Polygon'];
      this.$root.channel.postRequest('DrawTools.StartDrawingRequest', data);
      this.$root.channel.log('DrawTools.StartDrawingRequest posted with data:', data);
    },
    stopDrawing () {
      const data = ['my functionality id'];
      this.$root.channel.postRequest('DrawTools.StopDrawingRequest', data);
      this.$root.channel.log('DrawTools.StopDrawingRequest posted with data:', data);
    },
    stopDrawingClear () {
      const data = ['my functionality id', true];
      this.$root.channel.postRequest('DrawTools.StopDrawingRequest', data);
      this.$root.channel.log('DrawTools.StopDrawingRequest posted with data:', data);
    }
  }
}
</script>
