<template>
  <div>
    <h3>Adding a layer to layer selector</h3>
    <p>
      When sending a <InlineCode>{{ requestName }}</InlineCode
      >, setting the parameter <InlineCode>showLayer</InlineCode> and
      <InlineCode>layerName</InlineCode> makes the added layer visible and togglable in the layer
      selector of the map iframe. The layer selector is located in the top-right corner of the map
      iframe.
    </p>
    <CodeSnippet>
const layer = {
  layerId: 'MY_LISTED_VECTOR_LAYER',
  opacity: 75,
  showLayer: true,
  layerName: 'My layer',
  hover: {
    featureStyle: {
      fill: {
        color: '#ff00ff'
      },
      stroke: {
        color: '#000000'
      }
    },
    content: [{ key: 'Layer: MY_LISTED_VECTOR_LAYER' }, { key: 'Name', valueProperty: 'name' }]
  }
};

channel.postRequest('VectorLayerRequest', [layer]);
channel.log('VectorLayerRequest posted with data', [layer]);
    </CodeSnippet>
    <RunExampleButton @click="addListedLayer"> Add listed layer </RunExampleButton>
    Then add a polygon to the map:
    <RunExampleButton @click="addFeaturesToMapRequest"> Add features to layer </RunExampleButton>
    <h3>Reordering layers</h3>
    <p>
      Setting <InlineCode>showLayer</InlineCode> to <InlineCode>true</InlineCode>
      also allows the layer to be reordered just like other map layers.
      <b>TODO:</b> finish text and investigate VectorLayerRequest when removing a layer!
    </p>
    <CodeSnippet>
const layerId = 'MY_VECTOR_LAYER';
const newPos = 0; // set layer to bottom
channel.postRequest('RearrangeSelectedMapLayerRequest', [layerId, newPos]);
    </CodeSnippet>
  </div>
</template>
<script>
import { generator } from './vectorlayer_helpers';

const title = 'Reorder vector feature layers';
const requestName = 'VectorLayerRequest';

const x = 488704;
const y = 6939136;
const geojsonObject = generator.getCollectionOf([
  generator.getPolygon(x, y, { name: `I'm a polygon` })
]);

export default {
  name: 'layerReorder',
  label: title,
  data() {
    return {
      requestName,
      layer
    };
  },
  methods: {
    addListedLayer() {
      this.$root.channel.postRequest('VectorLayerRequest', [this.layer]);
      this.$root.channel.log('VectorLayerRequest posted with data', [this.layer]);
    },
    addFeaturesToMapRequest() {
      const params = [geojsonObject, { layerId: this.layer.layerId, clearPrevious: true }];
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);
    }
  }
};

const layer = {
  layerId: 'MY_LISTED_VECTOR_LAYER',
  opacity: 75,
  showLayer: true,
  layerName: 'My vector layer',
  hover: {
    featureStyle: {
      fill: {
        color: '#ff00ff'
      },
      stroke: {
        color: '#000000'
      }
    },
    content: [{ key: 'Layer: MY_LISTED_VECTOR_LAYER' }, { key: 'Name', valueProperty: 'name' }]
  }
};
</script>
