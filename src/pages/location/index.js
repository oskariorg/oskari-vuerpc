
import routeResult from '../../components/events/route.result.vue';
import seachResult from '../../components/events/search.result.vue';
import routeGet from '../../components/requests/route.get.vue';
import userLocation from '../../components/requests/user.location.vue';
import userLocationEvent from '../../components/events/user.location.event.vue';
import search from '../../components/requests/search.vue';

export default {
    name: 'Location',
    pages: [
        routeResult,
        seachResult,
        routeGet,
        userLocation,
        userLocationEvent,
        search
    ]
};