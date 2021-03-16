import featuresAdd from './features.add.vue';
import featuresLayer from './features.layer.vue';
import featuresLayerScale from './features.layer.scale.vue';
import features from '../../components/functions/features.vue';
import featureEvent from '../../components/events/feature.event.vue';
import featuresInfo from './features.info.vue';
import featuresUpdate from '../../components/requests/features.update.vue';
import featuresZoom from '../../components/requests/features.zoom.vue';

import layerVisibility from '../../components/requests/layer.visibility.vue';

export default {
    name: 'Features',
    pages: [
        featuresAdd,
        featuresLayer,
        featuresLayerScale,
        features,
        featureEvent,
        featuresInfo,
        featuresUpdate,
        featuresZoom,
        layerVisibility
    ]
};
