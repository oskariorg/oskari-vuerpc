import routeResult from './route.result.vue';
import routeGet from './route.get.vue';
import userLocation from './user.location.vue';
import userLocationEvent from './user.location.event.vue';
import search from './search.vue';

export default {
  name: 'Location',
  pages: [routeResult, routeGet, userLocation, userLocationEvent, search]
};
