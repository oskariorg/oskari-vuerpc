<template>
  <div ref="AfterAddMarkerEvent">
    <div>Occurs after a marker has been added to map</div>
    <div>
      <a id="afterAddMarker" href="" @click="getLink">To the documentation</a>
    </div>

    <code-component snippet="{
      'id': 'SEARCH_RESULT_MARKER'
  }"></code-component>

  </div>
</template>
<script>
export default {
  name: 'AfterAddMarkerEvent',
  label: 'AfterAddMarkerEvent',
  data () {
    return {
      desc: 'AfterAddMarkerEvent'
    }
  },
  methods: {
    getLink (e) {
      let documentPathEnd = 'mapping/mapmodule/event/AfterAddMarkerEvent.md';
      e.target.href = this.$root.documentPathEvent + documentPathEnd;
    }
  }
}
</script>
