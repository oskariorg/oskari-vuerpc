<template>
  <div id = "GetAllLayers">
    <button id="btnGetAllLayers" class="btn btn-primary" @click="getAllLayers">Get all layers</button>
    <div>Gets a list of available map layers</div>
    <code-component snippet="channel.getAllLayers(function(data){
      channel.log('GetAllLayers: ', data);
    });"></code-component>
  </div>
</template>
<script>
export default {
  name: 'GetAllLayers',
  data () {
    return {
      desc: 'Get available map layers'
    }
  },
  methods: {
    getAllLayers () {
      this.$root.channel.getAllLayers((data) => {
        this.$root.channel.log('GetAllLayers: ', data);
      });
    }
  }
}
</script>
