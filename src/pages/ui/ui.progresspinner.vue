<template>
  <div>
    <RunExampleButton @click="showProgressSpinner">ShowProgressSpinnerRequest</RunExampleButton>
    <div>
      <InlineCode>ShowProgressSpinnerRequest</InlineCode> allows starting and stopping a progress
      indicator on top of the map.
    </div>
    <DocumentationLink type="request" :apiDoc="apiDocPage">To the documentation</DocumentationLink>
    <CodeSnippet>
var isVisible = true;
channel.postRequest('ShowProgressSpinnerRequest',[isVisible]);
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
      apiDocPage: 'mapping/mapmodule/request/ShowProgressSpinnerRequest.md',
      progressSpinnerVisible: false
    };
  },
  methods: {
    showProgressSpinner() {
      const isVisible = !this.progressSpinnerVisible;
      this.$root.channel.postRequest('ShowProgressSpinnerRequest', [isVisible]);
      this.$root.channel.log('ShowProgressSpinnerRequest posted with data', isVisible);
      this.progressSpinnerVisible = !this.progressSpinnerVisible;
    }
  },
  beforeUnmount() {
    if (this.progressSpinnerVisible) {
      this.$root.channel.postRequest('ShowProgressSpinnerRequest', [false]);
    }
  }
};
</script>
