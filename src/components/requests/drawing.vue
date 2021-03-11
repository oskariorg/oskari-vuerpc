<template>
  <div>
    <div>
      To start drawing send <code>StartDrawingRequest</code>.
      <RunExampleButton class="btn btn-primary exampleready" @click="startDrawing">DrawTools.StartDrawingRequest</RunExampleButton>
      <div>
        <DocumentationLink type="request" apiDoc="mapping/drawtools/request/startdrawingrequest.md">Documentation for {{ startDrawingRequest }}</DocumentationLink>
      </div>
      <CodeSnippet snippet="var data = ['my functionality id', 'Polygon'];
      channel.postRequest('DrawTools.StartDrawingRequest', data);"></CodeSnippet>
    </div>
    <div>
      To stop current drawing progress send <code>StopDrawingRequest</code>.
      <RunExampleButton class="btn btn-primary exampleready" @click="stopDrawing">DrawTools.StopDrawingRequest</RunExampleButton>
      <div>
        <DocumentationLink type="request" apiDoc="mapping/drawtools/request/stopdrawingrequest.md">Documentation for {{ stopDrawingRequest }}</DocumentationLink>
      </div>
      <CodeSnippet snippet="var data = ['my functionality id'];
      channel.postRequest('DrawTools.StopDrawingRequest', data);"></CodeSnippet>
    </div>
    <div>
      To clear drawing from the map send <code>StopDrawingRequest</code> with second member of data parameter given to StopDrawingRequest set as true.
      <RunExampleButton class="btn btn-primary exampleready" @click="stopDrawingClear">DrawTools.StopDrawingRequest - clear drawings</RunExampleButton>
      <CodeSnippet snippet="var data = ['my functionality id', true];
      channel.postRequest('DrawTools.StopDrawingRequest', data);"></CodeSnippet>
    </div>
    <div>
      Everytime mouse is moved on the map DrawingEvent occurs while drawing is in progress and contains all the information regarding current drawing. To ensure that logging isn't clogged check if <code>DrawingEvent.finished</code> is set to <code>true</code> and only log when drawing is finished.
      <div>
        <DocumentationLink type="event" apiDoc="mapping/drawtools/event/DrawingEvent.md">Documentation for {{ drawingEventRequest }}</DocumentationLink>
      </div>
      <CodeSnippet :snippet="event"></CodeSnippet>
    </div>
  </div>
</template>
<script>
const drawingEventRequest = 'DrawingEvent';
const startDrawingRequest = 'DrawTools.StartDrawingRequest';
const stopDrawingRequest = 'DrawTools.StopDrawingRequest';

const drawingExample = {
  event: `{
    "name": "DrawingEvent",
    "id": "my functionality id",
    "geojson": "{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[356352,6776320],[428032,6776064]]]},\"properties\":{\"area\":\"0 m2\"}}]}",
    "data": {
      "area": "0 m2",
      "bufferedGeoJson": "{\"type\":\"FeatureCollection\",\"features\":[]}",
      "shape": "Polygon"
    },
    "isFinished": true
  }`
}

export default {
  name: 'drawing',
  label: 'Drawing requests',
  data () {
    return {
      drawingEventRequest,
      startDrawingRequest,
      stopDrawingRequest,
      desc: 'Drawing requests',
      event: drawingExample.event
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
<style scoped>
  code {
    font-size: 100%;
  }
</style>
