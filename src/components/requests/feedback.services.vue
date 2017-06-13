<template>
  <div id="GetFeedbackServices">
    <div style="display: block;">
      <button id="btnGetFeedbackServiceRequest" class="btn btn-primary exampleready" @click="getFeedbackServiceRequest">GetFeedbackServiceRequest for a list</button>
      <div>Request feedback service listing</div>
      <button id="btnGetFeedbackServiceRequest2" class="btn btn-primary exampleready" @click="GetFeedbackServiceRequestWithId">GetFeedbackServiceRequest for metadata of single service.</button>
      <div>Request feedback service metadata.
        <b>Note!</b> if metadata property is false in the listing the details might not be available as it's optional in the Open311 specification.</div>
      </div>
      <div>
        <a ref="getFeedbackService" href="" @click="getLink">To the documentation</a>
      </div>
          <code-component :snippet="services"></code-component>
    </div>
</template>
<script>
import { feedback } from '../../util/examplecodes.js';
export default {
  name: 'GetFeedbackServices',
  data () {
    return {
      desc: 'Get feedback services (poc)',
      services: feedback.services
    }
  },
  methods: {
    getFeedbackServiceRequest () {
      this.$root.channel.postRequest('GetFeedbackServiceRequest', []);
    },
    GetFeedbackServiceRequestWithId () {
      this.$root.channel.postRequest('GetFeedbackServiceRequest', ['180']);
    },
    getLink (e) {
      var documentPathEnd = 'mapping/feedbackService/request/getfeedbackservicerequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
}
</script>
