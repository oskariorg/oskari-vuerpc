<template>
  <div id = "GetMapBbox">
    <button id="btnGetMapBbox" class="btn btn-primary" @click="getMapBbox">Get map bbox</button>
    <div>Gets the map's current extent</div>
    <code-component snippet="channel.getMapBbox(function(data){
      channel.log('GetMapBbox: ', data);
    });"></code-component>
  </div>
</template>
<script>
export default {
  name: 'GetMapBbox',
  data () {
    return {
      desc: 'Get map bbox'
    }
  },
  methods: {
    getMapBbox () {
      this.$root.channel.getMapBbox((data) => {
        this.$root.channel.log('GetMapBbox: ', data);
      });
    }
  }
}
</script>
