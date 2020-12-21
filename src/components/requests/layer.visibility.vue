<template>
  <div>
    <h2>{{ title }}</h2>
    
    <RunExampleButton @click="addFeaturesToMapRequest">AddFeaturesToMapRequest</RunExampleButton>
    <RunExampleButton @click="mapLayerVisibilityRequestHide">Hide vector layer</RunExampleButton>
    <RunExampleButton @click="mapLayerVisibilityRequestShow">Show vector layer</RunExampleButton>
    
    <DocumentationLink type="request" apiDoc="mapping/mapmodule/request/MapModulePlugin.MapLayerVisibilityRequest.md">Documentation for MapModulePlugin.MapLayerVisibilityRequest</DocumentationLink>

    <p>Example: hide layer with id 'VECTOR'</p>
    <CodeSnippet>
      channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', ['VECTOR', false]);
    </CodeSnippet>
    
    <p>Example: show layer with id 'VECTOR'</p>
    <CodeSnippet>
      channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', ['VECTOR', true]);
    </CodeSnippet>
  </div>
</template>

<script>
const title = 'Change map layer visibility';
export default {
  name: 'LayerVisibility',
  label: title,
  data () {
    return {
      title
    }
  },
  methods: {
    addFeaturesToMapRequest () {
      const x = 488704;
      const y = 6939136;
      const geojsonObject = {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:3067'
          }
        },
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [[x, y], [x + 100000, y + 100000]]
            },
            'properties': {
              'test_property': 1
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [x, y]
            },
            'properties': {
              'test_property': 2
            }
          }

        ]
      };

      const testOptions = {
        'minResolution': 0,
        'maxResolution': 1000
      };
      const params = [geojsonObject, {
        clearPrevious: true,
        layerOptions: testOptions,
        centerTo: true,
        cursor: 'zoom-in',
        prio: 4,
        minScale: 1451336
      }];

      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params
      );
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);

      const geojsonObject2 = {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:3067'
          }
        },
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [[x + 30000, y], [x + 130000, y + 100000]]
            },
            'properties': {
              'test_property': 'Line'
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [x + 30000, y]
            },
            'properties': {
              'test_property': null
            }
          }

        ]
      };

      const testOptions2 = {
        'minResolution': 0,
        'maxResolution': 1000
      };
      const params2 = [geojsonObject2, {
        clearPrevious: false,
        layerOptions: testOptions2,
        centerTo: true,
        featureStyle: {
          fill: {
            color: '#ff0000'
          },
          stroke: {
            color: '#ff0000',
            width: 5
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
        },
        cursor: 'zoom-out',
        prio: 1
      }];

      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params2
      );
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params2);
    },
    mapLayerVisibilityRequest () {
      this.$root.channel.getAllLayers((layers) => {
        const layer = layers[0];
        this.$root.channel.postRequest(
          'MapModulePlugin.MapLayerVisibilityRequest',
          [layer.id, !layer.visible]
        );
        this.$root.channel.log('MapModulePlugin.MapLayerVisibilityRequest sent with parameters: ', layer.id + ', ' + !layer.visible);
      });
    },
    mapLayerVisibilityRequestHide () {
      const layerId = 'VECTOR';
      const setVisible = false;
      this.$root.channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [layerId, setVisible]);
      this.$root.channel.log('MapLayerVisibilityRequest sent with parameters: ', layerId, setVisible);
    },
    mapLayerVisibilityRequestShow () {
      const layerId = 'VECTOR';
      const setVisible = true;
      this.$root.channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [layerId, setVisible]);
      this.$root.channel.log('MapLayerVisibilityRequest sent with parameters: ', layerId, setVisible);
    },
    getLink (e) {
      let documentPathEnd = e.target.id === 'changeOpacity' ? 'mapping/mapmodule/request/changemaplayeropacityrequest.md' : 'mapping/mapmodule/request/MapModulePlugin.MapLayerVisibilityRequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
}
</script>
