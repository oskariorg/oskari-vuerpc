<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      The <InlineCode>getScreenshot()</InlineCode> function on the RPC API client can be used to
      generate a dataurl for a PNG-image based on the current map viewport.
    </p>
    <DocumentationLink type="bundle" :apiDoc="apiDocPage">
      Documentation for RPC functions
    </DocumentationLink>
    <p>
      Note! This is an experimental function and also requires suitable CORS-enabled map layers on
      the published map AND screenshot configuration enabled for the layers that would be used for
      screenshot on the Oskari instance.
    </p>

    <CodeSnippet>
channel.getScreenshot(function (data) {
  // set image content to an img tag in your html
  document.getElementById('getScreenshotImgTag').src = data;
});
    </CodeSnippet>
    <p>
      Click the button to get the result shown as image below:
      <RunExampleButton @click="getScreenshot">Generate screenshot</RunExampleButton>
    </p>
    <div v-if="dataUrl">
      Screenshot result:
      <img style="border: 1px solid black; max-width: 100%; overflow: hidden" :src="dataUrl" />
    </div>
  </div>
</template>

<script>
const apiDocPage = 'framework/rpc';
const title = 'Get a screenshot of the map';

export default {
  name: 'GetScreenshot',
  label: title,
  data() {
    return {
      title,
      apiDocPage,
      dataUrl: ''
    };
  },
  methods: {
    getScreenshot() {
      this.$root.channel.getScreenshot((data) => {
        const success = data && data.length;
        const msg = 'GetScreenshot ' + (success ? 'success ' : 'failed');
        this.dataUrl = data;
        this.$root.channel.log(msg);
      });
    }
  }
};
</script>
