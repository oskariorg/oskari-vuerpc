import gettingStarted from './components/GettingStarted.vue';
// events
import mapAftermove from './components/events/map.aftermove.vue';
import mapClicked from './components/events/map.clicked.vue';
import drawingEvent from './components/events/drawing.event.vue';
import featureEvent from './components/events/feature.event.vue';
import feedbackResult from './components/events/feedback.result.vue';
import markerAfterAdd from './components/events/marker.added.vue';
import markerClicked from './components/events/marker.clicked.vue';
import routeResult from './components/events/route.result.vue';
import seachResult from './components/events/search.result.vue';
// requests
import routeGet from './components/requests/route.get.vue';
import feedbackServices from './components/requests/feedback.services.vue';
import feedbackRequest from './components/requests/feedback.request.vue';
import feedbackPost from './components/requests/feedback.post.vue';
import infoboxRequest from './components/requests/infobox.request.vue';
import markerInfobox from './components/requests/marker.infobox.vue';
import markerAdd from './components/requests/marker.add.vue';
import markerShow from './components/requests/marker.show.vue';
import mapMove from './components/requests/map.move.vue';
import mapRotate from './components/requests/rotate.map.vue';
import layerUpdate from './components/requests/layer.update.vue';
import layerOpacity from './components/requests/layer.opacity.vue';
import userLocation from './components/requests/user.location.vue';
import progresspinner from './components/requests/ui.progresspinner.vue';
import search from './components/requests/search.vue';
import drawing from './components/requests/drawing.vue';
import featuresInfo from './components/requests/features.info.vue';
import featuresUpdate from './components/requests/features.update.vue';
import featuresAdd from './components/requests/features.add.vue';
import featuresZoom from './components/requests/features.zoom.vue';
import layerVisibility from './components/requests/layer.visibility.vue';
// functions
import layers from './components/functions/layers.vue';
import mapPosition from './components/functions/map.position.vue';
import supportedEvents from './components/functions/supported.events.vue';
import supportedFunctions from './components/functions/supported.functions.vue';
import supportedRequests from './components/functions/supported.requests.vue';
import mapZoom from './components/functions/map.zoom.vue';
import mapPixelmeasures from './components/functions/map.pixelmeasures.vue';
import mapBbox from './components/functions/map.bbox.vue';
import mapState from './components/functions/map.state.vue';
import features from './components/functions/features.vue';
import mapScreenshot from './components/functions/map.screenshot.vue';
import uiSendEvent from './components/functions/ui.sendevent.vue';
import uiCursor from './components/functions/ui.cursor.vue';

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
