import featuresAdd from './features.add.vue';
import featuresLayer from './features.layer.vue';
import featuresLayerScale from './features.layer.scale.vue';
import featuresUpdateStyle from './features.update.style.vue';
import featuresOrder from './features.order.vue';
import features from '../../components/functions/features.vue';
import featureEvent from '../../components/events/feature.event.vue';
import featuresInfo from './features.info.vue';
import featuresZoom from '../../components/requests/features.zoom.vue';

export default {
  name: 'Features',
  pages: [
    featuresAdd,
    featuresLayer,
    featuresLayerScale,
    featuresUpdateStyle,
    featuresOrder,
    features,
    featureEvent,
    featuresInfo,
    featuresZoom
  ]
};
