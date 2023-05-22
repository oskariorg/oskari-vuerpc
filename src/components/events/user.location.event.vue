<template>
  <div id="UserLocationEvent">
    <div>Occurs after user's location is fetched</div>
    <div>
      <a id="userLocation" href="" @click="getLink">To the documentation</a>
    </div>
    <code-component>
{
  'lon': 386436.3607007161,
  'lat': 6672447.439965934
}
    </code-component>
  </div>
</template>
<script>
export default {
  name: 'UserLocationEvent',
  label: 'UserLocationEvent',
  data () {
    return {
      desc: 'UserLocationEvent'
    }
  },
  methods: {
    getLink (e) {
      var documentPathEnd = 'mapping/mapmodule/event/userlocationevent.md';
      e.target.href = this.$root.documentPathEvent + documentPathEnd;
    }
  }
}
</script>
