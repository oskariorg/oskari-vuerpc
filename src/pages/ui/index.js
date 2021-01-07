import uiSendEvent from '../../components/functions/ui.sendevent.vue';
import uiCursor from '../../components/functions/ui.cursor.vue';
import progresspinner from '../../components/requests/ui.progresspinner.vue';
import infoboxRequest from '../../components/requests/infobox.request.vue';

export default {
    name: 'UI',
    pages: [
        uiSendEvent,
        uiCursor,
        progresspinner,
        infoboxRequest
    ]
};

