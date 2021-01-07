<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      The {{ eventName }} occurs after the map has been clicked. Click the map to see the events in the log and below.
    </p>
    <DocumentationLink type="event" :apiDoc="apiDocPage">Documentation for {{eventName}}</DocumentationLink>
    <CodeSnippet v-if="clickEvent" :snippet="clickEventSnippet" />
  </div>
</template>

<script>
import EVENTBUS from '../../util/eventbus';

const apiDocPage = 'mapping/mapmodule/event/MapClickedEvent.md';
const title = 'Reacting to map clicks';
const eventName = 'MapClickedEvent';

// listeners is references to event listeners registered
// by this example so we can remove them when the user leaves the page
const listeners = [];

export default {
  name: 'MapClickedEvent',
  label: title,
  data () {
    return {
      title,
      eventName,
      apiDocPage,
      clickEvent: null
    }
  },
  computed: {
    clickEventSnippet () {
      // Changing slot content won't update the code highlight at runtime
      // If we pass the whole snippet as prop it will be updated as expected
      return JSON.stringify(this.clickEvent, null, 2);
    }
  },
  mounted () {
    listeners.push(EVENTBUS.on('MapClickedEvent', (data) => {
      this.clickEvent = data;
    }));
  },
  beforeDestroy: () => {
    // Clean up when user leaves the example
    while (listeners.length) {
      EVENTBUS.off('MapClickedEvent', listeners.pop());
    }
  }
}
</script>
