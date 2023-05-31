import feedbackServices from './feedback.services.vue';
import feedbackRequest from './feedback.request.vue';
import feedbackPost from './feedback.post.vue';
import feedbackResult from './feedback.result.vue';

export default {
  name: 'Feedback',
  pages: [feedbackServices, feedbackRequest, feedbackPost, feedbackResult]
};
