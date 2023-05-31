<template>
  <div ref="ShowProgressSpinnerRequest">
    <button id="btnShowProgressSpinnerRequest" class="btn btn-primary" @click="showProgressSpinner">
      ShowProgressSpinnerRequest
    </button>
    <div>
      ShowProgressSpinnerRequest allows starting and stopping a progress indicator on top of the
      map.
    </div>
    <div>
      <a id="showProgressSpinner" href="" @click="getLink">To the documentation</a>
    </div>
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
      progressSpinnerVisible: false
    };
  },
  methods: {
    showProgressSpinner() {
      const isVisible = !this.progressSpinnerVisible;
      this.$root.channel.postRequest('ShowProgressSpinnerRequest', [isVisible]);
      this.$root.channel.log('ShowProgressSpinnerRequest posted with data', isVisible);
      this.progressSpinnerVisible = !this.progressSpinnerVisible;
    },
    getLink(e) {
      let documentPathEnd = 'mapping/mapmodule/request/ShowProgressSpinnerRequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  },
  beforeUnmount() {
    if (this.progressSpinnerVisible) {
      this.$root.channel.postRequest('ShowProgressSpinnerRequest', [false]);
    }
  }
};
</script>
