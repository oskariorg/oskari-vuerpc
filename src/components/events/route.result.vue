<template>
  <div ref="RouteResultEvent">
    <div>Occurs after a route search has been completed</div>
    <div>
      <a id="routeResult" href="">To the documentation</a>
    </div>
    <code-component :snippet="result"></code-component>
    </div>
</template>
<script>
import { route } from '../../util/examplecodes.js';
export default {
  name: 'RouteResultEvent',
  data () {
    return {
      desc: 'RouteResultEvent',
      result: route.result
    }
  },
  methods: {

  }
}
</script>
