<template>
  <div>
    <div>
      <p>
        This request is used to zoom/move the map so requested features are visible on the map
        viewport. Requested features can be selected by referencing a vector layer and/or
        referencing attribute data values. If selection is not made the map is zoomed out to show
        all vector features that have been programmatically added to the map (features added
        directly from services/map layers providing vector features are not included).
      </p>
      <DocumentationLink type="request" apiDoc="mapping/mapmodule/request/ZoomToFeaturesRequest.md">
        Documentation for ZoomToFeaturesRequest
      </DocumentationLink>
    </div>

    <div>
      1. Add features to map with the same parameters as in the code snippet below
      <RunExampleButton @click="addFeaturesToMapRequestForZooming">
        AddFeaturesToMapRequest
      </RunExampleButton>
      <CodeSnippet>{{ JSON.stringify(geojsonObject, null, 2) }}</CodeSnippet>
    </div>
    <div>2. Move map</div>
    <div>
      3. Zoom to all features
    </div>
    <CodeSnippet :runnable="true"> channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', []); </CodeSnippet>

    <div>
      <p>
        The <InlineCode>MapModulePlugin.ZoomToFeaturesRequest</InlineCode> allows selecting the
        features to zoom in to. In this example, the map is zoomed to show only the smaller polygon,
        i.e. where <InlineCode>featureType === 'parcel'</InlineCode> and
        <InlineCode>layerId ==='testLayer'</InlineCode>.
      </p>
    </div>
    <CodeSnippet :runnable="true">
var layers = {'layer': ['testLayer']};
var features = {'species': ['parcel']};
channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', [layers, features]);
    </CodeSnippet>

    <div>
      Zoom with maxZoomLevel set:
    </div>
    <CodeSnippet :runnable="true">
var maxZoomParams = {
  'maxZoomLevel': 4
};
channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', [maxZoomParams]);
    </CodeSnippet>
  </div>
</template>
<script>
export default {
  name: 'ZoomToFeatures',
  label: 'Zoom to features',
  data() {
    return {
      desc: 'Zoom to features',
      geojsonObject
    };
  },
  methods: {
    addFeaturesToMapRequestForZooming() {
      const params = [
        this.geojsonObject,
        {
          layerId: 'testLayer',
          clearPrevious: true,
          centerTo: true,
          featureStyle: {
            fill: {
              color: 'rgba(255,0,255,0.2)'
            },
            stroke: {
              color: '#ff0000',
              width: 3
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
        }
      ];
      this.$root.channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', params);
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params);
    }
  },
  beforeUnmount() {
    this.$root.channel.postRequest('MapModulePlugin.RemoveFeaturesFromMapRequest', []);
  }
};

const geojsonObject = {
  type: 'FeatureCollection',
  crs: {
    type: 'name',
    properties: {
      name: 'EPSG:3067'
    }
  },
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [323424, 6828464],
            [324192, 6825872],
            [323744, 6822384],
            [323424, 6828464]
          ]
        ]
      },
      properties: {
        test_property: '123-456-7777-8888',
        species: 'parcel'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [309856, 6829840],
            [312576, 6833808],
            [315424, 6831120],
            [315040, 6828592],
            [311328, 6827472],
            [309856, 6829840]
          ]
        ]
      }
    }
  ]
};
</script>
