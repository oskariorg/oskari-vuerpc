<template>
  <div ref="ShowProgressSpinnerRequest">
    <button id="btnShowProgressSpinnerRequest" class="btn btn-primary" @click="showProgressSpinner">ShowProgressSpinnerRequest</button>
    <div>ShowProgressSpinnerRequest allows starting and stopping a progress indicator on top of the map.</div>
    <div>
      <a id="showProgressSpinner" href="">To the documentation</a>
    </div>
        <code-component snippet="var isVisible = true;
        channel.postRequest('ShowProgressSpinnerRequest',[isVisible]);"></code-component>
  </div>
</template>
<script>
export default {
  name: 'ShowProgressSpinnerRequest',
  data () {
    return {
      progressSpinnerVisible: false
    }
  },
  methods: {
    showProgressSpinner () {
      const isVisible = !this.progressSpinnerVisible;
      this.$root.channel.postRequest('ShowProgressSpinnerRequest', [isVisible]);
      this.$root.channel.log('ShowProgressSpinnerRequest posted with data', isVisible);
      this.progressSpinnerVisible = !this.progressSpinnerVisible;
    }
  }
}
</script>
