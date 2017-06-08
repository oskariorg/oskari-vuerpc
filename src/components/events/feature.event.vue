<template>
  <div id="FeatureEvent">
    <div>Occurs after adding or removing features to or from map </div>
    <div>
      <a id="featureEvent" href="">To the documentation</a>
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

  }
}
</script>
