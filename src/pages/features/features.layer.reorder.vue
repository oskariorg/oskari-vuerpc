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
const layer = {{ layer }}

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
    <b-dd :text="layers[selectedLayerId]" variant="outline-success" style="width: 250px">
      <b-dd-item-button
        v-for="[id, name] in Object.entries(layers)"
        :key="id"
        @click="setSelectedLayerId(id)"
      >
        {{ name }}
      </b-dd-item-button>
    </b-dd>
    <b-dd :text="selectedPosition.toString()" variant="outline-success" class="dd">
      <b-dd-item-button
        v-for="n in Object.keys(layers).length"
        :key="n"
        @click="setSelectedPosition(n - 1)"
      >
        {{ n - 1 }}
      </b-dd-item-button>
    </b-dd>
    <RunExampleButton @click="reorderLayer">Change ordering</RunExampleButton>
  </div>
</template>
<script>
import { generator } from './vectorlayer_helpers';
import EVENTBUS from '../../util/eventbus';

const title = 'Reorder vector feature layers';
const requestName = 'VectorLayerRequest';

const x = 488704;
const y = 6939136;
const geojsonObject = generator.getCollectionOf([
  generator.getPolygon(x, y, { name: `I'm a polygon` })
]);

const listeners = [];

export default {
  name: 'layerReorder',
  label: title,
  data() {
    return {
      requestName,
      layer,
      layers: {},
      selectedLayerId: 801, // default to background map
      selectedPosition: 0
    };
  },
  mounted() {
    if (this.$root.channel.isReady()) {
      this.initLayers();
    } else {
      listeners.push(
        EVENTBUS.on('channel.available', () => {
          this.initLayers();
        })
      );
    }
  },
  beforeUnmount() {
    while (listeners.length) {
      EVENTBUS.off('channel.available', listeners.pop());
    }
  },
  methods: {
    addListedLayer() {
      this.layers[this.layer.layerId] = this.layer.layerName;
      this.$root.channel.postRequest('VectorLayerRequest', [this.layer]);
      this.$root.channel.log('VectorLayerRequest posted with data', [this.layer]);
    },
    addFeaturesToMapRequest() {
      const params = [geojsonObject, { layerId: this.layer.layerId, clearPrevious: true }];
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);
    },
    initLayers() {
      this.$root.channel.getAllLayers((layers) => {
        layers.forEach((l) => {
          this.layers[l.id] = l.name;
        });
      });
    },
    reorderLayer() {
      this.$root.channel.postRequest('RearrangeSelectedMapLayerRequest', [
        this.selectedLayerId,
        this.selectedPosition
      ]);
    },
    setSelectedLayerId(id) {
      this.selectedLayerId = id;
    },
    setSelectedPosition(n) {
      this.selectedPosition = n;
    }
  }
};

const layer = {
  layerId: 'MY_LISTED_VECTOR_LAYER',
  opacity: 100,
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
