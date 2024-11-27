<template>
  <div>
    <h2>{{ title }}</h2>
    <div>Event that occurs after a feedback request has been completed</div>
    <DocumentationLink type="event" apiDoc="FeedbackResultEvent">
      Documentation for FeedbackResultEvent
    </DocumentationLink>
  </div>
</template>
<script>
const title = 'FeedbackResultEvent';
export default {
  name: 'FeedbackResultEvent',
  label: title,
  data() {
    return {
      title
    };
  }
};
</script>
