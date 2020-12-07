const LAYER_OPTS = {
    simple: {
      layerId: 'MY_VECTOR_LAYER',
      opacity: 75,
      cursor: 'zoom-in',
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

const generator = {
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
  }
};

export { LAYER_OPTS, generator };
