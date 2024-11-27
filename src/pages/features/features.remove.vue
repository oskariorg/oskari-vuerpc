<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Removing features is done with the <InlineCode>{{ requestName }}</InlineCode
      >. Send the request without parameters to clear all vector features across all existing
      layers.
    </p>
    <DocumentationLink type="request" :apiDoc="apiDocPage">
      Documentation for {{ requestName }}
    </DocumentationLink>
    <CodeSnippet :runnable="true" buttonText="Clear all vector features">
      channel.postRequest('{{ requestName }}', []);
    </CodeSnippet>
    <p>
      You can also clear all features on the map while sending a
      <InlineCode>MapModulePlugin.AddFeaturesToMapRequest</InlineCode>, just add
      <InlineCode>clearPrevious: true</InlineCode> to the parameters to clear existing features from
      the map before adding new features.
    </p>
    <CodeSnippet>
channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest',
  [geojson, { "clearPrevious": true }]);
    </CodeSnippet>
    <h3>Removing features by layer</h3>
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
    <h3>Removing features with properties</h3>
    <p>
      Features can also be removed by specifying the layer and a
      <InlineCode>key: value</InlineCode> pair. The <InlineCode>key: value</InlineCode> pair has to
      be inside the <InlineCode>properties</InlineCode> object of the feature. Multiple features who
      are on the same layer and share a common <InlineCode>key: value</InlineCode> pair within the
      <InlineCode>properties</InlineCode> object can be removed with a single request.
    </p>
    <CodeSnippet :runnable="true" buttonText="Remove points">
var layerId = '{{ layer1.layerId }}';
channel.postRequest('{{ requestName }}', ['shape', 'point', layerId]);
    </CodeSnippet>
    <p>
      A feature's <InlineCode>id</InlineCode> is always included in
      <InlineCode>properties</InlineCode>, allowing easy removal of individual features.
    </p>
    <CodeSnippet :runnable="true" buttonText="Remove rectangle">
var rectangleId = '{{ layer1features.features[0].properties.id }}';
var layerId = '{{ layer1.layerId}}';
channel.postRequest('{{ requestName }}', ['id', rectangleId, layerId]);
    </CodeSnippet>
    <h3>Changing layer visibility</h3>
    <p>
      Note that you can also hide a layer with
      <InlineCode>MapLayerVisibilityRequest</InlineCode> without removing it. For an example and
      info about it, see
      <DocumentationLink type="request" :apiDoc="apiDocLayerVisiblity">
        documentation </DocumentationLink
      >.
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
      layer2,
      apiDocPage: 'mapping/mapmodule/request/RemoveFeaturesFromMapRequest.md',
      apiDocLayerVisiblity: 'mapping/mapmodule/request/MapModulePlugin.MapLayerVisibilityRequest.md'
    };
  },
  methods: {
    addFeaturesToMap() {
      // clear all features from map
      this.$root.channel.postRequest(this.requestName, []);
      // add features to layers
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
        this.layer1features,
        { layerId: this.layer1.layerId }
      ]);
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [
        this.layer2features,
        { layerId: this.layer2.layerId }
      ]);
      // zoom to features
      this.$root.channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', [
        { layer: this.layer1.layerId }
      ]);
    },
    clearFeatures(key = null, value = null, layerId = null) {
      this.$root.channel.postRequest(this.requestName, [key, value, layerId]);
    }
  },
  mounted() {
    this.$root.channel.postRequest('VectorLayerRequest', [this.layer1]);
    this.$root.channel.postRequest('VectorLayerRequest', [this.layer2]);
    this.addFeaturesToMap();
  },
  beforeUnmount() {
    this.clearFeatures();
    this.$root.channel.postRequest('VectorLayerRequest', [
      { layerId: this.layer1.layerId, remove: true }
    ]);
    this.$root.channel.postRequest('VectorLayerRequest', [
      { layerId: this.layer2.layerId, remove: true }
    ]);
  }
};
const layer1 = {
  layerId: 'layer1',
  opacity: 75,
  hover: {
    featureStyle: {
      fill: {
        color: '#0000ff'
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

const polygon = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [385797, 6671769],
        [239830, 6711840],
        [330852, 6821921]
      ]
    ]
  },
  properties: { name: `I'm a polygon` }
};
const rectangle = generator.getRectangle(
  220178,
  6813586,
  { id: 'rectangle_feature', name: `I'm a rectangle` },
  80000,
  65000
);
const point = generator.getPoint(361796, 6764123, { shape: 'point', name: "I'm a point" });
const point2 = generator.getPoint(314002, 6819119, { shape: 'point', name: "I'm a point" });
const layer1features = generator.getCollectionOf([rectangle, point, point2]);
const layer2features = generator.getCollectionOf([polygon]);
</script>
