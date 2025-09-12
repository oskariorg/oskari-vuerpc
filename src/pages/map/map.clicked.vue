<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      The <InlineCode>{{ eventName }}</InlineCode> occurs after the map has been clicked. Click the
      map to see the events in the log and below.
    </p>
    <DocumentationLink type="event" :apiDoc="apiDocPage">
      Documentation for {{ eventName }}
    </DocumentationLink>
    <CodeSnippet>
      {{ clickEventSnippet }}
    </CodeSnippet>
    If a map click opens an info box, a <InlineCode>DataForMapLocationEvent</InlineCode> is
    triggered. The event contains the data of the opened info box, allowing programmatic access to
    the data. Press the 'Toggle layer' button and then click on the map to see the events in the
    codebox below.
    <RunExampleButton @click="toggleLayerVisibility">Toggle layer</RunExampleButton>
    <CodeSnippet>
      {{ mapLocationEventSnippet }}
    </CodeSnippet>
  </div>
</template>

<script>
import EVENTBUS from '../../util/eventbus';

const apiDocPage = 'mapping/mapmodule/event/MapClickedEvent.md';
const title = 'Reacting to map clicks';
const eventName = 'MapClickedEvent';

// listeners is references to event listeners registered
// by this example so we can remove them when the user leaves the page
const listeners = {};

export default {
  name: 'MapClickedEvent',
  label: title,
  data() {
    return {
      title,
      eventName,
      apiDocPage,
      isVisible: false,
      clickEvent: {},
      mapLocationEvent: {}
    };
  },
  computed: {
    clickEventSnippet() {
      // Changing slot content won't update the code highlight at runtime
      // If we pass the whole snippet as prop it will be updated as expected
      return JSON.stringify(this.clickEvent, null, 2);
    },
    mapLocationEventSnippet() {
      return JSON.stringify(this.mapLocationEvent, null, 2);
    }
  },
  methods: {
    toggleLayerVisibility() {
      this.isVisible = !this.isVisible;
      this.$root.channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [
        492,
        this.isVisible
      ]);
    }
  },
  mounted() {
    listeners['MapClickedEvent'] = EVENTBUS.on('MapClickedEvent', (data) => {
      this.clickEvent = data;
    });
    listeners['DataForMapLocationEvent'] = EVENTBUS.on('DataForMapLocationEvent', (data) => {
      this.mapLocationEvent = data;
    });
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    Object.entries(listeners).forEach(([event, callback]) => {
      EVENTBUS.off(event, callback);
      delete listeners[event];
    });
    this.$root.channel.postRequest('InfoBox.HideInfoBoxRequest', ['getinforesult']);
    if (this.isVisible) {
      this.toggleLayerVisibility();
    }
  }
};
</script>
