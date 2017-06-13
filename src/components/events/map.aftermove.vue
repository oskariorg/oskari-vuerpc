<template>
  <div id="AfterMapMoveEvent">
    <div>Occurs after the map has been moved</div>
    <div>
      <a id="afterMapMove" href="" @click="getLink">To the documentation</a>
    </div>
    <code-component snippet="    {
      'centerX': 411650.70779123,
      'centerY': 6751897.3481153,
      'zoom': 4,
      'marker': false,
      'scale': 362834
    }">
  </code-component>
</div>
</template>
<script>
import helper from '../../util/mixins.js';
export default {
  name: 'AfterMapMoveEvent',
  data () {
    return {
      desc: 'AfterMapMoveEvent'
    }
  },
  methods: {
    afterMapMoveEvent (data) {
      // Replot Plot area if zoom is changed
      if (this.$store.savedZoom && this.$store.savedZoom !== data.zoom && this.$store.savedPlotAreaData) {
        this.$store.savedZoom = data.zoom;
        helper.plotPlotArea(this.$store.savedPlotAreaData);
      } else if (!this.$store.savedZoom && this.$store.savedPlotAreaData) {
        this.$store.savedZoom = data.zoom;
        helper.plotPlotArea(this.$store.savedPlotAreaData, this.$store.map);
      }
    },
    getLink (e) {
      var documentPathEnd = 'mapping/mapmodule/event/AfterMapMoveEvent.md';
      e.target.href = this.$root.documentPathEvent + documentPathEnd;
    }
  }
}
</script>
