<template>
  <div>
    <h2>{{ title }}</h2>
    <h3>Including the necessary stuff to get RPC up and running</h3>
    <div>Including RPC javascript in html available from:<br />
      <a href="https://github.com/oskariorg/rpc-client/tree/master/dist" target="_blank">https://github.com/oskariorg/rpc-client/tree/master/dist</a></div>
      <!--
        Note!!

        Script tag needs to be escaped manually but the iframe below works
        ok without escaping. Might change if we ever update Vue version...
       -->
      <code-component lang="xml">
        &lt;script src='https://oskari.org/js/rpc/rpc-client.min.js'&gt;&lt;/script&gt;
      </code-component>

      <h3>Embedding a published map on your page</h3>

      <code-component lang="xml">
        <iframe id='publishedMap' src='http://www.mydomain.com/idofpublishedmap'
        style='border: none; width: 100%; height: 100%;'></iframe>
      </code-component>

      <h3>Initialising connection</h3>
      <InlineCode>IFRAME_DOMAIN</InlineCode> must match to the source domain in the iframe.

      <code-component>
// init connection
var IFRAME_DOMAIN = 'http://www.mydomain.com';
var iFrame = document.getElementById('publishedMap');
var channel = OskariRPC.connect(
    iFrame,
    IFRAME_DOMAIN
);
      </code-component>

      <h3>Wait for the channel to get ready for use</h3>
      Also checking that the iframe gives us an expected version of Oskari
      and/or that the Oskari version recognizes our client version.
      <code-component>
channel.onReady(function() {
    //channel is now ready and listening.
    channel.log('Map is now listening');
});
      </code-component>
      <h3>Do your stuff. Send requests, listen to events and call functions.</h3>
      <code-component>
//spinning action on the map
channel.postRequest('ShowProgressSpinnerRequest',[true]);
//listening to events and notifying user
channel.handleEvent('MapClickedEvent', function(data) {
  alert('Map clicked!');
});
//calling functions and doing things with the results
channel.getAllLayers(function (layers) {
  alert('Got '+layers.length+' layers!');
});
      </code-component>
    </div>

</template>
<script>
const title = 'Getting started';
export default {
  name: 'GettingStarted',
  label: title,
  data () {
    return {
      title
    }
  }
}
</script>
