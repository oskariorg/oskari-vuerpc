<template>
  <div>
    <Documentation-site-top-bar />
    <div class="wrapper">
      <div class="row">
        <EmbeddedMap ref="mapElement" :domain="domain" :uuid="uuid" />
        <ActionPanel />
        <LogPanel ref="logElement" />
      </div>
      <div class="msg" ref="messageBox"></div>
    </div>
  </div>
</template>

<script>
  import OskariRPC from 'oskari-rpc';

  import Header from './components/ui-components/Header.vue';

  import EmbeddedMap from './components/ui-components/embedded-map.vue';
  import ActionPanel from './components/ui-components/actionpanel.vue';
  import LogPanel from './components/ui-components/logpanel.vue';
  import { createLogger, createOnReady } from './util/channelLogger';
  import { eventHandlers } from './util/eventHandlers.js';

  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import style from './style.css';
  
  const RPC_EVENTS = [
      'map.rotated',
      'AfterAddMarkerEvent',
      'MarkerClickEvent',
      'RouteResultEvent',
      'FeedbackResultEvent',
      'MapClickedEvent',
      'AfterMapMoveEvent',
      'UserLocationEvent',
      'SearchResultEvent',
      'FeatureEvent',
      'DrawingEvent',
      'InfoboxActionEvent',
      'InfoBox.InfoBoxEvent'
  ];

  export default {
    components: {
      'Documentation-site-top-bar': Header,
      'EmbeddedMap': EmbeddedMap,
      'ActionPanel': ActionPanel,
      'LogPanel': LogPanel
    },
    data () {
      return {
        domain: 'https://kartta.paikkatietoikkuna.fi',
        uuid: '053027f4-91d9-4351-aec4-c6a31dd68c56'
       }
    },
    methods: {
      initConnection () {
        const channel = OskariRPC.connect(
          this.$refs.mapElement.getIframeElement(),
          this.domain
        );
        // expose channel as global variable so it can be accessed from dev-console
        channel.log = createLogger(this.$store.state.channelLogs);
        createOnReady(channel, '2.0.0');
        // Note: this != this.$root
        this.$root.channel = channel;
        window.channel = channel;
        //this.initLogging();
      },
      exposeDocumentationPaths () {
        this.$root.documentPathRequest = '/api/requests#latest/';
        this.$root.documentPathEvent = '/api/events#latest/';
      },
      registerListenersForRPCEvents () {
        const channel = this.$root.channel;
        // TODO: maybe get all events from channel instead of hardcoded list?
        RPC_EVENTS.forEach(eventName => {
          // register listening to events
          channel.handleEvent(eventName, (data) => {
              // log them for user to see on the page
              channel.log(eventName, data);
              // if imported file has a handler, pass it to handler
              if (eventHandlers[eventName]) {
                // TODO: check that "this" makes sense.
                // Some of the eventHandlers are pretty wild on using it...
                eventHandlers[eventName](this, data);
              }
            });
        });
      }
    },
    mounted () {
      //this.$root.logdiv = this.$refs.logElement.getLogElement();
      this.initConnection();
      this.exposeDocumentationPaths();
      this.registerListenersForRPCEvents();
    } 
  }
</script>

<style lang="scss">
@import "~./assets/main.scss";
.msg {
  top: 50%;
  left: 38%;
  position: absolute;
  background-color: rgba(255, 0, 0, 0.3);
  box-shadow: 5px 5px 5px #888888;
}
.wrapper {
    position:absolute; 
    width: 98%;
    margin-left: 0;
    margin-right: 0;
    height:100%;
    font-size: calc(0.60rem + 1.0vh);
}
.row {
  height:800px !important;
  padding-left: 1em;
}
.full-height-panel {
  height: 98% !important;
}
.panel-body {
  padding: 1em !important;
}
</style>
