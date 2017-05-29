<template id="GetRouteRequest">
  <div id="GetRouteRequest">
    <div style="display: block;">
      <button id="btnGetRouteRequest" class="btn btn-primary" @click="getRouteRequestTransit">GetRouteRequest (transit,walk)</button>
      <button id="btnGetRouteRequest" class="btn btn-primary" @click="getRouteRequestWalk">GetRouteRequest (walk)</button>
      <button id="btnGetRouteRequest" class="btn btn-primary" @click="getRouteRequestBicycle">GetRouteRequest (bicycle)</button>
      <div>Find route from Pasila to the center point of the map</div>
    </div>
    <div>
      <a id="getRoute" href="">To the documentation</a>
    </div>

    <code-component snippet="var data = {
      'fromlat': '6683840',
      'fromlon': '360448',
      'srs': 'EPSG:3067',
      'tolat': '6675728',
      'tolon': '394240',
      'mode': 'TRANSIT,WALK' // TRANSIT, WALK, BICYCLE, TRAIN and so on
    };
    channel.postRequest('GetRouteRequest', [data]);"></code-component>
  </div>
</template>

<script>
export default {
  name: 'GetRouteRequest',
  data () {
    return {
    }
  },
  methods: {
    getRouteRequest (mode) {
      this.$root.channel.getMapPosition((data) => {
        const datain = {
          'fromlat': '6675341',
          'fromlon': '385414',
          'srs': 'EPSG:3067',
          'tolat': data.centerY,
          'tolon': data.centerX,
          'showIntermediateStops': 'true',
          'mode': mode
        };
        this.$root.channel.postRequest('GetRouteRequest', [datain]);
        this.$root.channel.log('GetRouteRequest posted with data', datain);
      });
    },
    getRouteRequestTransit () {
      this.getRouteRequest('TRANSIT,WALK');
    },
    getRouteRequestWalk () {
      this.getRouteRequest('WALK');
    },
    getRouteRequestBicycle () {
      this.getRouteRequest('BICYCLE');
    }
  }
}
</script>

<style>
</style>
