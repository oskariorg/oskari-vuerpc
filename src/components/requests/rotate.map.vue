<template>
  <div ref="rotate">
    <button ref="value" class="btn btn-primary" value="180" @click="rotateMap">rotate.map</button>
    <div>
      <a id="rotateMap" href="" @click="getLink">To the documentation</a>
    </div>

        <code-component snippet="channel.postRequest(
        'rotate.map', [180]
        );"></code-component>

    <button ref="re-rotate.map" class="btn btn-primary" value="0" @click="rotateMap" >Reset Rotation</button>
    <div>
      <a id="rotateMap" href=""  @click="getLink">To the documentation</a>
    </div>

        <code-component snippet="channel.postRequest(
        'rotate.map', []
        );"></code-component>
  </div>
</template>
<script>
export default {
  name: 'rotateMap',
  data () {
    return {
      desc: 'Rotate map'
    }
  },
  methods: {
    rotateMap (e) {
      let rot = e.target.value;
      rot = (!isNaN(rot)) ? parseFloat(rot) : null;
      if (rot) {
        this.$root.channel.postRequest('rotate.map', [rot]);
        this.$root.channel.log('rotate.map posted with data', [rot]);
      } else {
        this.$root.channel.postRequest('rotate.map', []);
        this.$root.channel.log('rotate.map posted with data', []);
      }
    },
    getLink (e) {
      let documentPathEnd = 'mapping/maprotator/request/rotate.map.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
}
</script>
