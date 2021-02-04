<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Request feedback data on current map area.
      <RunExampleButton @click="getFeedbackRequest">GetFeedbackRequest</RunExampleButton>
    </p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequest">Documentation for {{ requestName }}</DocumentationLink>
    
    <CodeSnippet>
      channel.postRequest('GetFeedbackRequest', [{{ JSON.stringify(requestPayload, null, 2) }}]);
    </CodeSnippet>
    <p>
    Note! You can get the bbox for current map viewport by calling 
    
    <CodeSnippet>
      channel.getMapBbox((data) => { /* pass data.left, bottom, right, top to GetFeedbackRequest */ });
    </CodeSnippet>
    </p>
  </div>
</template>
<script>
import EVENTBUS from '../../util/eventbus';

const title = 'Get posted feedback data (poc)';
const requestName = 'GetFeedbackRequest';
const apiDocPageRequest = 'mapping/feedbackService/request/getfeedbackrequest.md';

// listeners is references to event listeners registered
// by this example so we can remove them when the user leaves the page
const listeners = [];

const getFilterData = (bbox) => {
    return {
      "srs": "EPSG:3067",
      "payload": {
        "start_date": "2016-09-01T00:00:00Z",
        "bbox": bbox.left + ',' + bbox.bottom + ',' + bbox.right + ',' + bbox.top,
        "status": "open,closed"
      }
    };
};

export default {
  name: 'GetFeedbackRequest',
  label: title,
  data () {
    return {
      title,
      requestName,
      apiDocPageRequest,
      requestPayload: getFilterData({left: 1, bottom: 2, right: 3, top: 4})
    }
  },
  mounted () {
    listeners.push(EVENTBUS.on('FeedbackResultEvent', (data) => {
      // using channel from global variable...
      showFeedbackOnMap(data, channel);
    }));
  },
  beforeDestroy: () => {
    // Clean up when user leaves the example
    // NOTE! We don't have this.$root here so relying on global channel variable
    // const channel = this.$root.channel;
    channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
    // Clean up when user leaves the example
    while (listeners.length) {
      EVENTBUS.off('FeedbackResultEvent', listeners.pop());
    }
  },
  methods: {
    getFeedbackRequest () {
      this.$root.channel.getMapBbox((data) => {
        const params = getFilterData(data);
        this.$root.channel.postRequest(requestName, [params]);
        this.$root.channel.log(requestName + ' posted with data', params);
      });
    }
  }
}

const showPopup = (msg, seconds = 5) => {
  EVENTBUS.notify('rpcAppDisplayMessage', { msg, seconds });
};

const showFeedbackOnMap = (response = {}, channel) => {
    if (!response.success) {
        showPopup('Getting feedback response failed!');
        return;
    }
    const geoJSON = response.data && response.data.getFeedback ? response.data.getFeedback : undefined;
    if (!geoJSON) {
      showPopup(`Got feedback response, but it didn't include geojson to show!`);
      return;
    }

    showPopup('Getting feedback response success!');
    channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [geoJSON, {
        clearPrevious: true,
        centerTo: true,
        cursor: 'zoom-in'
      }
    ]);
};

</script>
