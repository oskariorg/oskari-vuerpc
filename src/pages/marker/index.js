import markerAdd from './marker.add.vue';
import markerShow from '../../components/requests/marker.show.vue';
import markerInfobox from '../../components/requests/marker.infobox.vue';

export default {
  name: 'Markers',
  pages: [
    markerAdd,
    markerShow,
    markerInfobox
  ]
};
