<template>
  <div id = "GetSupportedRequests">
    <button id="btnGetSupportedRequests" class="btn btn-primary" @click="getSupportedRequests">Get supported requests</button>
    <div>Gets a list of requests the map supports</div>
    <code-component snippet="channel.getSupportedRequests(function(data){
      channel.log('GetSupportedRequests: ', data);
    });"></code-component>
  </div>
</template>
<script>
export default {
  name: 'GetSupportedRequests',
  label: 'Get supported requests',
  data () {
    return {
      desc: 'Get supported requests'
    }
  },
  methods: {
    getSupportedRequests () {
      this.$root.channel.getSupportedRequests((data) => {
        this.$root.channel.log('GetSupportedRequests: ', data);
      });
    }
  }
}
</script>
