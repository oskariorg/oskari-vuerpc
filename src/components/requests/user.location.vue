<template>
  <div ref="GetUserLocationRequest">
    <button id="btnMyLocationPluginGetUserLocationRequest" class="btn btn-primary" @click="getUserLocation">MyLocationPlugin.GetUserLocationRequest</button>
    <div>
      <a id="getUserLocation" href="">To the documentation</a>
    </div>
        <code-component snippet="channel.postRequest('MyLocationPlugin.GetUserLocationRequest', [true]);"></code-component>
    </div>
</template>
<script>
export default {
  name: 'GetUserLocationRequest',
  data () {
    return {
      desc: 'Get users location'
    }
  },
  methods: {
    getUserLocation () {
      this.$root.channel.postRequest('MyLocationPlugin.GetUserLocationRequest', [true]);
      this.$root.channel.log('MyLocationPlugin.GetUserLocationRequest posted with data', true);
    }
  }
}
</script>
