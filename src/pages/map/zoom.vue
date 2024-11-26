<template>
  <div>
    <h2>{{ title }}</h2>

    <p>
      There are a few functions on the RPC API client that can be used to control and determine
      bounds for the zoom levels programmatically. See examples below.
    </p>
    <DocumentationLink type="bundle" :apiDoc="apiDocPage"
      >Documentation for RPC functions</DocumentationLink
    >
    <p>
      Note that after zooming you will also get an <InlineCode>AfterMapMoveEvent</InlineCode> since
      zoom level is part of the "map move info".
    </p>

    <h3>getZoomRange()</h3>
    <CodeSnippet :runnable="true" buttonText="Get zoom range">
channel.getZoomRange(function (data) {
  channel.log('GetZoomRange:', data);
});
    </CodeSnippet>
    <p>
      <InlineCode>getZoomRange()</InlineCode> can be used to get the map's zoom range (min, max,
      current). Click the button to get the result shown on the log.
    </p>

    <h3>zoomIn()</h3>
    <CodeSnippet :runnable="true" buttonText="Zoom in">
channel.zoomIn(function (data) {
  channel.log('Zoom level after:', data);
});
    </CodeSnippet>
    <p>
      <InlineCode>zoomIn()</InlineCode> can be used to zoom the map one level closer and it returns
      the current zoom level afterwards. Note if the map cannot be zoomed any closer the zoom level
      won't change and you can catch that by comparing the parameter in the callback function. Click
      the button to get the result shown on the log.
    </p>

    <h3>zoomOut()</h3>
    <CodeSnippet :runnable="true" buttonText="Zoom out">
channel.zoomOut(function (data) {
  channel.log('Zoom level after:', data);
});
    </CodeSnippet>
    <p>
      <InlineCode>zoomOut()</InlineCode> can be used to zoom the map one level out and it returns
      the current zoom level afterwards. Note if the map cannot be zoomed any further the zoom level
      won't change and you can catch that by comparing the parameter in the callback function. Click
      the button to get the result shown on the log.
    </p>

    <h3>zoomTo(level)</h3>
    <CodeSnippet :runnable="true" :buttonText="`Zoom to level ${zoomLevel}`">
channel.zoomTo([{{ zoomLevel }}], function (data) {
  channel.log('Zoom level after:', data);
});
    </CodeSnippet>
    <p>
      <InlineCode>zoomTo()</InlineCode> can be used to zoom a specific zoom level and it returns the
      current zoom level as the callback parameter. Note if the map cannot be zoomed any further the
      zoom level won't change and you can catch that by comparing the parameter in the callback
      function. Click the button to get the result shown on the log.
    </p>
  </div>
</template>

<script>
const apiDocPage = 'framework/RPC';
const title = 'Zoom functions';

export default {
  name: 'MapZoomFunctions',
  label: title,
  data() {
    return {
      title,
      apiDocPage,
      zoomLevel: 5
    };
  }
};
</script>
