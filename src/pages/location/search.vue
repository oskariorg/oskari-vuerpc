<template>
  <div>
    <h2>{{ title }}</h2>
    <p>The search for the Oskari intance can be used programmatically with {{ requestName }}.
      (even if the search UI is not shown on the map). This usually allows searching for place names
      and based on the Oskari instance configuration could also return any type of points of interest.
    </p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequest">Documentation for {{requestName}}</DocumentationLink>

    <div>
        <input v-model="query" placeholder="Search query">
        <button id="btnSearchRequest" class="btn btn-primary exampleready" @click="searchRequest">SearchRequest</button>
    </div>

    <CodeSnippet :snippet="codeSnippet" />
  </div>
</template>

<script>
import EVENTBUS from '../../util/eventbus';
import { getMarkerTemplate } from '../../util/markers_helpers';
const title = 'Perform a search';

const requestName = 'SearchRequest';
const apiDocPageRequest = 'framework/search/request/SearchRequest.md';
const listeners = [];

const showPopup = (msg, seconds = 5) => {
  EVENTBUS.notify('rpcAppDisplayMessage', { msg, seconds });
};

const SEARCH_RESULT_MARKER_ID = 'REPORT_MARKER';
const handleSearchResult = (data, channel) => {
    if (!data || !data.result || !channel) {
      return;
    }
    if (!data.success) {
      showPopup('Search error: ' + data.result.responseText);
      return;
    }
    if (data.result.totalCount === 0) {
      showPopup('No items found - search key: ' + data.requestParameters);
      return;
    }
    const firstResult = data.result.locations[0];

    // move map to show first result
    channel.postRequest('MapMoveRequest', [firstResult.lon, firstResult.lat, {
      scale: firstResult.zoomScale
    }]);

    // add a marker for first result
    const marker = getMarkerTemplate(firstResult.lon, firstResult.lat,
      firstResult.name + '_' + firstResult.type + '_' + firstResult.region);
    channel.postRequest('MapModulePlugin.AddMarkerRequest', [marker, SEARCH_RESULT_MARKER_ID]);

    if (data.result.totalCount === 1) {
      showPopup('Zoomed to ' + firstResult.name)
      return;
    }
    const list = data.result.locations.map(loc => loc.name + ' / ' + loc.type + ' / ' + loc.region);
    showPopup('Zoomed to 1st one -  \n ' + list.join('\n'));
}

export default {
  name: requestName,
  label: title,
  data () {
    return {
      title,
      requestName,
      apiDocPageRequest,
      query: 'Vantaa'
    }
  },
  computed: {
    codeSnippet () {
      // Changing slot content won't update the code highlight at runtime
      // If we pass the whole snippet as prop it will be updated as expected
      return `channel.postRequest('${requestName}', ['${this.query}']);`;
    }
  },
  methods: {
    searchRequest () {
      this.$root.channel.postRequest(requestName, [this.query]);
      this.$root.channel.log(requestName + ' posted with data', this.query);
    }
  },
  mounted () {
    listeners.push(EVENTBUS.on('SearchResultEvent', (data) => handleSearchResult(data, this.$root.channel)));
  },
  beforeDestroy: () => {
    // Clean up when user leaves the example
    while (listeners.length) {
      EVENTBUS.off('SearchResultEvent', listeners.pop());
    }
  }
}
</script>
