import mapLocation from './location.vue';
import mapZoom from './zoom.vue';

import layers from './layers.vue';

import mapState from './state.vue';
import mapClicked from '../../components/events/map.clicked.vue';

import mapPixelmeasures from '../../components/functions/map.pixelmeasures.vue';
import mapScreenshot from '../../components/functions/map.screenshot.vue';
import mapRotate from '../../components/requests/rotate.map.vue';

import layerStyle from '../../components/requests/layer.style.vue';

import mapTour from '../../components/requests/map.tour.vue';

export default {
    name: 'Map',
    pages: [
        mapLocation,
        mapZoom,
        layers,
        mapState,
        mapTour,
        mapClicked,
        mapPixelmeasures,
        mapScreenshot,
        mapRotate,
        layerStyle
    ]
};
