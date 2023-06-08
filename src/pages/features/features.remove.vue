<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Removing features is done with the
      <InlineCode>MapModulePlugin.RemoveFeaturesFromMapRequest</InlineCode>. Send the request
      without parameters to clear all vector features across all existing layers.
    </p>
    <RunExampleButton @click="clearFeatures()">Clear all vector features</RunExampleButton>
    <CodeSnippet>
      channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
    </CodeSnippet>
    <RunExampleButton @click="addFeaturesToMap">Add features back to map</RunExampleButton>
    <p>
      In this example, the vector features have been added to two layers. Hover over the features on
      the map to see which layer they belong to.
      <InlineCode>MapModulePlugin.RemoveFeaturesFromMapRequest</InlineCode> has the functionality to
      remove features only from specific layers.
    </p>
    <RunExampleButton @click="clearFeatures(null, null, (layerId = 'layer1'))"
      >Clear layer 1</RunExampleButton
    >
  </div>
</template>

<script>
import { generator } from './vectorlayer_helpers';

const title = 'Remove features';

export default {
  name: 'RemoveFeatures',
  label: title,
  data() {
    return {
      title,
      polygon,
      rectangle,
      layer1,
      layer2,
      style
    };
  },
  methods: {
    addFeaturesToMap() {
      this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
        this.polygon,
        { layerId: this.layer1.layerId }
      ]);
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
        this.rectangle,
        { layerId: this.layer2.layerId }
      ]);
    },
    clearFeatures(key = null, value = null, layerId = null) {
      this.$root.channel.log(layerId);
      this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', [
        key,
        value,
        layerId
      ]);
    },
    getAllFeatures(bool = false) {
      this.$root.channel.getFeatures([bool], (data) => {
        this.$root.channel.log('GetFeatures:', data);
      });
    }
  },
  mounted() {
    this.$root.channel.postRequest('VectorLayerRequest', [this.layer1]);
    this.$root.channel.postRequest('VectorLayerRequest', [this.layer2]);
    this.addFeaturesToMap();
  },
  beforeUnmount() {
    this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
  }
};

const style = {
  fill: {
    color: '#ffffff',
    area: {
      pattern: -1
    }
  }
};

const layer1 = {
  layerId: 'layer1',
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
    content: [
      {
        key: "I'm in layer1!"
      },
      {
        key: 'Name',
        valueProperty: 'name'
      }
    ]
  }
};

const layer2 = {
  layerId: 'layer2',
  opacity: 75,
  hover: {
    featureStyle: {
      fill: {
        color: '#ff0000'
      },
      stroke: {
        color: '#0000ff'
      }
    },
    content: [
      {
        key: "I'm in layer2!"
      },
      {
        key: 'Name',
        valueProperty: 'name'
      }
    ]
  }
};

const x = 488704;
const y = 6939136;

const polygon = generator.getCollectionOf([generator.getPolygon(x, y, { name: `I'm a polygon` })]);
const rectangle = generator.getCollectionOf([
  generator.getRectangle(x - 100000, y + 250000, { id: '1', name: `I'm a rectangle` }, 80000, 65000)
]);
</script>
