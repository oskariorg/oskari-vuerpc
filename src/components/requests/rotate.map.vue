<template>
  <div>
    <h2>{{ title }}</h2>
    <p>This request can be used to move the map programmatically.</p>

    <DocumentationLink type="request" :apiDoc="apiDocPageRequest">Documentation for request: {{ requestName }}</DocumentationLink>
    <br/>
    <DocumentationLink type="event" :apiDoc="apiDocPageEvent">Documentation for event: {{ eventName }}</DocumentationLink>
    
    <CodeSnippet>
      channel.postRequest('{{ requestName }}', [{{ rotateDegrees }}]);
    </CodeSnippet>
    <p>
      Click the button to run the code above:
    <RunExampleButton @click="rotateMap(rotateDegrees)">{{ requestName }}</RunExampleButton>
    </p>
    
    <p>
      The user can rotate the map by dragging it with "shift- and alt-keys" down while dragging.
      You should also see a '{{ eventName }}' in the log after the map has rotated this way.
    </p>
    <p>
      The programmatically rotated map does NOT trigger the event at the time of writing
      this example. This might change in the future.
    </p>

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
  name: 'rotateMap',
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
  }
}
</script>
