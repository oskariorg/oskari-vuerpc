<template>
  <div class="wrapper">
    <div class="row">
    </div>
    <div class="msg" ref="messageBox"></div>
  </div>
</template>
<script>
import Iframe from './ui-components/embedded-map.vue';
import ActionPanel from './ui-components/actionpanel.vue';
import LogPanel from './ui-components/logpanel.vue';
import { eventHandlers } from '../util/eventHandlers.js';

import OskariRPC from 'oskari-rpc';

export default {
  components: {
    'oskari-iframe': Iframe,
    'rpc-actions': ActionPanel,
    'oskari-log': LogPanel
  },
  data () {
    return {
      channel: '',
      IFRAME_DOMAIN: 'https://kartta.paikkatietoikkuna.fi',
      rpcEvents: [
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
      ]
    }
  },
  methods: {
    handleRpcEvents () {
      for (const event of this.rpcEvents) {
        if (event) {
          this.channel.handleEvent(event, (data) => {
            this.channel.log(event, data);
            if (eventHandlers[event]) {
              eventHandlers[event](this, data);
            }
          });
        }
      }
    },
    initConnection () {
      this.channel = OskariRPC.connect(
        this.$children[0].$refs.publishedMap,
        this.IFRAME_DOMAIN
      );
      window.channel = this.channel;
      this.$root.channel = this.channel;
      this.initLogging();
    },
    initLogging () {
      const me = this;
      this.$root.channel.log = (data, args) => {
        const now = new Date().toLocaleTimeString() + ': ';

        if (!args) {
          me.$store.state.channelLogs.unshift({ header: now + data });
          return;
        }
        if (args instanceof Array) {
          for (const arg of args) {
            if (typeof arg === 'function') {
              return;
            } else if (typeof args === 'object') {
              let json = JSON.stringify(args, null, '  ');
              json = json.replace(/\\"/g, '"');
              args = json;
            } else {
            }
          }
        }
        me.$store.state.channelLogs.unshift({ header: now + data, json: args });
      }
    },
    onReady () {
      this.$root.channel.enableDebug(true);
      this.$root.channel.onReady(() => {
        this.$root.channel.log('Map is now listening');

        const expectedOskariVersion = '1.55.2';
        this.$root.channel.isSupported(expectedOskariVersion, (blnSupported) => {
          if (blnSupported) {
            this.$root.channel.log('Client is supported and Oskari version is ' + expectedOskariVersion);
          } else {
            this.$root.channel.log('Oskari-instance is not the one we expect (' + expectedOskariVersion + ') or client not supported');
            // getInfo can be used to get the current Oskari version
            this.$root.channel.getInfo((oskariInfo) => {
              this.$root.channel.log('Current Oskari-instance reports version as: ', oskariInfo);
            });
          }
        });
        this.$root.channel.isSupported((blnSupported) => {
          if (!blnSupported) {
            this.$root.channel.log('Oskari reported client version is not supported: ' + OskariRPC.VERSION +
            '. The client might work, but some features are not backward compatible.');
          } else {
            this.$root.channel.log('Client is supported by Oskari.');
          }
        });
      });
    },
    initDocumentationPaths () {
      this.$root.documentPathRequest = '/api/requests#latest/';
      this.$root.documentPathEvent = '/api/events#latest/';
    }
  },
  mounted () {
    this.$root.logdiv = this.$children[1].$refs.debuglog;
    this.initConnection();
    this.initDocumentationPaths();
    this.onReady();
    this.handleRpcEvents();
  }
}
</script>
<style>
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
