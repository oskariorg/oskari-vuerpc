<template>
  <div>
    <Documentation-site-top-bar />
    <div class="wrapper">
      <div class="row">
        <EmbeddedMap ref="mapElement" :domain="oskariDomain" :uuid="embeddedMapUUID" />
        <ActionPanel :currentPage="currentPage" />
        <LogPanel :logEvents="logEventsStore" v-on:clear="clearLog" />
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
import EVENTBUS from './util/eventbus.js';
import { EXPECTED_OSKARI_VERSION, OSKARI_DOMAIN, OSKARI_EMBEDDED_MAP_UUID } from './constants';

const listeners = [];

export default {
  components: {
    'Documentation-site-top-bar': Header,
    EmbeddedMap: EmbeddedMap,
    ActionPanel: ActionPanel,
    LogPanel: LogPanel
  },
  data() {
    return {
      oskariDomain: OSKARI_DOMAIN,
      embeddedMapUUID: OSKARI_EMBEDDED_MAP_UUID,
      expectedOskariVersion: EXPECTED_OSKARI_VERSION,
      currentPage: this.$route,
      logEventsStore: []
    };
  },
  watch: {
    $route(to, from) {
      // required: listen to route change so we can update current page -> update navigation outside <router-view />
      from;
      this.currentPage = to;
    }
  },
  created() {
    // Set these up when created so they are available for
    // components when accessed through non-root router path
    this.$root.documentPathRequest =
      'https://oskari.org/documentation/api/requests/latest/';
    this.$root.documentPathEvent =
      'https://oskari.org/documentation/api/events/latest/';
    this.$root.documentationLinks = {
      base: 'https://oskari.org/documentation/api',
      event: '/events/latest/',
      request: '/requests/latest/',
      bundle: '/bundles/latest/'
    };
  },
  methods: {
    rpcAppShowMessage(message, secondsToShow = 5) {
      const messageBoxEl = this.$refs.messageBox;
      messageBoxEl.innerText = message;
      // replace linebreaks
      messageBoxEl.innerHtml = messageBoxEl.innerText.replace(/\n/g, '<br />');
      messageBoxEl.style = 'display: block';

      setTimeout(() => {
        messageBoxEl.style = 'display: none';
      }, secondsToShow * 1000);
    },
    clearLog() {
      // If we re-assign the variable the log will stop working as
      //  the original reference was passed to createLogger()
      // We need to keep the same variable and only empty it for the log
      //  to work properly AFTER the clear
      while (this.logEventsStore.length) {
        this.logEventsStore.pop();
      }
    }
  },
  mounted() {
    const channel = OskariRPC.connect(this.$refs.mapElement.getIframeElement(), this.oskariDomain);
    channel.log = createLogger(this.logEventsStore);
    createOnReady(channel, this.expectedOskariVersion);
    // Note: this != this.$root
    this.$root.channel = channel;
    // expose channel as global variable so it can be accessed from dev-console
    window.channel = channel;
    EVENTBUS.initChannelListeners(channel);
    // notify examples that channel is usable (required when referencing channel on mounted())
    channel.onReady(() => EVENTBUS.notify('channel.available'));

    listeners.push(
      EVENTBUS.on('rpcAppDisplayMessage', (event) => {
        this.rpcAppShowMessage(event.msg, event.seconds);
      })
    );
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    while (listeners.length) {
      EVENTBUS.off('rpcAppDisplayMessage', listeners.pop());
    }
  }
};
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
  position: absolute;
  width: 100%;
  height: 90%;
  margin-left: 0;
  margin-right: 0;
  min-height: 750px;
  padding: 0 1em;
}
.full-height-panel {
  height: 98% !important;
}
.panel {
  height: 100%;

  @media screen and (max-height: 899px) {
    height: 750px;
  }
  @media screen and (max-height: 850px) {
    height: 700px;
  }
  @media screen and (max-height: 700px) {
    height: 600px;
  }
}
.panel-body {
  padding: 1em !important;
}
</style>
