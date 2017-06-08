<template>
  <div id = "mapZoomFunctions">
    <button id="btnGetZoomRange" class="btn btn-primary" @click="getZoomRange">Get zoom range</button>
    <div>Gets the map's zoom range (min, max, current)</div>
    <code-component snippet="channel.getZoomRange(function(data){
      channel.log('GetZoomRange: ', data);
    });"></code-component>
    <button id="btnZoomIn" class="btn btn-primary" @click="zoomIn">Zoom in</button>
    <div>Zooms in and returns the current zoomlevel after zooming</div>
    <code-component snippet="channel.zoomIn(function(data){
      channel.log('Zoom level after: ', data);
    });"></code-component>
    <button id="btnZoomOut" class="btn btn-primary" @click="zoomOut">Zoom out</button>
    <div>Zooms out and returns the current zoomlevel after zooming</div>
    <code-component snippet="channel.zoomOut(function(data){
      channel.log('Zoom level after: ', data);
    });"></code-component>
    <button id="btnZoomTo" class="btn btn-primary" @click="zoomTo">ZoomTo(5)</button>
    <div>Zooms to given zoomlevel and returns the current zoomlevel after zooming (might be different than parameter if parameter is out of range)</div>
    <code-component snippet="channel.zoomTo([5],function(data){
      channel.log('Zoom level after: ', data);
    });"></code-component>
  </div>
</template>
<script>
export default {
  name: 'mapZoomFunctions',
  data () {
    return {
      desc: 'Zoom functions'
    }
  },
  methods: {
    getZoomRange () {
      this.$root.channel.getZoomRange((data) => {
        this.$root.channel.log('GetZoomRange: ', data);
      });
    },
    zoomIn () {
      this.$root.channel.zoomIn((data) => {
        this.$root.channel.log('Zoom level after:', data);
      });
    },
    zoomOut () {
      this.$root.channel.zoomOut((data) => {
        this.$root.channel.log('Zoom level after:', data);
      });
    },
    zoomTo () {
      this.$root.channel.zoomTo((data) => {
        this.$root.channel.log('Zoom level after:', data);
      });
    }
  }
}
</script>
