<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      With drawing features of Oskari RPC API you can give end-user possibility to make their own markings to the map.
      <br><br>
      The drawn features trigger events that can be programmatically listened to and used to trigger different functions in the application that is using an Oskari-based embedded map.
      <br><br>
      To start drawing send <InlineCode>StartDrawingRequest</InlineCode> and draw polygon by clicking several locations on the map.<br>
      <RunExampleButton @click="startDrawing">Activate drawing mode</RunExampleButton>
      <br>
      <DocumentationLink type="request" apiDoc="mapping/drawtools/request/startdrawingrequest.md">Documentation for DrawTools.StartDrawingRequest</DocumentationLink>
      <CodeSnippet>
        var data = ['my functionality id', 'Polygon'];
        channel.postRequest('DrawTools.StartDrawingRequest', data);
      </CodeSnippet>
    </p>

    <p>
      To stop current drawing progress send <InlineCode>StopDrawingRequest</InlineCode>.
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
      Everytime mouse is moved on the map DrawingEvent occurs while drawing is in progress and contains all the information regarding current drawing. This enables things like using the draw functionality as a measurement tool. To ensure that logging or event listener isn't clogged check if <code>DrawingEvent.finished</code> is set to <code>true</code> and only log when drawing is finished. 
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
    <h3>Saving markings</h3>
    <p>
      If you want to store the markings/drawings the user made on the map after they have been drawn it's best to add them as features to the map with AddFeaturesToMapRequest based on the GeoJSON from DrawingEvent. Otherwise stopping the draw mode or starting a new drawing can accidentally erase the previous markings from the map.
      <br><br>
      It's ok to try and keep the markings on the drawing layer depending on your app, but most real world applications probably want more control over the markings. Adding them as features allow styling, click events and other benefits. 
      <br><br>
    </p>
  
  </div>
</template>
<script>
const title = 'Drawing requests'

export default {
  name: 'Drawing',
  label: title,
  data () {
    return {
      title
    }
  },
  beforeDestroy () {
      const data = ['my functionality id', true];
      this.$root.channel.postRequest('DrawTools.StopDrawingRequest', data);
      this.$root.channel.log('DrawTools.StopDrawingRequest posted with data:', data);
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
