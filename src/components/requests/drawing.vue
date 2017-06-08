<template>
  <div ref="drawing">
    <div id="StartDrawingRequest">
      <button class="btn btn-primary exampleready" @click="startDrawing">DrawTools.StartDrawingRequest</button>
      <div>
        <a id="startDrawing" href="">To the documentation</a>
      </div>
      <code-component snippet="var data = ['my functionality id', 'Polygon'];
      channel.postRequest('DrawTools.StartDrawingRequest', data);"></code-component>
    </div>
    <div id="StopDrawingRequest">
      <button class="btn btn-primary exampleready" @click="stopDrawing">DrawTools.StopDrawingRequest - cancel current drawing</button>
      <div>
        <a id="stopDrawing" href="">To the documentation</a>
      </div>
      <code-component snippet="var data = ['my functionality id'];
      channel.postRequest('DrawTools.StopDrawingRequest', data);"></code-component>
    </div>
    <div id="StopDrawingRequestClear">
      <button class="btn btn-primary exampleready" @click="stopDrawingClear">DrawTools.StopDrawingRequest - clear drawings</button>
      <code-component snippet="var data = ['my functionality id', true];
      channel.postRequest('DrawTools.StopDrawingRequest', data);"></code-component>
    </div>
  </div>
</template>
<script>
export default {
  name: 'drawing',
  data () {
    return {
      desc: 'Drawing requests'
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
