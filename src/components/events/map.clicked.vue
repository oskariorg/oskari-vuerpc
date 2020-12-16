<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Occurs after the map has been clicked. Click the map to see the event in the log.
    </p>
    <div>
      <a id="mapClicked" href="" @click="getLink">To the documentation</a>
    </div>
    <code-component>
{
  'lon': 423424,
  'lat': 6821888,
  'x': 312,
  'y': 236,
  'ctrlKeyDown': false
}
    </code-component>
  </div>
</template>
<script>
const apiDocPage = 'mapping/mapmodule/event/MapClickedEvent.md';
const title = 'MapClickedEvent';
export default {
  name: 'MapClickedEvent',
  label: title,
  data () {
    return {
      title
    }
  },
  computed: {
    documentationLink() {
      return this.$root.documentPathEvent + apiDocPage;
    }
  }
}
</script>
