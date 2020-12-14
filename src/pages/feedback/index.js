import feedbackServices from '../../components/requests/feedback.services.vue';
import feedbackRequest from '../../components/requests/feedback.request.vue';
import feedbackPost from '../../components/requests/feedback.post.vue';
import feedbackResult from '../../components/events/feedback.result.vue';

export default {
    name: 'Feedback',
    pages: [
        feedbackServices,
        feedbackRequest,
        feedbackPost,
        feedbackResult
    ]
};
