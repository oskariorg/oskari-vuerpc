<template>
  <div>
    <h2>{{ title }}</h2>
    
    <p>There are a few functions on the RPC API client that can be
       used to control and determine bounds for the zoom levels programmatically.
       See examples below.
    </p>
    <DocumentationLink type="bundle" :apiDoc="apiDocPage">Documentation for RPC functions</DocumentationLink>
    <p>
      <br/>
      Note that after zooming you will also get an AfterMapMoveEvent since zoom level is part of the "map move info".
    </p>

    <h3>getZoomRange()</h3>
    <CodeSnippet>
channel.getZoomRange(function (data) {
  channel.log('GetZoomRange:', data);
});
    </CodeSnippet>
    <p>
      getZoomRange() can be used to get the map's zoom range (min, max, current).
      Click the button to get the result shown on the log:
      <RunExampleButton @click="getZoomRange">Get zoom range</RunExampleButton>
    </p>

    <h3>zoomIn()</h3>
    <CodeSnippet>
channel.zoomIn(function (data) {
  channel.log('Zoom level after:', data);
});
    </CodeSnippet>
    <p>
      zoomIn() can be used to zoom the map one level closer and it returns the current zoom level afterwards.
      Note if the map cannot be zoomed any closer the zoom level won't change and you can catch that
       by comparing the parameter in the callback function.
      Click the button to get the result shown on the log:
      <RunExampleButton @click="zoomIn">Zoom in</RunExampleButton>
    </p>

    
    <h3>zoomOut()</h3>
    <CodeSnippet>
channel.zoomOut(function (data) {
  channel.log('Zoom level after:', data);
});
    </CodeSnippet>
    <p>
      zoomOut() can be used to zoom the map one level out and it returns the current zoom level afterwards.
      Note if the map cannot be zoomed any further the zoom level won't change and you can catch that
       by comparing the parameter in the callback function.
      Click the button to get the result shown on the log:
      <RunExampleButton @click="zoomOut">Zoom out</RunExampleButton>
    </p>
    
    <h3>zoomTo(level)</h3>
    <CodeSnippet>
channel.zoomTo([{{ zoomLevel }}], function (data) {
  channel.log('Zoom level after:', data);
});
    </CodeSnippet>
    <p>
      zoomTo() can be used to zoom a specific zoom level and it returns the current zoom level as the callback parameter.
      Note if the map cannot be zoomed any further the zoom level won't change and you can catch that
       by comparing the parameter in the callback function.
      Click the button to get the result shown on the log:
      <RunExampleButton @click="zoomTo">Zoom to level {{ zoomLevel }}</RunExampleButton>
    </p>
  </div>
</template>

<script>
const apiDocPage = 'framework/rpc';
const title = 'Zoom functions';

export default {
  name: 'MapZoomFunctions',
  label: title,
  data () {
    return {
      title,
      apiDocPage,
      zoomLevel: 5
    }
  },
  methods: {
    getZoomRange () {
      this.$root.channel.getZoomRange((data) => {
        this.$root.channel.log('GetZoomRange: ', data);
      });
    },
    zoomIn () {
      this.$root.channel.zoomIn((data) => {
        this.$root.channel.log('Zoom level after:', data);
      });
    },
    zoomOut () {
      this.$root.channel.zoomOut((data) => {
        this.$root.channel.log('Zoom level after:', data);
      });
    },
    zoomTo () {
      this.$root.channel.zoomTo([this.zoomLevel], (data) => {
        this.$root.channel.log('Zoom level after:', data);
      });
    }
  }
}
</script>
