<style scoped>
  code {
    font-size: 100%;
  }
</style>
<template>
  <div ref="drawing">
    <div id="StartDrawingRequest">
      To start drawing send <code>StartDrawingRequest</code>.
      <button class="btn btn-primary exampleready" @click="startDrawing">DrawTools.StartDrawingRequest</button>
      <div>
        <a id="startDrawing" href="" @click="getLink">To the documentation</a>
      </div>
      <code-component snippet="var data = ['my functionality id', 'Polygon'];
      channel.postRequest('DrawTools.StartDrawingRequest', data);"></code-component>
    </div>
    <div id="StopDrawingRequest">
      To stop current drawing progress send <code>StopDrawingRequest</code>.
      <button class="btn btn-primary exampleready" @click="stopDrawing">DrawTools.StopDrawingRequest</button>
      <div>
        <a id="stopDrawing" href="" @click="getLink">To the documentation</a>
      </div>
      <code-component snippet="var data = ['my functionality id'];
      channel.postRequest('DrawTools.StopDrawingRequest', data);"></code-component>
    </div>
    <div id="StopDrawingRequestClear">
      To clear drawing from the map send <code>StopDrawingRequest</code> with second member of data parameter given to StopDrawingRequest set as true.
      <button class="btn btn-primary exampleready" @click="stopDrawingClear">DrawTools.StopDrawingRequest - clear drawings</button>
      <code-component snippet="var data = ['my functionality id', true];
      channel.postRequest('DrawTools.StopDrawingRequest', data);"></code-component>
    </div>
    <div id="DrawingEvent">
      Everytime mouse is moved on the map DrawingEvent occurs while drawing is in progress and contains all the information regarding current drawing. To ensure that logging isn't clogged check if <code>DrawingEvent.finished</code> is set to <code>true</code> and only log when drawing is finished.
      <div>
        <a id="drawingEvent" href="" @click="getLink">To the documentation</a>
      </div>
      <code-component :snippet="event"></code-component>
    </div>
  </div>
</template>
<script>
import { drawing } from '../../util/examplecodes.js';
export default {
  name: 'drawing',
  label: 'Drawing requests',
  data () {
    return {
      desc: 'Drawing requests',
      event: drawing.event
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
    },
    getLink (e) {
      let documentPathEnd =
        e.target.id === 'startDrawing' ? 'mapping/drawtools/request/startdrawingrequest.md' :
        e.target.id === 'stopDrawing' ? 'mapping/drawtools/request/stopdrawingrequest.md' :
        'mapping/drawtools/event/DrawingEvent.md';
      let requestBaseUrl = e.target.id === 'drawingEvent' ? this.$root.documentPathEvent : this.$root.documentPathRequest;
      e.target.href = requestBaseUrl + documentPathEnd;
    }
  }
}
</script>
