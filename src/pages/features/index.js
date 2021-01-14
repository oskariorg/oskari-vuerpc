import featuresAdd from './features.add.vue';
import features from '../../components/functions/features.vue';
import featureEvent from '../../components/events/feature.event.vue';
import featuresInfo from '../../components/requests/features.info.vue';
import featuresUpdate from '../../components/requests/features.update.vue';
import featuresLayer from '../../components/requests/features.layer.vue';
import featuresZoom from '../../components/requests/features.zoom.vue';

import layerVisibility from '../../components/requests/layer.visibility.vue';

export default {
    name: 'Features',
    pages: [
        featuresAdd,
        featuresLayer,
        features,
        featureEvent,
        featuresInfo,
        featuresUpdate,
        featuresZoom,
        layerVisibility
    ]
};
