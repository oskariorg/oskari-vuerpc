<template>
  <div>
    <h2>{{ title }}</h2>
    With these functions you are able to check supported events, functions and requests.
    <br /><br />
    <div>
      <h3>Supported events</h3>
      <p>
        With <InlineCode>getSupportedEvents</InlineCode> you get a list of events the map
        supports<br />
        <RunExampleButton @click="getSupportedEvents">Get supported events</RunExampleButton>
        <br /><br />
        <CodeSnippet>
channel.getSupportedEvents(function(data) {
  channel.log('GetSupportedEvents: ', data);
});
        </CodeSnippet>
      </p>
    </div>
    <br />

    <div>
      <h3>Supported functions</h3>
      <p>
        With <InlineCode>getSupportedFunctions</InlineCode> you get a list of functions the map
        supports.<br />
        <RunExampleButton @click="getSupportedFunctions">Get supported functions</RunExampleButton>
        <br /><br />
        <CodeSnippet>
channel.getSupportedFunctions(function(data) {
  channel.log('GetSupportedFunctions: ', data);
});
        </CodeSnippet>
      </p>
    </div>
    <br />

    <div>
      <h3>Supported requests</h3>
      <p>
        With <InlineCode>getSupportedRequests</InlineCode> you get a list of requests the map
        supports.<br />
        <RunExampleButton @click="getSupportedRequests">Get supported requests</RunExampleButton>
        <br /><br />
        <CodeSnippet>
channel.getSupportedRequests(function(data) {
  channel.log('GetSupportedRequests: ', data);
});
        </CodeSnippet>
      </p>
    </div>
    <br />

    <div>
      <h3>Get RPC client version</h3>
      <p>
        With <InlineCode>isSupported</InlineCode> you can check that the iframe gives us an expected
        version of Oskari RPC client.
        <br />
        <RunExampleButton @click="checkClientSupport">
          Check client version support
        </RunExampleButton>

        <br />
        <br />
        <CodeSnippet>
channel.log('Map is now listening'); //channel is now ready and listening. 
var expectedOskariVersion = '{{ EXPECTED_OSKARI_VERSION }}';

channel.isSupported(expectedOskariVersion, function(blnSupported) {
  if (blnSupported) {
    channel.log('Client is supported and Oskari version is ' + expectedOskariVersion);
  } else {
    channel.log('Oskari-instance is not the one we expect (' + expectedOskariVersion + ') or client not supported');
    // getInfo can be used to get the current Oskari version
    channel.getInfo(function(oskariInfo) {
      channel.log('Current Oskari-instance reports version as: ', oskariInfo);
    });
  }
});
        </CodeSnippet>
      </p>
    </div>
    <br />
    <div>
      <h3>Get server support for RPC client</h3>
      <p>
        You can also check that server side recognizes client version by sending
        <InlineCode>isSupported</InlineCode> request without first parameter.
        <br />
        <RunExampleButton @click="checkServerSupport">Check server support</RunExampleButton>

      <br />
      <br />
      <CodeSnippet>
channel.isSupported(function(blnSupported) {
  if (!blnSupported) {
    channel.log('Oskari reported client version (' + OskariRPC.VERSION + ') is not supported.' +
    'The client might work, but some features are not compatible.');
  } else {
    channel.log('Client is supported by Oskari.');
  }
});
      </CodeSnippet>
      </p>
    </div>
  </div>
</template>
<script>
import OskariRPC from 'oskari-rpc';
import { EXPECTED_OSKARI_VERSION } from '../../constants';

const title = 'Supported functionality';

export default {
  name: 'GetClientMetadata',
  label: title,
  data() {
    return {
      title,
      EXPECTED_OSKARI_VERSION
    };
  },
  methods: {
    getSupportedRequests() {
      this.$root.channel.getSupportedRequests((data) => {
        this.$root.channel.log('GetSupportedRequests: ', data);
      });
    },
    getSupportedFunctions() {
      this.$root.channel.getSupportedFunctions((data) => {
        this.$root.channel.log('GetSupportedFunctions: ', data);
      });
    },
    getSupportedEvents() {
      this.$root.channel.getSupportedEvents((data) => {
        this.$root.channel.log('GetSupportedEvents: ', data);
      });
    },
    checkClientSupport() {
      channel.log('Map is now listening'); //channel is now ready and listening.
      const expectedOskariVersion = EXPECTED_OSKARI_VERSION;
      channel.isSupported(expectedOskariVersion, function (blnSupported) {
        if (blnSupported) {
          channel.log('Client is supported and Oskari version is ' + expectedOskariVersion);
        } else {
          channel.log(
            'Oskari-instance is not the one we expect (' +
              expectedOskariVersion +
              ') or client not supported'
          );
          // getInfo can be used to get the current Oskari version
          channel.getInfo(function (oskariInfo) {
            channel.log('Current Oskari-instance reports version as: ', oskariInfo);
          });
        }
      });
      channel.isSupported(function (blnSupported) {
        if (!blnSupported) {
          channel.log(
            'Oskari reported client version (' +
              OskariRPC.VERSION +
              ') is not supported.' +
              'The client might work, but some features are not compatible.'
          );
        } else {
          channel.log('Client is supported by Oskari.');
        }
      });
    },
    checkServerSupport() {
      const me = this;
      this.$root.channel.isSupported(function (blnSupported) {
        if (!blnSupported) {
          me.$root.channel.log(
            'Oskari reported client version (' +
              OskariRPC.VERSION +
              ') is not supported.' +
              'The client might work, but some features are not compatible.'
          );
        } else {
          me.$root.channel.log('Client is supported by Oskari.');
        }
      });
    }
  }
};
</script>
