import mapLocation from './location.vue';

import mapZoom from './zoom.vue';
import mapClicked from '../../components/events/map.clicked.vue';

import layers from './layers.vue';

import mapPixelmeasures from '../../components/functions/map.pixelmeasures.vue';
import mapState from '../../components/functions/map.state.vue';
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
        mapTour,
        mapClicked,
        mapPixelmeasures,
        mapState,
        mapScreenshot,
        mapRotate,
        layerStyle
    ]
};
