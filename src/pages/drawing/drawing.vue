<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Drawing requests can be used to mark down and measure different locations on the map. With different settings you can set the behaviour of the request
      from drawing different plain pre-defined shapes to drawing custom styled measurement of the marked area. These pre-defined shapes consist of shapes like polygon, 
      circle, point, box, square or line. <br><br>
      To start drawing send <InlineCode>StartDrawingRequest</InlineCode>.<br>
      <RunExampleButton @click="startDrawing()">Activate drawing mode</RunExampleButton><br>
      <RunExampleButton @click="startDrawing(true)">Activate drawing mode with measurement</RunExampleButton>
      <br>
      <DocumentationLink type="request" apiDoc="mapping/drawtools/request/startdrawingrequest.md">Documentation for DrawTools.StartDrawingRequest</DocumentationLink>
      <CodeSnippet>
        var data = ['my functionality id', 'Polygon'];
        channel.postRequest('DrawTools.StartDrawingRequest', data);
      </CodeSnippet>
      To start drawing with measurement turned on, send drawing request with options parameter as object containing <InlineCode>showMeasureOnMap</InlineCode> as true. 
      <CodeSnippet>
        var data = ['my functionality id', 'Polygon', { showMeasureOnMap: true }];
        channel.postRequest('DrawTools.StartDrawingRequest', data);
      </CodeSnippet>
    </p>

    <p>
      To stop current drawing progress send <InlineCode>StopDrawingRequest</InlineCode> with id of the feature to stop drawing for as a parameter. For accessability reasons it isn't recommended that <InlineCode>StopDrawingRequest</InlineCode> is initiated by
      double clicking map area but rather by placing dedicated button in the UI of application being developed.<br>
      <RunExampleButton @click="stopDrawing">Disable drawing mode</RunExampleButton>
      <br>
      <DocumentationLink type="request" apiDoc="mapping/drawtools/request/stopdrawingrequest.md">Documentation for DrawTools.StopDrawingRequest</DocumentationLink>
      <CodeSnippet>
        var data = ['my functionality id'];
        channel.postRequest('DrawTools.StopDrawingRequest', data);
      </CodeSnippet>
    </p>

    <p>
      To clear drawing from the map send <InlineCode>StopDrawingRequest</InlineCode> with second member of data parameter given to StopDrawingRequest set as true.
      <RunExampleButton @click="stopDrawingClear">Clear drawings</RunExampleButton>
      <CodeSnippet>
        var data = ['my functionality id', true];
      channel.postRequest('DrawTools.StopDrawingRequest', data);
      </CodeSnippet>
    </p>

    <p>
      Everytime mouse is moved on the map DrawingEvent occurs while drawing is in progress and contains all the information regarding current drawing. To ensure that logging isn't clogged check if <code>DrawingEvent.finished</code> is set to <code>true</code> and only log when drawing is finished.
      <br>
      <DocumentationLink type="event" apiDoc="mapping/drawtools/event/DrawingEvent.md">Documentation for DrawingEvent</DocumentationLink>
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
const title = 'Drawing requests';
const featureId = 'my functionality id';

export default {
  name: 'Drawing',
  label: title,
  data () {
    return {
      title
    }
  },
  beforeUnmount () {
      const data = [featureId, true];
      this.$root.channel.postRequest('DrawTools.StopDrawingRequest', data);
      this.$root.channel.log('DrawTools.StopDrawingRequest posted with data:', data);
  },
  methods: {
    startDrawing (showMeasurement = false) {
      const data = [
        featureId,
        'Polygon',
        {
          showMeasureOnMap: showMeasurement
        }
      ];
      this.$root.channel.postRequest('DrawTools.StartDrawingRequest', data);
      this.$root.channel.log('DrawTools.StartDrawingRequest posted with data:', data);
    },
    stopDrawing () {
      const data = [featureId];
      this.$root.channel.postRequest('DrawTools.StopDrawingRequest', data);
      this.$root.channel.log('DrawTools.StopDrawingRequest posted with data:', data);
    },
    stopDrawingClear () {
      const data = [featureId, true];
      this.$root.channel.postRequest('DrawTools.StopDrawingRequest', data);
      this.$root.channel.log('DrawTools.StopDrawingRequest posted with data:', data);
    }
  }
}
</script>
