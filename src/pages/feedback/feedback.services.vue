<template>
  <div id="GetFeedbackServices">
    <div style="display: block">
      <div>Request feedback service listing</div>

      <button
        id="btnGetFeedbackServiceRequest"
        class="btn btn-primary exampleready"
        @click="getFeedbackServiceRequest"
      >
        GetFeedbackServiceRequest for a list
      </button>
      <CodeSnippet>{{ list }}</CodeSnippet>
      <br />
      <div>Request feedback service metadata.</div>
      <div>
        <b>Note!</b> if metadata property is false in the listing the details might not be available
        as it's optional in the Open311 specification.
      </div>
      <br />
      <b>Note!</b> Our test service doesn't have any metadata, so an error will be logged when
      pressing the button.
    </div>
    <button
      id="btnGetFeedbackServiceRequest2"
      class="btn btn-primary exampleready"
      @click="GetFeedbackServiceRequestWithId"
    >
      GetFeedbackServiceRequest for metadata of single service.
    </button>
    <CodeSnippet>{{ id }}</CodeSnippet>
    <div>
      <a ref="getFeedbackService" href="" @click="getLink">To the documentation</a>
    </div>
  </div>
</template>
<script>
const services = {
  list: "channel.postRequest('GetFeedbackServiceRequest', []);",
  id: 'channel.postRequest(\'GetFeedbackServiceRequest\', ["180"]);'
};
export default {
  name: 'GetFeedbackServices',
  label: 'Get feedback services (poc)',
  data() {
    return {
      desc: 'Get feedback services (poc)',
      list: services.list,
      id: services.id
    };
  },
  methods: {
    getFeedbackServiceRequest() {
      this.$root.channel.postRequest('GetFeedbackServiceRequest', []);
    },
    GetFeedbackServiceRequestWithId() {
      this.$root.channel.postRequest('GetFeedbackServiceRequest', ['180']);
    },
    getLink(e) {
      var documentPathEnd = 'mapping/feedbackService/request/getfeedbackservicerequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
};
</script>
