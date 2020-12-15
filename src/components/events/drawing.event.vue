<template>
  <div ref="DrawingEvent">
    <div>Occurs when drawing is in progress</div>
    <div>
      <a id="drawingEvent" href="" @click="getLink">To the documentation</a>
    </div>

    <code-component :snippet="event"></code-component>

    <!-- <div class="messageBox"></div> -->
  </div>
</template>
<script>
import { drawing } from '../../util/examplecodes.js';
export default {
  name: 'DrawingEvent',
  labe: 'Drawing Event',
  data () {
    return {
      desc: 'Drawing Event',
      event: drawing.event
    }
  },
  methods: {
    getLink (e) {
      var documentPathEnd = 'mapping/drawtools/event/DrawingEvent.md';
      e.target.href = this.$root.documentPathEvent + documentPathEnd;
    }
  }
}
</script>
