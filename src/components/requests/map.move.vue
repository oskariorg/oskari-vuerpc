<template>
  <div ref="MapMoveRequest">
    <button ref="btnMapMoveRequest" class="btn btn-primary exampleready" @click="mapMoveRequest">MapMoveRequest</button>
    <div>
      <a id="mapMove" href="">To the documentation</a>
    </div>

    <code-component snippet="var x = 552935,
    y = 7332639,
    zoomLevel = 7;
    channel.postRequest(
    'MapMoveRequest', [x, y, zoomLevel]
    );"></code-component>
  </div>
</template>
<script>
export default {
  name: 'MapMoveRequest',
  data () {
    return {
      desc: 'Move map',
      LOCATION_POSIO: [552935, 7332639]
    }
  },
  methods: {
    mapMoveRequest () {
      this.$root.channel.postRequest(
          'MapMoveRequest', [this.LOCATION_POSIO[0], this.LOCATION_POSIO[1], 7]
      );
      this.$root.channel.log('MapModulePlugin.MapMoveRequest posted with data', [this.LOCATION_POSIO[0], this.LOCATION_POSIO[1], 7]);
    }
  }
}
</script>
