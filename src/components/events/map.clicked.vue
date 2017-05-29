<template>
  <div id="MapClickedEvent" >
    <div>Occurs after the map has been clicked</div>
    <div>
      <a id="mapClicked" href="">To the documentation</a>
    </div>
    <code-component snippet="    {
      'lon': 423424,
      'lat': 6821888,
      'x': 312,
      'y': 236,
      'ctrlKeyDown': false
    }">
  </code-component>
</div>
</template>
<script>
import helper from '../../util/mixins.js';
export default {
  name: 'MapClickedEvent',
  data () {
    return {
    }
  },
  methods: {
    mapClickedEvent (data) {
      const marker = helper.getMarkerTemplate();
      marker.x = data.lon;
      marker.y = data.lat;
    }
  }
}
</script>
