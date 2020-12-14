import mapAftermove from '../../components/events/map.aftermove.vue';
import mapClicked from '../../components/events/map.clicked.vue';
import mapPosition from '../../components/functions/map.position.vue';
import mapMove from '../../components/requests/map.move.vue';
import mapTour from '../../components/requests/map.tour.vue';
import mapZoom from '../../components/functions/map.zoom.vue';
import mapPixelmeasures from '../../components/functions/map.pixelmeasures.vue';
import mapBbox from '../../components/functions/map.bbox.vue';
import mapState from '../../components/functions/map.state.vue';
import mapScreenshot from '../../components/functions/map.screenshot.vue';
import mapRotate from '../../components/requests/rotate.map.vue';
import layerStyle from '../../components/requests/layer.style.vue';
import layerOpacity from '../../components/requests/layer.opacity.vue';
import layerVisibility from '../../components/requests/layer.visibility.vue';
import layers from '../../components/functions/layers.vue';

export default {
    name: 'Map',
    pages: [
        mapAftermove,
        mapClicked,
        mapPosition,
        mapMove,
        mapTour,
        mapZoom,
        mapPixelmeasures,
        mapBbox,
        mapState,
        mapScreenshot,
        mapRotate,
        layerStyle,
        layerOpacity,
        layerVisibility,
        layers
    ]
};
