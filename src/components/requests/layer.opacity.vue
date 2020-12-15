<template>
  <div ref="ChangeMapLayerOpacityRequest">
    <div>Change layer opacity.</div>
    <button id="btnChangeMapLayerOpacityRequest" class="btn btn-primary exampleready" @click="opacityRequest">ChangeMapLayerOpacityRequest</button>
    <div>
      <a id="changeOpacity" href="" @click="getLink">To the documentation</a>
    </div>
    
    <div>Example code changes opacity of the background map.</div>
    <code-component snippet="channel.getAllLayers(function (layers) {
      var layer_id = layers[0].id;
      var opacity = layers[0].opacity;
      if (opacity !== 100) {
        new_opacity = 100;
      } else {
        new_opacity = 50;
      }
      channel.postRequest('ChangeMapLayerOpacityRequest', [layer_id, new_opacity]);
      channel.log('ChangeMapLayerOpacityRequest sent with parameters: ', layer_id + ', ' + new_opacity);
    });"></code-component>
  </div>
</template>
<script>
export default {
  name: 'ChangeMapLayerOpacityRequest',
  label: 'Change map layer opacity',
  data () {
    return {
      desc: 'Change map layer opacity'
    }
  },
  methods: {
    opacityRequest () {
      const me = this;
      this.$root.channel.getAllLayers(function (layers) {
        const layerId = layers[0].id;
        const opacity = layers[0].opacity;
        let newOpacity;
        if (opacity !== 100) {
          newOpacity = 100;
        } else {
          newOpacity = 50;
        }

        me.$root.channel.postRequest('ChangeMapLayerOpacityRequest', [layerId, newOpacity]);
        me.$root.channel.log('ChangeMapLayerOpacityRequest sent with parameters: ', layerId + ', ' + newOpacity);
      });
    },
    getLink (e) {
      let documentPathEnd = 'mapping/mapmodule/request/changemaplayeropacityrequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
}
</script>
