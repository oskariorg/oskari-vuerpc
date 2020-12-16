<template>
  <div>
    <h2>{{ title }}</h2>
    <p>getMapPosition() function on the RPC API client can be
       used to get the center coordinates and zoom level for
       the current map viewport.
    </p>
    <DocumentationLink type="bundle" :apiDoc="apiDocPage">Documentation for RPC functions</DocumentationLink>
    <CodeSnippet>
channel.getMapPosition(function(data) {
  channel.log('GetMapPosition:', data);
});
    </CodeSnippet>
    <p>
      Click the button to get the result shown on the log:
      <RunExampleButton @click="logMapPosition">Get map position</RunExampleButton>
    </p>
  </div>
</template>

<script>
const apiDocPage = 'framework/rpc';
const title = 'Get map position';

export default {
  name: 'GetMapPosition',
  label: title,
  data () {
    return {
      title,
      apiDocPage
    }
  },
  methods: {
    logMapPosition () {
      this.$root.channel.getMapPosition((data) => {
        this.$root.channel.log('GetMapPosition: ', data);
      });
    }
  }
}
</script>
