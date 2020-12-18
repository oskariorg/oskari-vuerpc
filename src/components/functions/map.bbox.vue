<template>
  <div>
    <h2>{{ title }}</h2>
    
    <p>
      getMapBbox() function on the RPC API client can be
      used to get the bbox coordinates for the current map viewport.
    </p>
    <DocumentationLink type="bundle" :apiDoc="apiDocPage">Documentation for RPC functions</DocumentationLink>

    <CodeSnippet>
channel.getMapBbox(function (data) {
  channel.log('GetMapBbox:', data);
});
    </CodeSnippet>    
    <p>
      Click the button to get the result shown on the log:
      <RunExampleButton @click="getMapBbox">Get map bbox</RunExampleButton>
    </p>
  </div>
</template>

<script>
const apiDocPage = 'framework/rpc';
const title = 'Get map bbox';

export default {
  name: 'GetMapBbox',
  label: title,
  data () {
    return {
      title,
      apiDocPage
    }
  },
  methods: {
    getMapBbox () {
      this.$root.channel.getMapBbox((data) => {
        this.$root.channel.log('GetMapBbox: ', data);
      });
    }
  }
}
</script>
