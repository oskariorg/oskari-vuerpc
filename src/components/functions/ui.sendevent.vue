<template>
  <div id="SendUIEvent">
    <div>
      Open/close coordinatetool's popup:
      <button id="btnSendUIEvent"
      class="btn btn-primary exampleready" @click="sendUIEvent">SendUIevent</button>
    </div>
    <code-component snippet="var toolname = 'coordinatetool';
    channel.sendUIEvent([toolname], function(data) {
      channel.log('sendUIEvent: ', data);
    });"></code-component>

    <div>
      Toggle the map's center crosshair:
      <button id="toggleCrosshair"
      class="btn btn-primary exampleready" @click="toggleCrosshair">Toggle crosshair</button>
    </div>
    <code-component snippet="var toolname = 'mapmodule.crosshair';
    channel.sendUIEvent([toolname], function(data) {
      channel.log('sendUIEvent: ', data);
    });"></code-component>
  </div>
</template>
<script>
export default {
  name: 'SendUIEvent',
  data () {
    return {
      desc: 'Send UI event'
    }
  },
  methods: {
    sendUIEvent () {
      this.$root.channel.sendUIEvent(['coordinatetool'], (data) => {
        this.$root.channel.log('sendUIEvent: ', data)
      })
    },
    toggleCrosshair () {
      this.$root.channel.sendUIEvent(['mapmodule.crosshair'], (data) => {
        this.$root.channel.log('sendUIEvent mapmodule.crosshair: ', data)
      })
    }
  }
}
</script>
