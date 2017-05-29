<template>
  <div id="stateHandling">
    <button id="btnResetState" class="btn btn-primary" @click="resetState">Reset state</button>
    <button id="btnSaveState" class="btn btn-primary" @click="saveState">Save state</button>
    <button id="btnLoadState" class="btn btn-primary" @click="loadState">Load state</button>
    <div id = "resetState">
      <div>Resets the saved map state</div>
      <code-component snippet="channel.resetState(function(){
        channel.log('State Reset');
      });"></code-component>
    </div>

    <div id = "saveState">
      <div>Saves the map's current state</div>
      <code-component snippet="channel.getCurrentState(function(data) {
        this.savedState = data;
        channel.log('GetCurrentState: ', data);
      });"></code-component>
    </div>

    <div id="loadState">
      <div>Loads a saved map state</div>
      <code-component snippet="channel.useState([this.savedState], function(){
        channel.log('UseState: ', this.savedState);
      });"></code-component>
    </div>
  </div>
</template>
<script>
export default {
  name: 'stateHandling',
  data () {
    return {
      savedState: ''
    }
  },
  methods: {
    resetState () {
      this.$root.channel.resetState(() => {
        this.$root.channel.log('State Reset');
      });
    },
    saveState () {
      this.$root.channel.getCurrentState((data) => {
        this.savedState = data
        this.$root.channel.log('GetCurrentState: ', data);
      });
    },
    loadState () {
      this.$root.channel.useState([this.savedState], () => {
        this.$root.channel.log('UseState: ', this.savedState);
      });
    }
  }
}
</script>
