<template>
  <div class="col-xs-12 col-md-12 col-sm-12 col-lg-6 col-xl-5 full-height-panel">
    <div class="panel panel-default map-panel">
      <div class="panel-body">
        <iframe ref="mapIFrame" id="publishedMap" :src="url" style="border:none;
          width:100%; height:100%;"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'domain': String,
    'uuid': String
  },
  data () {
    // https://kartta.paikkatietoikkuna.fi/?lang=en&uuid=053027f4-91d9-4351-aec4-c6a31dd68c56
    const url = `${this.domain}/?lang=en&uuid=${this.uuid}`;
    return {
      url
    }
  },
  methods: {
    getIframeElement () {
      return this.$refs.mapIFrame;
    }
  },
  mounted () {
    this.$store.state.map = this.$refs.mapIFrame;
  }
}
</script>
<style lang="scss">
.map-panel{
  border:0.5px solid #D9D9D9;
}
#publishedMap {
  border:none;
  width:100%;
  height:100%;
}
</style>
