<template>
  <div>
    <h2>{{ title }}</h2>
    <h3>{{ requestName }} request</h3>
    <p>The {{ requestName }} request can be used to rotate the map programmatically.</p>

    <DocumentationLink type="request" :apiDoc="apiDocPageRequest">Documentation for request: {{ requestName }}</DocumentationLink>
    
    <CodeSnippet>
      channel.postRequest('{{ requestName }}', [{{ rotateDegrees }}]);
    </CodeSnippet>
    <p>
      Click the button to run the code above:
    <RunExampleButton @click="rotateMap(rotateDegrees)">Rotate map to {{ rotateDegrees }} degrees</RunExampleButton>
    </p>
    
    <h3>{{ eventName }} event</h3>
    <p>
      The user can rotate the map by dragging it with "shift- and alt-keys" down while dragging.
      You should see a number of '{{ eventName }}' events in the log after the map has been rotated this way.
    </p>
    <DocumentationLink type="event" :apiDoc="apiDocPageEvent">Documentation for event: {{ eventName }}</DocumentationLink>
    <p>
      Note! The programmatically rotated map does NOT trigger the event at the time of writing
      this example. This might change in the future.
    </p>

    
    <h3>Resetting rotation</h3>
    <p>To reset rotation you can use the same request without parameters:</p>  
    <CodeSnippet>
      channel.postRequest('{{ requestName }}', []);
    </CodeSnippet>
    
    <RunExampleButton @click="rotateMap">Reset Rotation</RunExampleButton>
  </div>
</template>
<script>
const apiDocPageRequest = 'mapping/maprotator/request/rotate.map.md';
const apiDocPageEvent = 'mapping/maprotator/event/map.rotated.md';
const title = 'Rotate map';
const requestName = 'rotate.map';
const eventName = 'map.rotated';

export default {
  name: 'MapRotate',
  label: title,
  data () {
    return {
      title,
      apiDocPageRequest,
      apiDocPageEvent,
      eventName,
      requestName,
      rotateDegrees: 180
    }
  },
  methods: {
    rotateMap (amount) {
      const params = [];
      if (amount) {
        params.push(amount);
      }
      this.$root.channel.postRequest('rotate.map', params);
      this.$root.channel.log('rotate.map posted with data', params);
    }
  },
  beforeDestroy: () => {
    // Clean up when user leaves the example
    channel.postRequest('rotate.map', []);
  }
}
</script>
