/*
export {default as ThingA} from './ThingA'
export {default as ThingB} from './ThingB'
export {default as ThingC} from './ThingC'
*/
import drawing from '../../components/requests/drawing.vue';
import drawingEvent from '../../components/events/drawing.event.vue';

export default {
    name: 'Drawing',
    pages: [
        drawing,
        drawingEvent
    ]
};



/*
import mapClicked from './components/events/map.clicked.vue';
import markerAfterAdd from './components/events/marker.added.vue';
import markerClicked from './components/events/marker.clicked.vue';
import featureEvent from './components/events/feature.event.vue';
import drawingEvent from './components/events/drawing.event.vue';
import feedbackResult from './components/events/feedback.result.vue';
import routeResult from './components/events/route.result.vue';
import seachResult from './components/events/search.result.vue';
import userLocationEvent from './components/events/user.location.event.vue';
*/