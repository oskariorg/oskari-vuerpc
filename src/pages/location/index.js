import routeResult from '../../components/events/route.result.vue';
import routeGet from './route.get.vue';
import userLocation from '../../components/requests/user.location.vue';
import userLocationEvent from '../../components/events/user.location.event.vue';
import search from './search.vue';

export default {
  name: 'Location',
  pages: [routeResult, routeGet, userLocation, userLocationEvent, search]
};
