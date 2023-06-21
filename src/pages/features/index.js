import featuresAdd from './features.add.vue';
import featuresLayer from './features.layer.vue';
import featuresLayerReorder from './features.layer.reorder.vue';
import featuresRemove from './features.remove.vue';
import featuresLayerScale from './features.layer.scale.vue';
import featuresUpdateStyle from './features.update.style.vue';
import featuresOrder from './features.order.vue';
import features from './features.vue';
import featureEvent from './feature.event.vue';
import featuresInfo from './features.info.vue';
import featuresZoom from './features.zoom.vue';

export default {
  name: 'Features',
  pages: [
    featuresAdd,
    featuresLayer,
    featuresLayerReorder,
    featuresRemove,
    featuresLayerScale,
    featuresUpdateStyle,
    featuresOrder,
    features,
    featureEvent,
    featuresInfo,
    featuresZoom
  ]
};
