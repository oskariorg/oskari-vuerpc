<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      <InlineCode>ShowProgressSpinnerRequest</InlineCode> allows starting and stopping a progress
      indicator on top of the map. The request takes a boolean as its only parameter.
    </p>
    <CodeSnippet :runnable="true" buttonText="Start spinner">
      channel.postRequest('ShowProgressSpinnerRequest', [true]);
    </CodeSnippet>
    <CodeSnippet :runnable="true" buttonText="Stop spinner">
      channel.postRequest('ShowProgressSpinnerRequest', [false]);
    </CodeSnippet>
    <DocumentationLink type="request" apiDoc="ShowProgressSpinnerRequest">To the documentation</DocumentationLink>
  </div>
</template>
<script>
const title = 'Show a progress spinner';
export default {
  name: 'ShowProgressSpinnerRequest',
  label: title,
  data() {
    return {
      title
    };
  },
  beforeUnmount() {
    this.$root.channel.postRequest('ShowProgressSpinnerRequest', [false]);
  }
};
</script>
