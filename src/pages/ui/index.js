import uiSendEvent from './ui.sendevent.vue';
import uiCursor from './ui.cursor.vue';
import progresspinner from './ui.progresspinner.vue';
import infoBoxSimple from './infobox.simple.vue';
import infoboxRequest from './infobox.request.vue';

export default {
  name: 'UI',
  pages: [uiSendEvent, uiCursor, progresspinner, infoBoxSimple, infoboxRequest]
};
