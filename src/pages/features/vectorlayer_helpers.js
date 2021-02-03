const LAYER_OPTS = {
    simple: {
      layerId: 'MY_VECTOR_LAYER',
      opacity: 75,
      // TODO: layer style can't be configured. Only hover style is supported
      hover: {
        featureStyle: {
          // FIXME: inherit and effect don't work if features don't have styles specified in AddFeaturesToMap
          //   inherit: true,
          //   effect: 'darken'
          // FIXME: stroke without fill makes the feature blink while hovering
          fill: {
            color: '#ff00ff'
          },
          // FIXME: fill without stroke makes the feature blink while hovering
          stroke: {
            color: '#000000'
          }
        },
        content: [
            { 'key': 'Layer: MY_VECTOR_LAYER' },
            { 'key': 'Name', 'valueProperty': 'name' }
        ]
      }
    },
    
    listing: {
      layerId: 'MY_LISTED_VECTOR_LAYER',
      layerInspireName: 'My layer group',
      layerOrganizationName: 'Organization name',
      showLayer: true,
      opacity: 100,
      layerName: 'Layer name',
      layerDescription: 'Description text',
      minZoomLevel: 6
    }
};

// defaults for generator
const x = 488704;
const y = 6939136;

const generator = {
  getCollectionOf: (features) => {
    const geojsonObject = {
      'type': 'FeatureCollection',
      'crs': {
        'type': 'name',
        'properties': {
          'name': 'EPSG:3067'
        }
      },
      'features': features.slice(0)
    }
    return geojsonObject;
  },
  getPolygon: (x, y, attributes) => {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [[[x, y], [x + 100000, y + 100000], [x + 25000, y + 50000]]]
      },
      'properties': { ...attributes }
    };
  },
  getPoint: (x, y, attributes) => {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [x, y]
      },
      'properties': { ...attributes }
    };
  },
  getDefaultPolygonCollection: () => {
    return generator.getCollectionOf([
      generator.getPolygon(x, y, { 'name': `I'm a polygon` })
    ]);
  },
  getDefaultPointCollection: () => {
    return generator.getCollectionOf([
      generator.getPoint(x + 40000, y + 30000, { 'name': `I'm a point` })
    ]);
  }
};

export { LAYER_OPTS, generator };
