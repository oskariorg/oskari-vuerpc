<template>
  <div>
    <h3>Adding a layer to layer selector</h3>
    <p>
      When sending a <InlineCode>VectorLayerRequest</InlineCode>, setting the parameter
      <InlineCode>showLayer</InlineCode> and <InlineCode>layerName</InlineCode> makes the added
      layer visible and togglable in the layer selector of the map iframe. The layer selector is
      located in the top-right corner of the map iframe.
    </p>
    <CodeSnippet>
const layer = {{ layer }};

channel.postRequest('VectorLayerRequest', [layer]);
channel.log('VectorLayerRequest posted with data', [layer]);
    </CodeSnippet>
    <RunExampleButton @click="addListedLayer(layer)"> Add listed layer </RunExampleButton>
    Then add a polygon to the map:
    <RunExampleButton @click="addFeaturesToMapRequest(rectangle, layer.layerId)">
      Add features to layer
    </RunExampleButton>
    <h3>Reordering layers</h3>
    <p>
      Setting <InlineCode>showLayer</InlineCode> to <InlineCode>true</InlineCode> also allows the
      layer to be reordered with <InlineCode>{{ requestName }}</InlineCode> just like other map
      layers. For this example, add another layer and polygon to the map with this button:
      <RunExampleButton
        @click="
          () => {
            addListedLayer(layer2);
            addFeaturesToMapRequest(rectangle2, layer2.layerId);
          }
        "
        >Add another layer!</RunExampleButton
      >. Then you can try out reordering the layers with the buttons below and see how the layers
      act on the map. You can also toggle the other map layers visible in the map iframe and reorder
      them.
    </p>
    <CodeSnippet>
const layerId = 'MY_VECTOR_LAYER';
const newPos = 0; // set layer to bottom
channel.postRequest('{{ requestName }}', [layerId, newPos]);
    </CodeSnippet>
    <b-button-group>
      <b-dd :text="layers[selectedLayerId]" variant="outline-success" style="width: 250px">
        <b-dd-item-button
          v-for="[id, name] in Object.entries(layers)"
          :key="id"
          @click="setSelectedLayerId(id)"
        >
          {{ name }}
        </b-dd-item-button>
      </b-dd>
      <b-dd :text="selectedPosition.toString()" variant="outline-success">
        <b-dd-item-button
          v-for="n in Object.keys(layers).length"
          :key="n"
          @click="setSelectedPosition(n - 1)"
        >
          {{ n - 1 }}
        </b-dd-item-button>
      </b-dd>
      <b-button @click="reorderLayer" variant="success">Change ordering</b-button>
    </b-button-group>
  </div>
</template>
<script>
import { generator } from './vectorlayer_helpers';
import EVENTBUS from '../../util/eventbus';

const title = 'Reorder vector feature layers';
const requestName = 'RearrangeSelectedMapLayerRequest';

const x = 488704;
const y = 6939136;
const rectangle = generator.getCollectionOf([
  generator.getRectangle(x - 300000, y, { name: `I'm a rectangle` }, 500000, 200000)
]);
const rectangle2 = generator.getCollectionOf([
  generator.getRectangle(x - 100000, y - 200000, { name: `I'm also a rectangle` }, 200000, 500000)
]);

const listeners = [];

export default {
  name: 'layerReorder',
  label: title,
  data() {
    return {
      requestName,
      layer,
      layer2,
      rectangle,
      rectangle2,
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
    this.$root.channel.postRequest('VectorLayerRequest', [
      {
        layerId: this.layer.layerId,
        remove: true
      }
    ]);
    this.$root.channel.postRequest('VectorLayerRequest', [
      {
        layerId: this.layer2.layerId,
        remove: true
      }
    ]);
    while (listeners.length) {
      EVENTBUS.off('channel.available', listeners.pop());
    }
  },
  methods: {
    addListedLayer(layer) {
      this.layers[layer.layerId] = layer.layerName;
      this.$root.channel.postRequest('VectorLayerRequest', [layer]);
      this.$root.channel.log('VectorLayerRequest posted with data', [layer]);
    },
    addFeaturesToMapRequest(geojson, layerId) {
      const params = [geojson, { layerId: layerId, clearPrevious: true }];
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
  layerName: 'My listed vector layer',
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

const layer2 = {
  layerId: 'ANOTHER_LISTED_VECTOR_LAYER',
  opacity: 100,
  showLayer: true,
  layerName: 'Another listed vector layer',
  hover: {
    featureStyle: {
      fill: {
        color: '#ff0000'
      },
      stroke: {
        color: '#000000'
      }
    },
    content: [{ key: 'Layer: ANOTHER_LISTED_VECTOR_LAYER' }, { key: 'Name', valueProperty: 'name' }]
  }
};
</script>
