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
      <CodeSnippet lang="xml">
        &lt;script src='https://oskari.org/js/rpc/rpc-client.min.js'&gt;&lt;/script&gt;
      </CodeSnippet>

      <h3>Embedding a published map on your page</h3>

      <CodeSnippet lang="xml">
&lt;iframe id='publishedMap'
        src='http://www.mydomain.com/idofpublishedmap'
        style='border: none; width: 100%; height: 100%;'&gt;
&lt;/iframe&gt;
      </CodeSnippet>

      <h3>Initialising connection</h3>
      <InlineCode>IFRAME_DOMAIN</InlineCode> must match to the source domain in the iframe.

      <CodeSnippet>
// init connection
var IFRAME_DOMAIN = 'http://www.mydomain.com';
var iFrame = document.getElementById('publishedMap');
var channel = OskariRPC.connect(
    iFrame,
    IFRAME_DOMAIN
);
      </CodeSnippet>

      <h3>Wait channel to get ready</h3>
      Wait for the channel to get ready for use by using <InlineCode>onReady</InlineCode> function and callback.
      <CodeSnippet>
channel.onReady(function() {
    //channel is now ready and listening.
    channel.log('Map is now listening');
});
      </CodeSnippet>
      <h3>Do your stuff. Send requests, listen to events and call functions.</h3>
      <CodeSnippet>
//spinning action on the map
channel.postRequest('ShowProgressSpinnerRequest', [true]);
//listening to events and notifying user
channel.handleEvent('MapClickedEvent', function(data) {
  alert('Map clicked!');
});
//calling functions and doing things with the results
channel.getAllLayers(function (layers) {
  alert('Got ' + layers.length + ' layers!');
});
      </CodeSnippet>
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
