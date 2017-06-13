<template>
<div class="col-md-6 col-sm-12 col-lg-4 full-height-panel">
  <div class="panel panel-default map-panel">
    <div class="panel-body">
      <iframe ref="publishedMap" id="publishedMap" src="http://demo.paikkatietoikkuna.fi/published/fi/0fcfd236-5079-49f3-81f3-58af23f534d2" style="border:none;
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
