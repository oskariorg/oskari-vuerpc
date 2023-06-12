// defaults for generator
const x = 488704;
const y = 6939136;

const generator = {
  getCollectionOf: (features) => {
    const geojsonObject = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3067'
        }
      },
      features: features.slice(0)
    };
    return geojsonObject;
  },
  getRectangle: (x, y, attributes, width = 200, height = 100) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [x, y],
            [x + width, y],
            [x + width, y + height],
            [x, y + height],
            [x, y]
          ]
        ]
      },
      properties: { ...attributes }
    };
  },
  getPolygon: (x, y, attributes) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [x, y],
            [x + 100000, y + 100000],
            [x + 25000, y + 50000]
          ]
        ]
      },
      properties: { ...attributes }
    };
  },
  getPoint: (x, y, attributes) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [x, y]
      },
      properties: { ...attributes }
    };
  },
  getDefaultPolygonCollection: () => {
    return generator.getCollectionOf([generator.getPolygon(x, y, { name: `I'm a polygon` })]);
  },
  getDefaultPointCollection: () => {
    return generator.getCollectionOf([
      generator.getPoint(x + 40000, y + 30000, { name: `I'm a point` })
    ]);
  }
};

export { generator };
