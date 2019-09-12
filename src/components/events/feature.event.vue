<template>
  <div id="FeatureEvent">
    <div>Occurs after adding or removing features to or from map and after clicking a feature </div>
    <div>
      <a id="featureEvent" href="" @click="getLink">To the documentation</a>
    </div>

    <code-component :snippet="event"></code-component>

  </div>
</template>
<script>
import { features } from '../../util/examplecodes.js';
export default {
  name: 'FeatureEvent',
  data () {
    return {
      desc: 'Feature Event',
      event: features.event
    }
  },
  methods: {
    getLink (e) {
      var documentPathEnd = 'mapping/mapmodule/event/featureevent.md';
      e.target.href = this.$root.documentPathEvent + documentPathEnd;
    }
  }
}
</script>
