<template>
  <div ref="FeedbackResultEvent">
    <div>Occurs after a feedback request has been completed</div>
    <div>
      <a ref="feedbackResult" href="" @click="getLink">To the documentation</a>
    </div>

    <code-component>
{


}
    </code-component>
  </div>
</template>
<script>
export default {
  name: 'FeedbackResultEvent',
  label: 'FeedbackResultEvent',
  data () {
    return {
      desc: 'FeedbackResultEvent'
    }
  },
  methods: {
    getLink (e) {
      var documentPathEnd = 'mapping/feedbackService/event/feedbackresultevent.md';
      e.target.href = this.$root.documentPathEvent + documentPathEnd;
    }
  }
}
</script>
