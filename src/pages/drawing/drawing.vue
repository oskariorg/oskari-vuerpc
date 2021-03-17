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
      <DocumentationLink type="event" apiDoc="mapping/drawtools/event/DrawingEvent.md">Documentation for {{ drawingEventRequest }}</DocumentationLink>
      <CodeSnippet>
        {
            "name": "DrawingEvent",
            "id": "my functionality id",
            "geojson": "{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[356352,6776320],[428032,6776064]]]},\"properties\":{\"area\":\"0 m2\"}}]}",
            "data": {
              "area": "0 m2",
              "bufferedGeoJson": "{\"type\":\"FeatureCollection\",\"features\":[]}",
              "shape": "Polygon"
            },
            "isFinished": true
          }
      </CodeSnippet>
    </p>
  
  </div>
</template>
<script>
const drawingEventRequest = 'DrawingEvent';
const startDrawingRequest = 'DrawTools.StartDrawingRequest';
const stopDrawingRequest = 'DrawTools.StopDrawingRequest';
const title = 'Drawing requests'

export default {
  name: 'drawing',
  label: title,
  data () {
    return {
      drawingEventRequest,
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
