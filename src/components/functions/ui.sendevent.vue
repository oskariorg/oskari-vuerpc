<template>
  <div id="SendUIEvent">
    <div>
      Open/close coordinatetool's popup:
      <button id="btnSendUIEvent"
      class="btn btn-primary exampleready" @click="sendUIEvent">SendUIevent</button>
    </div>
    <CodeSnippet>
var toolname = 'coordinatetool';
channel.sendUIEvent([toolname], function(data) {
  channel.log('sendUIEvent: ', data);
});
    </CodeSnippet>

    <div>
      Toggle the map's center crosshair:
      <button id="toggleCrosshair"
      class="btn btn-primary exampleready" @click="toggleCrosshair">Toggle crosshair</button>
    </div>
    <CodeSnippet>
var toolname = 'mapmodule.crosshair';
channel.sendUIEvent([toolname], function(data) {
  channel.log('sendUIEvent: ', data);
});
    </CodeSnippet>
  </div>
</template>
<script>
export default {
  name: 'SendUIEvent',
  label: 'Send UI event',
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
