<template>
  <div id = "GetSupportedEvents">
    <button id="btnGetSupportedEvents" class="btn btn-primary" @click="getSupportedEvents">Get supported events</button>
    <div>Gets a list of events the map supports</div>
    <code-component snippet="channel.getSupportedEvents(function(data){
      channel.log('GetSupportedEvents: ', data);
    });"></code-component>
  </div>
</template>
<script>
export default {
  name: 'GetSupportedFunctions',
  data () {
    return {
      desc: 'Get supported functions'
    }
  },
  methods: {
    getSupportedEvents () {
      this.$root.channel.getSupportedEvents((data) => {
        this.$root.channel.log('GetSupportedEvents: ', data);
      });
    }
  }
}
</script>
