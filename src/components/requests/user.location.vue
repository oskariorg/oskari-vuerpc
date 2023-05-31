<template>
  <div ref="GetUserLocationRequest">
    <button
      id="btnMyLocationPluginGetUserLocationRequest"
      class="btn btn-primary"
      @click="getUserLocation"
    >
      MyLocationPlugin.GetUserLocationRequest
    </button>
    <div>
      <a id="getUserLocation" href="" @click="getLink">To the documentation</a>
    </div>
        <CodeSnippet>channel.postRequest('MyLocationPlugin.GetUserLocationRequest', [true]);</CodeSnippet>
    </div>
</template>
<script>
export default {
  name: 'GetUserLocationRequest',
  label: 'Get users location',
  data() {
    return {
      desc: 'Get users location'
    };
  },
  methods: {
    getUserLocation() {
      this.$root.channel.postRequest('MyLocationPlugin.GetUserLocationRequest', [true]);
      this.$root.channel.log('MyLocationPlugin.GetUserLocationRequest posted with data', true);
    },
    getLink(e) {
      let documentPathEnd = 'mapping/mapmodule/request/getuserlocationrequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
};
</script>
