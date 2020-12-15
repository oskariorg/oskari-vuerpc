<template>
  <div id = "GetSupportedFunctions">
    <button id="btnGetSupportedFunctions" class="btn btn-primary" @click="getSupportedFunctions">Get supported functions</button>
    <div>Gets a list of functions the map supports</div>
    <code-component snippet="channel.getSupportedFunctions(function(data){
      channel.log('GetSupportedFunctions: ', data);
    });"></code-component>
  </div>
</template>
<script>
export default {
  name: 'GetSupportedFunctions',
  label: 'Get supported functions',
  data () {
    return {
      desc: 'Get supported functions'
    }
  },
  methods: {
    getSupportedFunctions () {
      this.$root.channel.getSupportedFunctions((data) => {
        this.$root.channel.log('GetSupportedFunctions: ', data);
      });
    }
  }
}
</script>
