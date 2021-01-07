<template>
  <div id="MarkerClickEvent">
    <div>Occurs after a marker's been clicked</div>
    <div>
      <a id="markerClick" href="" @click="getLink">To the documentation</a>
    </div>

    <code-component snippet="{
      'id': 'REPORT_MARKER'
  }"></code-component>
  </div>
</template>
<script>
export default {
  name: 'MarkerClickEvent',
  label: 'MarkerClickEvent',
  data () {
    return {
      desc: 'MarkerClickEvent'
    }
  },
  methods: {
    getLink (e) {
      let documentPathEnd = 'mapping/mapmodule/event/MarkerClickEvent.md';
      e.target.href = this.$root.documentPathEvent + documentPathEnd;
    }
  }
}
</script>
