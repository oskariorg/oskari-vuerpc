<template>
  <div>
    <h2>{{ title }}</h2>
    With these functions you are able to check supported events, functions and requests.
    <br /><br />
    <div>
      <h3>Supported events</h3>
      <p>
        With <InlineCode>getSupportedEvents</InlineCode> you get a list of events the map
        supports.<br />
        <CodeSnippet :runnable="true" buttonText="Get supported events">
channel.getSupportedEvents(function(data) {
  channel.log('GetSupportedEvents: ', data);
});
        </CodeSnippet>
      </p>
    </div>

    <div>
      <h3>Supported functions</h3>
      <p>
        With <InlineCode>getSupportedFunctions</InlineCode> you get a list of functions the map
        supports.<br />
        <CodeSnippet :runnable="true" buttonText="Get supported functions">
channel.getSupportedFunctions(function(data) {
  channel.log('GetSupportedFunctions: ', data);
});
        </CodeSnippet>
      </p>
    </div>

    <div>
      <h3>Supported requests</h3>
      <p>
        With <InlineCode>getSupportedRequests</InlineCode> you get a list of requests the map
        supports.<br />
        <CodeSnippet :runnable="true" buttonText="Get supported requests">
channel.getSupportedRequests(function(data) {
  channel.log('GetSupportedRequests: ', data);
});
        </CodeSnippet>
      </p>
    </div>

    <div>
      <h3>Get RPC client version</h3>
      <p>
        With <InlineCode>isSupported</InlineCode> you can check that the iframe gives us an expected
        version of Oskari RPC client.
        <CodeSnippet :runnable="true" buttonText="Check client version support">
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
      <CodeSnippet :runnable="true" buttonText="Check server support">
var oskariRPCVersion = '{{ OSKARI_RPC_VERSION }}';

channel.isSupported(function(blnSupported) {
  if (!blnSupported) {
    channel.log('Oskari reported client version (' + oskariRPCVersion + ') is not supported.' +
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
      OSKARI_RPC_VERSION: OskariRPC.VERSION,
      EXPECTED_OSKARI_VERSION
    };
  }
};
</script>
