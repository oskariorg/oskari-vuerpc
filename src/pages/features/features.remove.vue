<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Removing features is done with the
      <InlineCode>{{ requestName }}</InlineCode
      >. Send the request without parameters to clear all vector features across all existing
      layers.
    </p>
    <RunExampleButton @click="clearFeatures()">Clear all vector features</RunExampleButton>
    <CodeSnippet> channel.postRequest('{{ requestName }}', []); </CodeSnippet>
    <p>
      You can also clear all features on the map while sending a
      <InlineCode>MapModulePlugin.AddFeaturesToMapRequest</InlineCode> by adding
      <InlineCode>clearPrevious: true</InlineCode> to the parameters to clear existing features from
      the map before adding new features.
    </p>
    <CodeSnippet>
      channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [geojson, { "clearPrevious":
      true }]);
    </CodeSnippet>
    <p>
      In this example, the vector features have been added to two layers. Hover over the features on
      the map to see which layer they belong to.
      <InlineCode>{{ requestName }}</InlineCode> has the functionality to remove features from a
      specific layer.
    </p>
    <RunExampleButton @click="addFeaturesToMap">Add features back to map</RunExampleButton>
    <RunExampleButton @click="clearFeatures(null, null, layer1.layerId)">
      Clear layer 1
    </RunExampleButton>
    <RunExampleButton @click="clearFeatures(null, null, layer2.layerId)">
      Clear layer 2
    </RunExampleButton>
    <CodeSnippet> channel.postRequest('{{ requestName }}', [null, null, layerId]); </CodeSnippet>
    <p>
      Features can also be removed by specifying the layer and a
      <InlineCode>key: value</InlineCode> pair. The <InlineCode>key: value</InlineCode> pair has to
      be inside the <InlineCode>properties</InlineCode> object of the feature. Multiple features who
      are on the same layer and share a common <InlineCode>key: value</InlineCode> pair within the
      <InlineCode>properties</InlineCode> object can be removed with a single request.
    </p>
    <RunExampleButton @click="clearFeatures('shape', 'point', layer1.layerId)">
      Remove points
    </RunExampleButton>
    <CodeSnippet>
      channel.postRequest({{ requestName }}, ['shape', 'point', layerId]);
    </CodeSnippet>
    <p>
      A feature's <InlineCode>id</InlineCode> is always included in
      <InlineCode>properties</InlineCode>, allowing easy removal of individual features.
    </p>
    <RunExampleButton
      @click="clearFeatures('id', layer1features.features[0].properties.id, layer1.layerId)"
    >
      Remove rectangle
    </RunExampleButton>
    <CodeSnippet>
      channel.postRequest({{ requestName }}, ['id', rectangleId, layerId]);
    </CodeSnippet>
    <h3>Changing layer visibility</h3>
    <p>
      Note that you can also hide a layer with
      <InlineCode>MapLayerVisibilityRequest</InlineCode> without removing it. For an example and info
      about it, see
      <DocumentationLink type="request" :apiDoc="apiDocLayerVisiblity">
        documentation
      </DocumentationLink>.
    </p>
  </div>
</template>

<script>
import { generator } from './vectorlayer_helpers';

const title = 'Remove features';
const requestName = 'MapModulePlugin.RemoveFeaturesFromMapRequest';

export default {
  name: 'RemoveFeatures',
  label: title,
  data() {
    return {
      title,
      requestName,
      layer1features,
      layer2features,
      layer1,
      layer2
    };
  },
  methods: {
    addFeaturesToMap() {
      this.$root.channel.postRequest(this.requestName, []);
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
        this.layer1features,
        { layerId: this.layer1.layerId }
      ]);
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
        this.layer2features,
        { layerId: this.layer2.layerId }
      ]);
    },
    clearFeatures(key = null, value = null, layerId = null) {
      this.$root.channel.log(layerId);
      this.$root.channel.postRequest(this.requestName, [key, value, layerId]);
    }
  },
  mounted() {
    this.$root.channel.postRequest('VectorLayerRequest', [this.layer1]);
    this.$root.channel.postRequest('VectorLayerRequest', [this.layer2]);
    this.addFeaturesToMap();
  },
  beforeUnmount() {
    this.$root.channel.postRequest(this.requestName, []);
  }
};
/*
const style = {
  fill: {
    color: '#ffffff',
    area: {
      pattern: -1
    }
  }
};
*/
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
        key: "I'm in layer 1!"
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
        key: "I'm in layer 2!"
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

const polygon = generator.getPolygon(x, y, { name: `I'm a polygon` });
const rectangle = generator.getRectangle(
  x - 100000,
  y + 250000,
  { id: '1', name: `I'm a rectangle` },
  80000,
  65000
);
const point = generator.getPoint(x + 50000, y - 50000, { shape: 'point', name: "I'm a point" });
const point2 = generator.getPoint(x - 50000, y - 50000, { shape: 'point', name: "I'm a point" });
const layer1features = generator.getCollectionOf([rectangle, point, point2]);
const layer2features = generator.getCollectionOf([polygon]);
</script>
