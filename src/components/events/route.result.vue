<template>
  <div ref="RouteResultEvent">
    <div>Occurs after a route search has been completed</div>
    <div>
      <a id="routeResult" href="" @click=getLink"">To the documentation</a>
    </div>
    <code-component :snippet="result"></code-component>
    </div>
</template>
<script>
import { route } from '../../util/examplecodes.js';
export default {
  name: 'RouteResultEvent',
  label: 'RouteResultEvent',
  data () {
    return {
      desc: 'RouteResultEvent',
      result: route.result
    }
  },
  methods: {
    getLink (e) {
      let documentPathEnd = 'mapping/routingService/event/routeresultevent.md';
      e.target.href = this.$root.documentPathEvent + documentPathEnd;
    }
  }
}
</script>
