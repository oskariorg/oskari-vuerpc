import mapLocation from './location.vue';
import mapZoom from './zoom.vue';
import layers from './layers.vue';

import mapState from './state.vue';
import mapClicked from './map.clicked.vue';
import mapRotate from './rotate.vue';
import mapTour from './tour.vue';
// The more funky ones at the bottom
import mapScreenshot from './screenshot.vue';
import mapPixelmeasures from './pixelmeasures.vue';
import layerStyle from './layer.style.vue';

export default {
  name: 'Map',
  pages: [
    mapLocation,
    mapZoom,
    layers,
    mapState,
    mapClicked,
    mapRotate,
    mapTour,
    mapScreenshot,
    mapPixelmeasures,
    layerStyle
  ]
};
