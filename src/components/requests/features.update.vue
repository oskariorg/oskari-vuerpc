<template>
  <div id="updateFeatures">
    <div id="UpdateFeature">
      <div>Update feature (ol3)</div>

      <div style="margin-top:10px;">You can update feature style for example when you want higlight feature from the map.</div>
      <div>First add feature, feature format can be an WKT or GeoJSON</div>
      <button class="btn btn-primary exampleready" @click="addWKTFeature">AddFeaturesToMapRequest</button>
      <div>
        <a id="addFeaturesWKT" href="" @click="getLink">To the documentation</a>
      </div>
      <code-component :snippet="wkt"></code-component>
    </div>

    <div>Now update previously added feature</div>
    <button class="btn btn-primary exampleready" @click="updateWKTFeature">AddFeaturesToMapRequest</button>
    <div>
      <a id="addFeaturesWKT2" href="" @click="getLink">To the documentation</a>
    </div>
    <code-component snippet="
    // For example change stroke style
    var featureStyle = {
      stroke: {
        color: '#00FF00',
        width: 5
      }
    };

    // Define wanted feature attributes
    var updatedFeatureAttributes = {'test_property':1};
    var params = [updatedFeatureAttributes, {
      featureStyle: featureStyle,
      layerId: 'MY_VECTOR_LAYER'
    }];

    channel.postRequest(
    'MapModulePlugin.AddFeaturesToMapRequest',
    params
    );"></code-component>
  </div>
</template>
<script>
import { wkt } from '../../util/examplecodes.js';
export default {
  name: 'updateFeatures',
  data () {
    return {
      desc: 'Update vector features',
      wkt: wkt
    }
  },
  methods: {
    addWKTFeature () {
      // First add feature, feature format can be an WKT or GeoJSON
      // Define a wkt-geometry
      const WKT = 'POLYGON ((358911.7134508261 6639617.669712467, 358911.7134508261 6694516.612323322, 382536.4910289571 6694516.612323322, 382536.4910289571 6639617.669712467, 358911.7134508261 6639617.669712467))';

      // Some attributes for the feature
      const attributes = {
        testProperty: 1
      };

      // Styling
      const featureStyle = {
        fill: {
          color: 'rgba(0,0,0,0.3)'
        },
        stroke: {
          color: '#FF0000',
          width: 10
        },
        text: {
          scale: 1.3,
          fill: {
            color: 'rgba(0,0,0,1)'
          },
          stroke: {
            color: 'rgba(255,255,255,1)',
            width: 2
          },
          labelProperty: 'test_property'
        }
      };

      // Add features
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [WKT, {
        layerId: 'MY_VECTOR_LAYER',
        clearPrevious: true,
        layerOptions: null,
        centerTo: false,
        featureStyle: featureStyle,
        attributes: attributes
      }]);
    },
    updateWKTFeature () {
      console.log('testing');
      // Now update previously added feature
      // For example change stroke style
      const featureStyle = {
        stroke: {
          color: '#00FF00',
          width: 5
        }
      };

      // Define wanted feature attributes
      const updatedFeatureAttributes = {
        testProperty: 1
      };
      const params = [updatedFeatureAttributes, {
        featureStyle: featureStyle,
        layerId: 'MY_VECTOR_LAYER'
      }];

      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params
      );
    },
    getLink (e) {
      let documentPathEnd = 'mapping/mapmodule/request/addfeaturestomaprequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
}
</script>
