import features from '../../components/functions/features.vue';
import featureEvent from '../../components/events/feature.event.vue';
import featuresInfo from '../../components/requests/features.info.vue';
import featuresUpdate from '../../components/requests/features.update.vue';
import featuresAdd from '../../components/requests/features.add.vue';
import featuresLayer from '../../components/requests/features.layer.vue';
import featuresZoom from '../../components/requests/features.zoom.vue';

import layerVisibility from '../../components/requests/layer.visibility.vue';

export default {
    name: 'Features',
    pages: [
        features,
        featureEvent,
        featuresInfo,
        featuresUpdate,
        featuresAdd,
        featuresLayer,
        featuresZoom,
        layerVisibility
    ]
};
