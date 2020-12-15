<template>
  <div ref="MapTourRequest">
    <div>Move the map along route for visualization purposes</div>
    <button ref="btnMapTourRequest" class="btn btn-primary exampleready" @click="mapTourRequest">MapTourRequest</button>
    <div>
      <a id="mapTour" href="" @click="getLink">To the documentation</a>
    </div>
    <code-component snippet="
      const x = 488704;
      const y = 6939136;
      const params = [
        [
          {
            lon: x,
            lat: y,
            duration: 2000,
            zoom: 3,
            animation: 'zoomPan'
          },
          {
            lon: x - 150000,
            lat: y - 150000,
            delay: 2500
          },
          {
            lon: x + 75000,
            lat: y,
            animation: 'zoomPan',
            zoom: 6
          }
        ],
        {
          zoom: 8,
          animation: 'fly',
          duration: 3000,
          srsName: 'EPSG:3067'
        }
      ];
      channel.postRequest('MapTourRequest', params);
      channel.log('MapTourRequest posted with data', params);
    "></code-component>
  </div>
</template>
<script>
export default {
  name: 'MapTourRequest',
  label: 'Move map along route',
  data () {
    return {
      desc: 'Move map along route',
      LOCATION_POSIO: [552935, 7332639]
    }
  },
  methods: {
    mapTourRequest () {
      const x = 488704;
      const y = 6939136;
      const params = [
        [
          {
            lon: x,
            lat: y,
            duration: 2000,
            zoom: 3,
            animation: 'zoomPan'
          },
          {
            lon: x - 150000,
            lat: y - 150000,
            delay: 2500
          },
          {
            lon: x + 75000,
            lat: y,
            animation: 'zoomPan',
            zoom: 6
          }
        ],
        {
          zoom: 8,
          animation: 'fly',
          duration: 3000,
          srsName: 'EPSG:3067'
        }
      ];
      this.$root.channel.postRequest('MapTourRequest', params);
      this.$root.channel.log('MapTourRequest posted with data', params);
    },
    getLink (e) {
      let documentPathEnd = 'mapping/mapmodule/request/MapTourRequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
}
</script>
