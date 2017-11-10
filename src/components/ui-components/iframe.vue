<template>
<div class="col-xs-12 col-md-12 col-sm-12 col-lg-6 col-xl-5 full-height-panel">
  <div class="panel panel-default map-panel">
    <div class="panel-body">
      <iframe ref="publishedMap" id="publishedMap" src="https://kartta.paikkatietoikkuna.fi/?lang=en&uuid=053027f4-91d9-4351-aec4-c6a31dd68c56" style="border:none;
        width:100%; height:100%;"></iframe>
    </div>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    this.$store.state.map = this.$refs.publishedMap;
  }
}
</script>
<style lang="scss">
.full-height-panel {
  height: 98% !important
}
.map-panel{
  border:0.5px solid #D9D9D9;
}
#publishedMap {
  border:none;
  width:100%;
  height:100%;
}
</style>
