<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      The <InlineCode>{{ requestName }}</InlineCode> allows more control for showing vector features
      on the map.
    </p>
    <p>
      You can initialize a layer with styles, scale limits and other toggles that are used for
      vector features on that layer. This simplifies adding features to that layer since you don't
      need to send those toggles (some you even can't) on each
      <InlineCode>AddFeaturesToMapRequest</InlineCode>. For very simple applications or examples it
      might be easier to use the <InlineCode>AddFeaturesToMap</InlineCode> since it can be used to
      initialize a simple layer as well.
    </p>
    <p>
      Initializing a layer can be done by sending the
      <InlineCode>{{ requestName }}</InlineCode> request:
      <CodeSnippet>
        channel.postRequest('{{ requestName }}', [{{ JSON.stringify(layer, null, 2) }}]);
      </CodeSnippet>

      After sending it you can add features to it by referencing the layer by
      <InlineCode>layerId</InlineCode> in the <InlineCode>AddFeaturesToMapRequest</InlineCode>.
    </p>

    <p>You can try different combinations below:</p>
    <ol>
      <li>
        Click the <InlineCode>Add feature</InlineCode> button to add a feature to the map.
        <CodeSnippet :runnable="true" buttonText="Add feature">
const params = [
{{ JSON.stringify(geojsonObject, null, 2) }},
{
  layerId: '{{ layer.layerId }}',
  clearPrevious: true, centerTo: true, cursor: 'zoom-in'
}];
channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
        </CodeSnippet>
        However if you hover the feature on the map with mouse nothing happens (the cursor changes
        based on the request parameter "cursor" with value supported in CSS).
      </li>
      <li>
        Click <InlineCode>Remove features</InlineCode> to clean up the map for testing
        <InlineCode>VectorLayerRequest</InlineCode>.
        <CodeSnippet :runnable="true" buttonText="Remove features">
          channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
        </CodeSnippet>
      </li>
      <li>
        Click <InlineCode>Add layer</InlineCode> to initialize a layer for vector features with
        hover styling.
        <CodeSnippet :runnable="true" buttonText="Add layer">
channel.postRequest('{{ requestName }}', [{{
  JSON.stringify(layer, null, 2)
}}]);
        </CodeSnippet>
        <b>Note!</b> You won't see anything happen on the map when you do this. Now click the
        <InlineCode>Add feature</InlineCode> button on the first step to add a feature to the layer.
        The important part is that the <InlineCode>layerId</InlineCode> on both requests match.
      </li>
      <li>
        This time the feature has a nice highlighting style when you move the mouse cursor on top of
        it on the map. The hover style was defined in the
        <InlineCode>VectorLayerRequest</InlineCode> so you don't need to worry about it when pushing
        more features on the map.
      </li>
      <li>
        You can use <InlineCode>VectorLayerRequest</InlineCode> to remove the layer (also removes
        features on the layer). After this if you click the "Add features" button the features have
        lost the hover highlighting and you need to initialize the layer again to get it back.<br />
        <CodeSnippet :runnable="true" buttonText="Remove layer">
channel.postRequest('VectorLayerRequest', [{
  layerId: '{{ layer.layerId }}',
  remove: true
}]);
        </CodeSnippet>
      </li>
      <li>
        To keep the initialized layer but remove any features on it you can use the "Remove feature"
        from the second step.
      </li>
    </ol>
    <h3>Styling</h3>
    <p>
      You can define more than just the hover styles with the
      <InlineCode>VectorLayerRequest</InlineCode>. See the documentation page 'Styling' for more
      information about customizing the visuals of a layer. Documentation links:
    </p>
    <ul>
      <li>
        <DocumentationLink type="request" :apiDoc="apiDocPageRequest">
          Documentation for {{ requestName }}
        </DocumentationLink>
      </li>
      <li><DocumentationLink :href="styleDocLink">Styling</DocumentationLink></li>
    </ul>
  </div>
</template>
<script>
import { generator } from './vectorlayer_helpers';

const title = 'Configure layer for vector features';
const requestName = 'VectorLayerRequest';

const x = 488704;
const y = 6939136;
const geojsonObject = generator.getCollectionOf([
  generator.getPolygon(x, y, { name: `I'm a polygon` }) /*,
    generator.getPoint(x + 40000, y + 30000, { 'name': `I'm a point` }) */
]);

export default {
  name: 'FeatureLayer',
  label: title,
  data() {
    return {
      title,
      requestName,
      apiDocPageRequest: 'mapping/mapmodule/request/vectorlayerrequest.md',
      styleDocLink: 'https://oskari.org/documentation/examples/oskari-style',
      layer,
      geojsonObject
    };
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    this.$root.channel.postRequest('VectorLayerRequest', [
      {
        layerId: layer.layerId,
        remove: true
      }
    ]);
    this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
  }
};

const layer = {
  layerId: 'MY_VECTOR_LAYER',
  opacity: 75,
  hover: {
    featureStyle: {
      fill: {
        color: '#ff00ff'
      },
      stroke: {
        color: '#000000'
      }
    },
    content: [{ key: 'Layer: MY_VECTOR_LAYER' }, { key: 'Name', valueProperty: 'name' }]
  }
};
</script>
<style scoped>
/* Need to overwrite styles that are not defined specific enough........ */
ol li {
  display: list-item;
  list-style-type: decimal;
}
</style>
