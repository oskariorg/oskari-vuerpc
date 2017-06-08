<template>
  <div ref="AfterAddMarkerEvent">
    <div>Occurs after a marker has been added to map</div>
    <div>
      <a id="afterAddMarker" href="">To the documentation</a>
    </div>

    <code-component snippet="{
      'id': 'SEARCH_RESULT_MARKER'
  }"></code-component>

  </div>
</template>
<script>
export default {
  name: 'AfterAddMarkerEvent',
  data () {
    return {
      desc: 'AfterAddMarkerEvent'
    }
  },
  methods: {

  }
}
</script>
