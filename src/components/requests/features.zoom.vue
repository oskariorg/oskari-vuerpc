<template>
  <div id="ZoomToFeatures">
    <div>
      <a id="zoomToFeatures" href="" @click="getLink">To the documentation</a>
    </div>

    <div>
      1. Add features to map
      <button id="btnAddFeaturesToMapRequest" class="btn btn-primary exampleready" @click="addFeaturesToMapRequestForZooming">AddFeaturesToMapRequest</button>
    </div>
    <div>2. Move map</div>
    <div>
      3. Zoom to all features
      <button id="btnZoomToFeaturesRequest" class="btn btn-primary exampleready" @click="zoomToFeaturesRequest">MapModulePlugin.ZoomToFeaturesRequest</button>
    </div>
    <CodeSnippet>
channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', []);
    </CodeSnippet>
    
    <div>
      Zoom to features, where featureType=='parcel' and
      layerId=='testLayer'
      <button id="btnZoomToFeaturesRequest2" class="btn btn-primary exampleready" @click="ZoomToFeaturesRequestWithParams">MapModulePlugin.ZoomToFeaturesRequest</button>
    </div>
    <CodeSnippet>
var layers = {'layer': ['testLayer']};
var features = {'species': ['parcel']};
channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', [layers, features]);">
    </CodeSnippet>

    <div>
      Zoom with maxZoomLevel set
      <button id="btnZoomToFeaturesRequest3" class="btn btn-primary exampleready" @click="zoomToFeaturesRequestMaxZoomLevel">MapModulePlugin.ZoomToFeaturesRequest</button>
    </div>
    <CodeSnippet>
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
  data () {
    return {
      desc: 'Zoom to features'
    }
  },
  methods: {
    addFeaturesToMapRequestForZooming () {
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
              'type': 'Polygon',
              'coordinates': [[[323424, 6828464], [324192, 6825872], [323744, 6822384], [323424, 6828464]]]
            },
            'properties': {
              'test_property': '123-456-7777-8888',
              'species': 'parcel'
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[309856, 6829840], [312576, 6833808], [315424, 6831120], [315040, 6828592], [311328, 6827472], [309856, 6829840]]]
            }
          }
        ]
      };
      const params = [geojsonObject, {
        layerId: 'testLayer',
        clearPrevious: false,
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
      }];

      this.$root.channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params
      );
      this.$root.channel.log('MapModulePlugin.AddFeaturesToMapRequest posted with data', params)
    },
    zoomToFeaturesRequest () {
      this.$root.channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', []);
      this.$root.channel.log('MapModulePlugin.ZoomToFeaturesRequest posted without params');
    },
    ZoomToFeaturesRequestWithParams () {
      const layers = {'layer': ['testLayer']};
      const features = {'species': ['parcel']};
      this.$root.channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', [layers, features]);
      this.$root.channel.log('MapModulePlugin.ZoomToFeaturesRequest posted without params');
    },
    zoomToFeaturesRequestMaxZoomLevel () {
      var maxZoomParams = {
        maxZoomLevel: 4
      };
      this.$root.channel.postRequest('MapModulePlugin.ZoomToFeaturesRequest', [maxZoomParams]);
      this.$root.channel.log('MapModulePlugin.ZoomToFeaturesRequest posted with  data', maxZoomParams);
    },
    getLink (e) {
      let documentPathEnd = 'mapping/mapmodule/request/zoomtofeaturesrequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
}
</script>
