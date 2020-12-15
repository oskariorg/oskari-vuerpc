<template>
  <div id = "GetPixelMeasuresInScale">
    <div class="measure-group">
      <div class="col-measure">
        <input class="plot-scale-control" name="plot-scale" ref="inputPlotScale" placeholder="Plot scale for A4 plot area">
        <button id="btnGetPixelMeasuresInScale" class="btn btn-primary exampleready" @click="getPixelMeasuresInScale">Get A4 plot area on a map</button>
        <div>Get pixel measures for A4 size plot area in the requested scale. Paper size scale is optimized, if scale is not inserted  / 0-value-scale -> remove plot area box  </div>
      </div>
    </div>
    <code-component snippet="var A4_210mm = 210;
    var A4_297mm = 297;
    channel.getPixelMeasuresInScale([[A4_210mm, A4_297mm], scale], function(data){
      channel.log('GetPixelMeasuresInScale: ', data);
    });"></code-component>
  </div>
</template>
<script>
import mixins from '../../util/mixins.js';
export default {
  name: 'GetPixelMeasuresInScale',
  label: 'Get pixel measures in scale',
  data () {
    return {
      desc: 'Get pixel measures in scale',
      savedPlotAreaData: null,
      pixelmeasures: {},
      mixins: mixins(channel)
    }
  },
  methods: {
    getPixelMeasuresInScale () {
      const scale = this.$refs.inputPlotScale.value;
      if (scale && Number(scale) < 1) {
        this.$store.state.map;
        this.$root.channel.log('GetPixelMeasuresInScale: ', ' old plot area removed, if any exists');
        this.$store.state.savedPlotAreaData = null;
        return;
      }
      if (!scale || scale === '') {
        this.$root.channel.getPixelMeasuresInScale([[210, 297]], (data) => {
          this.$store.state.savedPlotAreaData = [[210, 297], data.scale];
        });
      } else {
        this.$store.state.savedPlotAreaData = [[210, 297], scale];
      }

      this.mixins(channel).plotPlotArea([[210, 297], scale], this.$store.state.map);
    }
  }
}
</script>
