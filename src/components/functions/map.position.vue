<template>
  <div id = "GetMapPosition">
    <button id="btnGetMapPosition" class="btn btn-primary" @click="getMapPosition">Get map position</button>
    <div>Gets current map position</div>
    <code-component snippet="channel.getMapPosition(function(data){
      channel.log('GetMapPosition: ', data);
    });"></code-component>
  </div>
</template>
<script>
export default {
  name: 'GetMapPosition',
  label: 'Get map position',
  data () {
    return {
      desc: 'Get map position'
    }
  },
  methods: {
    getMapPosition () {
      this.$root.channel.getMapPosition((data) => {
        this.$root.channel.log('GetMapPosition: ', data);
      });
    }
  }
}
</script>
