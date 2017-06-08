<template>
  <div id="GetFeedbackRequest">
    <div style="display: block;">
      <button id="btnGetFeedbackRequest" class="btn btn-primary exampleready" @click="getFeedbackRequest">GetFeedbackRequest</button>
      <div>Request feedback data on current map area</div>
    </div>
    <div>
      <a id="getFeedback" href="">To the documentation</a>
    </div>
    <code-component :snippet="req"></code-component>
  </div>
</template>
<script>
import { feedback } from '../../util/examplecodes.js';
export default {
  name: 'GetFeedbackRequest',
  data () {
    return {
      desc: 'Get posted feedback data (poc)',
      req: feedback.req
    }
  },
  methods: {
    getFeedbackRequest () {
      this.$root.channel.getMapBbox((data) => {
        const filterdata = {
          'start_date': '2016-09-01T00:00:00Z',
          'bbox': data.left + ',' + data.bottom + ',' + data.right + ',' + data.top,
          'status': 'open,closed'
        };
        data = {
          'srs': 'EPSG:3067',
          'payload': filterdata
        };
        this.$root.channel.postRequest('GetFeedbackRequest', [data]);
      });
    }
  }
}
</script>
