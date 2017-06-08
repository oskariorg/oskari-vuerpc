import gettingStarted from './GettingStarted.vue';
// events
import mapAftermove from './events/map.aftermove.vue';
import mapClicked from './events/map.clicked.vue';
import drawingEvent from './events/drawing.event.vue';
import featureEvent from './events/feature.event.vue';
import feedbackResult from './events/feedback.result.vue';
import markerAfterAdd from './events/marker.afteradd.vue';
import markerClicked from './events/marker.clicked.vue';
import routeResult from './events/route.result.vue';
import seachResult from './events/search.result.vue';
// requests
import routeGet from './requests/route.get.vue';
import feedbackServices from './requests/feedback.services.vue';
import feedbackRequest from './requests/feedback.request.vue';
import feedbackPost from './requests/feedback.post.vue';
import infoboxRequest from './requests/infobox.request.vue';
import markerInfobox from './requests/marker.infobox.vue';
import markerAdd from './requests/marker.add.vue';
import markerShow from './requests/marker.show.vue';
import mapMove from './requests/map.move.vue';
import mapRotate from './requests/rotate.map.vue';
import layerUpdate from './requests/maplayer.update.vue';
import layerOpacity from './requests/maplayer.opacity.vue';
import userLocation from './requests/user.location.vue';
import progresspinner from './requests/ui.progresspinner.vue';
import search from './requests/search.vue';
import drawing from './requests/drawing.vue';
import featuresInfo from './requests/features.info.vue';
import featuresUpdate from './requests/features.update.vue';
import featuresAdd from './requests/features.add.vue';
import featuresZoom from './requests/features.zoom.vue';
import layerVisibility from './requests/maplayer.visibility.vue';
// functions
import layers from './functions/layers.vue';
import mapPosition from './functions/map.position.vue';
import supportedEvents from './functions/supported.events.vue';
import supportedFunctions from './functions/supported.functions.vue';
import supportedRequests from './functions/supported.requests.vue';
import mapZoom from './functions/map.zoom.vue';
import mapPixelmeasures from './functions/map.pixelmeasures.vue';
import mapBbox from './functions/map.bbox.vue';
import mapState from './functions/map.state.vue';
import features from './functions/features.vue';
import mapScreenshot from './functions/map.screenshot.vue';
import uiSendEvent from './functions/ui.sendevent.vue';
import uiCursor from './functions/ui.cursor.vue';

const routes = [
{ path: '', component: gettingStarted },
{ path: '', component: mapAftermove },
{ path: '', component: mapClicked },
{ path: '', component: drawingEvent },
{ path: '', component: featureEvent },
{ path: '', component: feedbackResult },
{ path: '', component: markerAfterAdd },
{ path: '', component: markerClicked },
{ path: '', component: routeResult },
{ path: '', component: seachResult },
{ path: '', component: routeGet },
{ path: '', component: feedbackServices },
{ path: '', component: feedbackRequest },
{ path: '', component: feedbackPost },
{ path: '', component: infoboxRequest },
{ path: '', component: markerInfobox },
{ path: '', component: markerAdd },
{ path: '', component: markerShow },
{ path: '', component: mapMove },
{ path: '', component: mapRotate },
{ path: '', component: layerUpdate },
{ path: '', component: layerOpacity },
{ path: '', component: userLocation },
{ path: '', component: progresspinner },
{ path: '', component: search },
{ path: '', component: drawing },
{ path: '', component: featuresInfo },
{ path: '', component: featuresUpdate },
{ path: '', component: featuresAdd },
{ path: '', component: featuresZoom },
{ path: '', component: layerVisibility },
{ path: '', component: layers },
{ path: '', component: mapPosition },
{ path: '', component: supportedEvents },
{ path: '', component: supportedFunctions },
{ path: '', component: supportedRequests },
{ path: '', component: mapZoom },
{ path: '', component: mapPixelmeasures },
{ path: '', component: mapBbox },
{ path: '', component: mapState },
{ path: '', component: features },
{ path: '', component: mapScreenshot },
{ path: '', component: uiSendEvent },
{ path: '', component: uiCursor }
];

export default routes;
