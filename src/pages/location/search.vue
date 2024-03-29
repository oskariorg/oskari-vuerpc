<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      The search for the Oskari intance can be used programmatically with
      <InlineCode>{{ requestName }}</InlineCode> (even if the search UI is not shown on the map).
      This usually allows searching for place names and based on the Oskari instance configuration
      could also return any type of points of interest.
    </p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequest">
      Documentation for {{ requestName }}
    </DocumentationLink>

    <CodeSnippet :runnable="true" buttonText="Send request">
      channel.postRequest('{{ requestName }}', ['Oulunkylä']);
    </CodeSnippet>
    <p>
      You can try different search parameters by editing the code above. The query string can be for
      example a location or an address.
    </p>
    <br />
    <h3>Search event</h3>
    <p>
      A <InlineCode>SearchResultEvent</InlineCode> occurs after every search request. Event response
      is results of request.<br /><br />
      <DocumentationLink type="event" :apiDoc="apiDocPageEvent">
        Documentation for {{ eventName }}
      </DocumentationLink>
      <CodeSnippet>
{
  "success": true,
  "result": {
    "methods": [
      {
        "REGISTER_OF_NOMENCLATURE_CHANNEL": true
      },
      {
        "MAASTO_ADDRESS_CHANNEL": true
      },
      {
        "KTJ_KII_CHANNEL": true
      }
    ],
    "locations": [
      {
        "zoomScale": 11300,
        "name": "Oulunkylä",
        "rank": 30,
        "lon": 387200.803,
        "id": 0,
        "type": "Kylä, kaupunginosa tai kulmakunta",
        "region": "Helsinki",
        "lat": 6678670.159,
        "channelId": "REGISTER_OF_NOMENCLATURE_CHANNEL"
      },
      {
        "zoomScale": 5650,
        "name": "Oulunkylä",
        "rank": 40,
        "lon": 387322.093,
        "id": 1,
        "type": "Rautatieliikennepaikka",
        "region": "Helsinki",
        "lat": 6678529.481,
        "channelId": "REGISTER_OF_NOMENCLATURE_CHANNEL"
      }
    ],
    "totalCount": 2
  },
  "requestParameters": "Oulunkylä"
}
      </CodeSnippet>
    </p>
  </div>
</template>

<script>
import EVENTBUS from '../../util/eventbus';

const title = 'Perform a search';
const requestName = 'SearchRequest';
const eventName = 'SearchResultEvent';
const apiDocPageRequest = 'framework/search/request/SearchRequest.md';
const apiDocPageEvent = 'framework/search/event/SearchResultEvent.md';
const listeners = [];

const getMarkerTemplate = (x, y, msg) => {
  const template = {
    size: 4,
    shape: 2,
    color: '00FF00',
    x,
    y,
    msg
  };
  return template;
};

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
  channel.postRequest('MapMoveRequest', [
    firstResult.lon,
    firstResult.lat,
    {
      scale: firstResult.zoomScale
    }
  ]);

  // add a marker for first result
  const marker = getMarkerTemplate(
    firstResult.lon,
    firstResult.lat,
    firstResult.name + '_' + firstResult.type + '_' + firstResult.region
  );
  channel.postRequest('MapModulePlugin.AddMarkerRequest', [marker, SEARCH_RESULT_MARKER_ID]);

  if (data.result.totalCount === 1) {
    showPopup('Zoomed to ' + firstResult.name);
    return;
  }
  const list = data.result.locations.map((loc) => loc.name + ' / ' + loc.type + ' / ' + loc.region);
  showPopup('Zoomed to 1st one -  \n ' + list.join('\n'));
};

export default {
  name: requestName,
  label: title,
  data() {
    return {
      title,
      requestName,
      eventName,
      apiDocPageRequest,
      apiDocPageEvent,
      query: 'Oulunkylä'
    };
  },
  mounted() {
    listeners.push(
      EVENTBUS.on('SearchResultEvent', (data) => handleSearchResult(data, this.$root.channel))
    );
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    this.$root.channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
    while (listeners.length) {
      EVENTBUS.off('SearchResultEvent', listeners.pop());
    }
  }
};
</script>
