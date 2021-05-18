<template>
  <div id = "GetClientMetadata">
    <h3>Get RPC client metadata</h3>
    With <InlineCode>isSupported</InlineCode> you can check that the iframe gives us an expected version of Oskari RPC client.
    <br>
    <button id="btnGetSupportedEvents" class="btn btn-primary" @click="checkClientSupport">Check client version support</button>
    <br>
    <br>
    <code-component>
channel.onReady(function() {
  channel.log('Map is now listening'); //channel is now ready and listening. 
  var expectedOskariVersion = '1.43.0';

  channel.isSupported(expectedOskariVersion, function(blnSupported) {
    if(blnSupported) {
      channel.log('Client is supported and Oskari version is ' + expectedOskariVersion);
    } else {
      channel.log('Oskari-instance is not the one we expect (' + expectedOskariVersion + ') or client not supported');
      // getInfo can be used to get the current Oskari version
      channel.getInfo(function(oskariInfo) {
        channel.log('Current Oskari-instance reports version as: ', oskariInfo);
      });
    }
  });
});
    </code-component>
<br>
      <h3>Get RPC client metadata</h3>
    You can also check that server side recognizes client version by sending <InlineCode>isSupported</InlineCode> request without first parameter.
    <br>
    <button id="btnGetSupportedEvents" class="btn btn-primary" @click="checkClientSupport">Check server support</button>
    <br>
    <br>
    <code-component>
channel.onReady(function() {
  channel.isSupported(function(blnSupported) {
    if(!blnSupported) {
      channel.log('Oskari reported client version (' + OskariRPC.VERSION + ') is not supported.' +
      'The client might work, but some features are not compatible.');
    } else {
      channel.log('Client is supported by Oskari.');
    }
  });
});
    </code-component>
  </div>
</template>
<script>
export default {
  name: 'GetClientMetadata',
  label: 'Get RPC Client Metadata',
  data () {
    return {
      desc: 'Get RPC client metadata'
    }
  },
  methods: {
    checkClientSupport () {
      this.$root.channel.onReady(function() {
          channel.log('Map is now listening'); //channel is now ready and listening. 
          var expectedOskariVersion = '1.43.0';
          channel.isSupported(expectedOskariVersion, function(blnSupported) {
          if(blnSupported) {
              channel.log('Client is supported and Oskari version is ' + expectedOskariVersion);
          } else {
              channel.log('Oskari-instance is not the one we expect (' + expectedOskariVersion + ') or client not supported');
              // getInfo can be used to get the current Oskari version
              channel.getInfo(function(oskariInfo) {
              channel.log('Current Oskari-instance reports version as: ', oskariInfo);
              });
          }
          });
          channel.isSupported(function(blnSupported) {
          if(!blnSupported) {
              channel.log('Oskari reported client version (' + OskariRPC.VERSION + ') is not supported.' +
              'The client might work, but some features are not compatible.');
          } else {
              channel.log('Client is supported by Oskari.');
          }
          });
      });
    },
    checkServerSupport () {
      this.$root.channel.onReady(function() {
          channel.isSupported(function(blnSupported) {
          if(!blnSupported) {
              channel.log('Oskari reported client version (' + OskariRPC.VERSION + ') is not supported.' +
              'The client might work, but some features are not compatible.');
          } else {
              channel.log('Client is supported by Oskari.');
          }
          });
      });
    },
  }
}
</script>
