<template>
  <div>
    <h2>{{ title }}</h2>
    <h3>{{ requestName }} request</h3>
    <p>
      The <InlineCode>{{ requestName }}</InlineCode> request can be used to rotate the map
      programmatically.
    </p>

    <DocumentationLink type="request" :apiDoc="apiDocPageRequest">
      Documentation for request: {{ requestName }}
    </DocumentationLink>

    <CodeSnippet :runnable="true" :buttonText="`Rotate map to ${rotateDegrees} degrees`">
      channel.postRequest('{{ requestName }}', [{{ rotateDegrees }}]);
    </CodeSnippet>
    <h3>{{ eventName }} event</h3>
    <p>
      The user can rotate the map by dragging it with "shift- and alt-keys" down while dragging. You
      should see a number of <InlineCode>{{ eventName }}</InlineCode> events in the log after the
      map has been rotated this way.
    </p>
    <DocumentationLink type="event" :apiDoc="apiDocPageEvent">
      Documentation for event: {{ eventName }}
    </DocumentationLink>
    <p>
      Note! The programmatically rotated map does NOT trigger the event at the time of writing this
      example. This might change in the future.
    </p>

    <h3>Resetting rotation</h3>
    <p>To reset rotation you can use the same request without parameters:</p>
    <CodeSnippet :runnable="true" buttonText="Reset rotation">
      channel.postRequest('{{ requestName }}', []);
    </CodeSnippet>
  </div>
</template>
<script>
const apiDocPageRequest = 'mapping/maprotator/request/rotate.map-request';
const apiDocPageEvent = 'mapping/maprotator/event/map.rotated.md';
const title = 'Rotate map';
const requestName = 'rotate.map';
const eventName = 'map.rotated';

export default {
  name: 'MapRotate',
  label: title,
  data() {
    return {
      title,
      apiDocPageRequest,
      apiDocPageEvent,
      eventName,
      requestName,
      rotateDegrees: 180
    };
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    this.$root.channel.postRequest('rotate.map', []);
  }
};
</script>
