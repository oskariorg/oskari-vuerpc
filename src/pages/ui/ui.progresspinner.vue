<template>
  <div>
    <div>
      <InlineCode>ShowProgressSpinnerRequest</InlineCode> allows starting and stopping a progress
      indicator on top of the map. The request takes a boolean as its only parameter.
    </div>
    <DocumentationLink type="request" :apiDoc="apiDocPage">To the documentation</DocumentationLink>
    <CodeSnippet :runnable="true" buttonText="Send request">
      channel.postRequest('ShowProgressSpinnerRequest', [true]);
    </CodeSnippet>
  </div>
</template>
<script>
export default {
  name: 'ShowProgressSpinnerRequest',
  label: 'Show a progress spinner',
  data() {
    return {
      desc: 'Show a progress spinner',
      apiDocPage: 'mapping/mapmodule/request/ShowProgressSpinnerRequest.md'
    };
  },
  beforeUnmount() {
    this.$root.channel.postRequest('ShowProgressSpinnerRequest', [false]);
  }
};
</script>
