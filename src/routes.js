import gettingStarted from './components/GettingStarted.vue';

// map
import mapAftermove from './components/events/map.aftermove.vue';
import mapClicked from './components/events/map.clicked.vue';
import mapPosition from './components/functions/map.position.vue';
import mapMove from './components/requests/map.move.vue';
import mapTour from './components/requests/map.tour.vue';
import mapZoom from './components/functions/map.zoom.vue';
import mapPixelmeasures from './components/functions/map.pixelmeasures.vue';
import mapBbox from './components/functions/map.bbox.vue';
import mapState from './components/functions/map.state.vue';
import mapScreenshot from './components/functions/map.screenshot.vue';
import mapRotate from './components/requests/rotate.map.vue';
import layerStyle from './components/requests/layer.style.vue';
import layerOpacity from './components/requests/layer.opacity.vue';
import layerVisibility from './components/requests/layer.visibility.vue';
import layers from './components/functions/layers.vue';

// marker
import markerAdd from './components/requests/marker.add.vue';
import markerShow from './components/requests/marker.show.vue';
import markerInfobox from './components/requests/marker.infobox.vue';
import markerAfterAdd from './components/events/marker.added.vue';
import markerClicked from './components/events/marker.clicked.vue';

// features
import features from './components/functions/features.vue';
import featureEvent from './components/events/feature.event.vue';
import featuresInfo from './components/requests/features.info.vue';
import featuresUpdate from './components/requests/features.update.vue';
import featuresAdd from './components/requests/features.add.vue';
import featuresZoom from './components/requests/features.zoom.vue';

// drawing
import drawing from './components/requests/drawing.vue';
import drawingEvent from './components/events/drawing.event.vue';

// supported
import supportedEvents from './components/functions/supported.events.vue';
import supportedFunctions from './components/functions/supported.functions.vue';
import supportedRequests from './components/functions/supported.requests.vue';

// feedback
import feedbackServices from './components/requests/feedback.services.vue';
import feedbackRequest from './components/requests/feedback.request.vue';
import feedbackPost from './components/requests/feedback.post.vue';
import feedbackResult from './components/events/feedback.result.vue';

// ui
import uiSendEvent from './components/functions/ui.sendevent.vue';
import uiCursor from './components/functions/ui.cursor.vue';
import progresspinner from './components/requests/ui.progresspinner.vue';
import infoboxRequest from './components/requests/infobox.request.vue';

// location
import routeResult from './components/events/route.result.vue';
import seachResult from './components/events/search.result.vue';
import routeGet from './components/requests/route.get.vue';
import userLocation from './components/requests/user.location.vue';
import userLocationEvent from './components/events/user.location.event.vue';
import search from './components/requests/search.vue';

const routes = [
{ path: '', component: gettingStarted },
{ path: '', component: mapAftermove },
{ path: '', component: layerOpacity },
{ path: '', component: layerStyle },
{ path: '', component: layerVisibility },
{ path: '', component: mapScreenshot },
{ path: '', component: layers },
{ path: '', component: mapBbox },
{ path: '', component: mapPosition },
{ path: '', component: mapPixelmeasures },
{ path: '', component: mapState },
{ path: '', component: mapClicked },
{ path: '', component: mapMove },
{ path: '', component: mapTour },
{ path: '', component: mapRotate },
{ path: '', component: mapZoom },
{ path: '', component: markerAdd },
{ path: '', component: markerAfterAdd },
{ path: '', component: markerClicked },
{ path: '', component: markerInfobox },
{ path: '', component: markerShow },
{ path: '', component: featuresAdd },
{ path: '', component: featureEvent },
{ path: '', component: features },
{ path: '', component: featuresInfo },
{ path: '', component: featuresUpdate },
{ path: '', component: featuresZoom },
{ path: '', component: drawingEvent },
{ path: '', component: drawing },
{ path: '', component: supportedEvents },
{ path: '', component: supportedFunctions },
{ path: '', component: supportedRequests },

{ path: '', component: feedbackServices },
{ path: '', component: feedbackRequest },
{ path: '', component: feedbackPost },
{ path: '', component: feedbackResult },
{ path: '', component: uiSendEvent },
{ path: '', component: uiCursor },
{ path: '', component: progresspinner },
{ path: '', component: infoboxRequest },
{ path: '', component: routeGet },
{ path: '', component: userLocation },
{ path: '', component: search },
{ path: '', component: seachResult },
{ path: '', component: userLocationEvent },
{ path: '', component: routeResult }
];

export default routes;
